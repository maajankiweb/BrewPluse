import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectMongoDB } from '@/lib/mongodb';
import { Table, findRuntimeTableByToken } from '@/lib/models/Table';
import { Store } from '@/lib/models/Store';
import {
  TableSession,
  saveRuntimeSession,
  findRuntimeActiveSession,
} from '@/lib/models/TableSession';
import {
  Order,
  saveRuntimeOrder,
  findRuntimeOrderByIdempotencyKey,
} from '@/lib/models/Order';
import { findMenuItem } from '@/lib/menuService';
import { rateLimit } from '@/lib/rateLimit';
import { syncLiveOrderToFirestore, syncLiveTableToFirestore } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

const OrderItemInputSchema = z.object({
  menuItemId: z.string().min(1, 'Item ID is required'),
  qty: z.number().int().min(1).max(20),
  variantId: z.string().optional(),
  addonIds: z.array(z.string()).optional(),
  note: z.string().max(100).optional(),
});

const PlaceOrderSchema = z.object({
  tableToken: z.string().min(8, 'Table token is required'),
  idempotencyKey: z.string().min(1, 'Idempotency key is required').max(100),
  items: z.array(OrderItemInputSchema).min(1, 'Cart cannot be empty').max(50),
  customer: z
    .object({
      name: z.string().max(80).optional(),
      phone: z.string().max(20).optional(),
    })
    .optional(),
  paymentIntent: z.enum(['pay_now', 'pay_later']),
  notes: z.string().max(300).optional(),
});

/**
 * POST /api/public/orders
 * Places a customer order from a table QR session.
 * Recomputes all prices server-side, validates availability, and enforces idempotency.
 */
export async function POST(request: Request) {
  try {
    const rawIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'anonymous';

    const body = await request.json().catch(() => null);
    const parsed = PlaceOrderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid order request payload',
            details: parsed.error.issues,
          },
        },
        { status: 400 }
      );
    }

    const {
      tableToken,
      idempotencyKey,
      items: rawItems,
      customer,
      paymentIntent,
      notes,
    } = parsed.data;

    // 1. Rate Limiting: 10 orders per 10 minutes per token/IP
    const limitKey = `order:${tableToken}:${rawIp}`;
    const rateCheck = rateLimit(limitKey, 10, 10 * 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        {
          error: {
            code: 'RATE_LIMITED',
            message: `Too many order requests. Please wait ${rateCheck.resetSeconds} seconds.`,
          },
        },
        { status: 429 }
      );
    }

    // 2. Resolve Table
    const conn = await connectMongoDB();
    let table: any = null;
    if (conn) {
      try {
        table = await Table.findOne({ token: tableToken.trim(), isActive: true });
      } catch (err) {}
    }
    if (!table) {
      table = findRuntimeTableByToken(tableToken.trim());
    }

    if (!table) {
      return NextResponse.json(
        { error: { code: 'TABLE_NOT_FOUND', message: 'Table QR code is invalid or inactive.' } },
        { status: 404 }
      );
    }

    const tableId = String(table._id || table.id);
    const storeSlug = table.storeId;

    // 3. Resolve Store & Policies
    let store: any = null;
    if (conn) {
      try {
        store = await Store.findOne({ slug: storeSlug });
      } catch (err) {}
    }
    if (!store) {
      store = {
        name: storeSlug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
        slug: storeSlug,
        acceptingOrders: true,
        paymentPolicy: 'customer_choice',
        platformFeeMode: 'cafe',
        taxInclusive: false,
        taxRate: 5.0,
        serviceChargePercent: 0,
      };
    }

    if (!store.acceptingOrders) {
      return NextResponse.json(
        {
          error: {
            code: 'STORE_CLOSED',
            message: 'This cafe is currently not accepting new orders. Please check with staff.',
          },
        },
        { status: 422 }
      );
    }

    // Policy check
    if (store.paymentPolicy === 'pay_first' && paymentIntent === 'pay_later') {
      return NextResponse.json(
        {
          error: {
            code: 'POLICY_PAY_FIRST',
            message: 'This cafe requires upfront payment. Please select "Pay now".',
          },
        },
        { status: 422 }
      );
    }
    if (store.paymentPolicy === 'pay_later' && paymentIntent === 'pay_now') {
      return NextResponse.json(
        {
          error: {
            code: 'POLICY_PAY_LATER',
            message: 'This cafe only accepts payment at the counter. Please select "Pay later".',
          },
        },
        { status: 422 }
      );
    }

    // 3.5. Early Idempotency Check (before creating or mutating session totals)
    let existingOrder: any = null;
    if (conn) {
      try {
        existingOrder = await Order.findOne({
          storeId: storeSlug,
          idempotencyKey,
        }).lean();
      } catch (err) {}
    }
    if (!existingOrder) {
      existingOrder = findRuntimeOrderByIdempotencyKey(storeSlug, idempotencyKey);
    }

    if (existingOrder) {
      let existingSession: any = null;
      if (existingOrder.sessionId) {
        if (conn) {
          try {
            existingSession = await TableSession.findById(existingOrder.sessionId).lean();
          } catch (err) {}
        }
        if (!existingSession) {
          const allRuntime = Object.values(global.runtimeTableSessions || {}).flat();
          existingSession = allRuntime.find((s) => s.id === existingOrder.sessionId);
        }
      }
      return NextResponse.json(
        {
          success: true,
          order: existingOrder,
          session: existingSession || null,
          duplicate: true,
        },
        { status: 200 }
      );
    }

    // 4. Server-Side Price Calculation & Availability Verification (in paise)
    const processedItems = [];
    const unavailableIds: string[] = [];
    let subtotalPaise = 0;

    for (const reqItem of rawItems) {
      const catalogItem = await findMenuItem(storeSlug, reqItem.menuItemId);
      if (!catalogItem || !catalogItem.isAvailable) {
        unavailableIds.push(reqItem.menuItemId);
        continue;
      }

      // Base unit price
      let unitPricePaise = catalogItem.priceInPaise;
      let selectedVariant: any = undefined;

      if (reqItem.variantId && catalogItem.variants) {
        const foundVar = catalogItem.variants.find((v) => v.id === reqItem.variantId);
        if (foundVar) {
          unitPricePaise = foundVar.priceInPaise;
          selectedVariant = {
            id: foundVar.id,
            name: foundVar.name,
            price: foundVar.priceInPaise,
          };
        }
      }

      // Addons
      const selectedAddons: any[] = [];
      if (reqItem.addonIds && Array.isArray(reqItem.addonIds) && catalogItem.addons) {
        for (const addonId of reqItem.addonIds) {
          const foundAddon = catalogItem.addons.find((a) => a.id === addonId);
          if (foundAddon) {
            unitPricePaise += foundAddon.priceInPaise;
            selectedAddons.push({
              id: foundAddon.id,
              name: foundAddon.name,
              price: foundAddon.priceInPaise,
            });
          }
        }
      }

      const lineTotalPaise = unitPricePaise * reqItem.qty;
      subtotalPaise += lineTotalPaise;

      processedItems.push({
        itemId: catalogItem.id,
        menuItemId: catalogItem.id,
        name: catalogItem.name,
        quantity: reqItem.qty,
        qty: reqItem.qty,
        price: unitPricePaise / 100, // display in ₹
        unitPrice: unitPricePaise, // in paise
        variant: selectedVariant,
        addons: selectedAddons,
        notes: reqItem.note || '',
        note: reqItem.note || '',
        taxPercent: catalogItem.taxPercent || 5,
        lineTotal: lineTotalPaise,
        status: 'queued',
      });
    }

    if (unavailableIds.length > 0) {
      return NextResponse.json(
        {
          error: {
            code: 'ITEMS_UNAVAILABLE',
            message: 'Some items in your cart are currently out of stock.',
            unavailableItems: unavailableIds,
          },
        },
        { status: 409 }
      );
    }

    // 5. Abuse limit: Max Order Value (Default ₹10,000 = 1,000,000 paise)
    const maxOrderPaise = parseInt(process.env.MAX_ORDER_VALUE_INR || '10000', 10) * 100;
    if (subtotalPaise > maxOrderPaise) {
      return NextResponse.json(
        {
          error: {
            code: 'ORDER_LIMIT_EXCEEDED',
            message: `Order total exceeds the maximum limit of ₹${maxOrderPaise / 100}.`,
          },
        },
        { status: 400 }
      );
    }

    // 6. Tax, Service Charge & Platform Fee (in paise)
    const taxRate = store.taxRate || 5.0;
    let taxPaise = 0;
    if (store.taxInclusive) {
      taxPaise = Math.round(subtotalPaise - subtotalPaise / (1 + taxRate / 100));
    } else {
      taxPaise = Math.round(subtotalPaise * (taxRate / 100));
    }

    const serviceChargePaise = Math.round(
      subtotalPaise * ((store.serviceChargePercent || 0) / 100)
    );

    const platformFeePaise =
      store.platformFeeMode === 'customer' && paymentIntent === 'pay_now' ? 100 : 0;

    const grandTotalPaise =
      (store.taxInclusive ? subtotalPaise : subtotalPaise + taxPaise) +
      serviceChargePaise +
      platformFeePaise;

    // 7. Find or Create Active TableSession
    let session: any = null;
    if (conn) {
      try {
        session = await TableSession.findOne({
          storeId: storeSlug,
          tableId,
          status: { $in: ['open', 'bill_requested'] },
        });
      } catch (err) {}
    }
    if (!session) {
      session = findRuntimeActiveSession(storeSlug, tableId);
    }

    if (!session) {
      // Create fresh session
      const newSessionData = {
        storeId: storeSlug,
        tableId,
        status: 'open',
        customer: {
          name: customer?.name?.trim() || '',
          phone: customer?.phone?.trim() || '',
        },
        currency: 'INR',
        totals: {
          subtotal: subtotalPaise,
          tax: taxPaise,
          serviceCharge: serviceChargePaise,
          platformFee: platformFeePaise,
          discount: 0,
          roundOff: 0,
          grandTotal: grandTotalPaise,
          paid: 0,
          due: grandTotalPaise,
        },
      };

      if (conn) {
        try {
          session = await TableSession.create(newSessionData);
        } catch (err) {}
      }

      if (!session) {
        session = {
          id: `sess_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          _id: `sess_${Date.now()}`,
          ...newSessionData,
        };
      }
      saveRuntimeSession({
        id: String(session._id || session.id),
        storeId: storeSlug,
        tableId,
        status: 'open',
        customer: session.customer,
        currency: 'INR',
        totals: session.totals,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else {
      // Append to open tab
      session.totals.subtotal += subtotalPaise;
      session.totals.tax += taxPaise;
      session.totals.serviceCharge += serviceChargePaise;
      session.totals.platformFee += platformFeePaise;
      session.totals.grandTotal += grandTotalPaise;
      session.totals.due = Math.max(0, session.totals.grandTotal - session.totals.paid);

      if (conn && typeof session.save === 'function') {
        await session.save();
      }
      saveRuntimeSession({
        id: String(session._id || session.id),
        storeId: storeSlug,
        tableId,
        status: session.status,
        customer: session.customer,
        currency: 'INR',
        totals: session.totals,
        createdAt: session.createdAt || new Date(),
        updatedAt: new Date(),
      });
    }

    const sessionId = String(session._id || session.id);

    // 8. Generate Order Number & Status
    const orderNumber = `BP-${Math.floor(1000 + Math.random() * 9000)}`;
    const isPayLater = paymentIntent === 'pay_later';

    const orderData = {
      storeId: storeSlug,
      tableId,
      sessionId,
      orderNumber,
      table: table.number,
      source: 'qr_table',
      orderType: 'dine_in',
      items: processedItems,
      subtotal: subtotalPaise / 100, // in ₹ for legacy views
      discount: 0,
      tax: taxPaise / 100,
      total: grandTotalPaise / 100,
      status: isPayLater ? 'placed' : 'pending_payment',
      paymentIntent,
      paymentMode: isPayLater ? 'Cash / Counter UPI' : 'Online Razorpay',
      paymentStatus: 'pending',
      customerName: customer?.name?.trim() || '',
      customerPhone: customer?.phone?.trim() || '',
      notes: notes?.trim() || '',
      idempotencyKey,
      timestamps: {
        placedAt: new Date(),
      },
    };

    let createdOrder: any = null;
    if (conn) {
      try {
        createdOrder = await Order.create(orderData);
      } catch (err) {
        console.warn('[Create Order DB note]:', err);
      }
    }

    const finalOrder = createdOrder || {
      _id: `ord_${Date.now()}`,
      id: `ord_${Date.now()}`,
      ...orderData,
      createdAt: new Date(),
    };

    saveRuntimeOrder(finalOrder);

    // 10. Realtime Mirror to Firestore (if placed)
    if (isPayLater) {
      const itemsSummary = processedItems
        .map((i) => `${i.quantity}x ${i.name}`)
        .join(', ')
        .slice(0, 150);

      syncLiveOrderToFirestore(String(finalOrder.orderNumber || finalOrder._id), {
        storeId: storeSlug,
        status: 'placed',
        tableNumber: table.number,
        itemsSummary,
        total: grandTotalPaise / 100,
        paymentStatus: 'pending',
      }).catch(() => {});

      syncLiveTableToFirestore(tableId, {
        storeId: storeSlug,
        tableNumber: table.number,
        status: session.status,
        dueAmount: session.totals.due / 100,
        billRequested: session.status === 'bill_requested',
      }).catch(() => {});
    }

    return NextResponse.json(
      {
        success: true,
        order: {
          id: String(finalOrder._id || finalOrder.id),
          orderNumber: finalOrder.orderNumber,
          table: finalOrder.table,
          status: finalOrder.status,
          paymentIntent: finalOrder.paymentIntent,
          paymentStatus: finalOrder.paymentStatus,
          subtotal: subtotalPaise / 100,
          tax: taxPaise / 100,
          serviceCharge: serviceChargePaise / 100,
          platformFee: platformFeePaise / 100,
          grandTotal: grandTotalPaise / 100,
          items: processedItems,
          createdAt: finalOrder.createdAt,
        },
        session: {
          id: sessionId,
          status: session.status,
          totals: {
            subtotal: session.totals.subtotal / 100,
            tax: session.totals.tax / 100,
            serviceCharge: session.totals.serviceCharge / 100,
            grandTotal: session.totals.grandTotal / 100,
            paid: session.totals.paid / 100,
            due: session.totals.due / 100,
          },
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('[Public Order Placement Error]:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: error.message || 'Failed to place order' } },
      { status: 500 }
    );
  }
}
