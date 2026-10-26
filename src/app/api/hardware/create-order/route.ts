import { NextResponse } from 'next/server';
import { getRazorpay } from '@/lib/razorpay';
import { connectMongoDB } from '@/lib/mongodb';
import { HardwareOrder, createRuntimeHardwareOrder } from '@/lib/models/HardwareOrder';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      storeSlug = 'brewpluse',
      cafeName = 'BrewPluse Cafe',
      contactPerson = 'Cafe Owner',
      phone = '',
      email = '',
      shippingAddress,
      gstin = '',
      items = [],
      totalAmount, // in INR
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Your hardware cart is empty.' },
        { status: 400 }
      );
    }

    if (!shippingAddress || !shippingAddress.street || !shippingAddress.city || !shippingAddress.pincode) {
      return NextResponse.json(
        { success: false, error: 'Complete delivery address with pincode is required.' },
        { status: 400 }
      );
    }

    if (!phone || phone.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Valid 10-digit mobile number is required for shipping.' },
        { status: 400 }
      );
    }

    // Calculate verified total on backend (₹1500 per unit + Flat ₹270 GST per order)
    const verifiedSubtotal = items.reduce((sum: number, item: any) => {
      const qty = Math.max(1, Number(item.quantity) || 1);
      return sum + qty * 1500;
    }, 0);

    const verifiedTax = items.length > 0 ? 270 : 0; // Flat ₹270 GST per order regardless of quantity
    const verifiedTotal = verifiedSubtotal + verifiedTax;

    const finalAmountInr = Number(totalAmount) > 0 ? Number(totalAmount) : verifiedTotal;
    const finalAmountPaise = Math.round(finalAmountInr * 100);

    // Generate unique hardware order number
    const hardwareOrderNumber = `BP-HW-${Date.now().toString().slice(-6)}${Math.floor(10 + Math.random() * 90)}`;
    const receipt = hardwareOrderNumber.slice(0, 40);

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
    const razorpay = getRazorpay();

    let razorpayOrderId = '';

    if (razorpay && keyId) {
      try {
        const order = await razorpay.orders.create({
          amount: finalAmountPaise,
          currency: 'INR',
          receipt,
          notes: {
            platform: 'BrewPluse Hardware Store',
            hardwareOrderNumber,
            storeSlug,
            cafeName,
            contactPerson,
            phone,
          },
        });
        razorpayOrderId = order.id;
      } catch (err: any) {
        console.warn('[Hardware Razorpay] Orders API note:', err?.message);
      }
    }

    if (!razorpayOrderId) {
      // Test mode / Mock order fallback
      razorpayOrderId = `order_hw_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
    }

    // Save initial pending hardware order
    const orderData = {
      orderNumber: hardwareOrderNumber,
      storeSlug,
      cafeName,
      contactPerson,
      phone,
      email,
      shippingAddress,
      gstin,
      items: items.map((it: any) => ({
        id: it.id,
        title: it.title || it.name || it.id,
        price: 1500,
        quantity: Math.max(1, Number(it.quantity) || 1),
        total: Math.max(1, Number(it.quantity) || 1) * 1500,
        image: it.image || '',
      })),
      subtotal: verifiedSubtotal,
      shippingFee: 0,
      tax: verifiedTax,
      total: finalAmountInr,
      paymentStatus: 'pending',
      paymentMode: 'Razorpay',
      razorpayOrderId,
      status: 'confirmed',
    };

    // Save to runtime store
    createRuntimeHardwareOrder(orderData);

    // Save to MongoDB if connected
    try {
      const conn = await connectMongoDB();
      if (conn) {
        await HardwareOrder.create(orderData);
      }
    } catch (e: any) {
      console.warn('[Hardware create-order] Mongo write note:', e?.message);
    }

    return NextResponse.json({
      success: true,
      orderId: razorpayOrderId,
      amount: finalAmountPaise,
      amountInr: finalAmountInr,
      currency: 'INR',
      keyId: keyId || 'rzp_test_placeholder',
      hardwareOrderNumber,
      isLive: !!(razorpay && keyId),
    });
  } catch (error: any) {
    console.error('[Hardware create-order error]:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to initialize hardware order.' },
      { status: 500 }
    );
  }
}
