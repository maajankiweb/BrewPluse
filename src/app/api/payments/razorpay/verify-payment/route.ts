import { NextResponse } from 'next/server';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { connectMongoDB } from '@/lib/mongodb';
import { Order } from '@/lib/models/Order';
import { syncOrderToFirestore, syncInvoiceToFirestore } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderNumber,
      storeSlug = 'brewpluse',
      amount = 0,
      customerName = '',
      customerEmail = '',
      table = '',
      items = [],
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json(
        { success: false, error: 'Missing Razorpay payment identifiers' },
        { status: 400 }
      );
    }

    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature || ''
    );

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature. Payment verification failed.' },
        { status: 400 }
      );
    }

    // Update order status in MongoDB
    try {
      const conn = await connectMongoDB();
      if (conn && orderNumber) {
        await Order.updateOne(
          { orderNumber },
          {
            $set: {
              paymentStatus: 'paid',
              paymentMode: 'Razorpay (Online/UPI)',
              razorpayOrderId: razorpay_order_id,
              razorpayPaymentId: razorpay_payment_id,
              status: 'confirmed',
            },
          }
        );
      }
    } catch (e: any) {
      console.warn('[Razorpay verify-payment] Mongo update note:', e?.message);
    }

    // Dual-sync update to Firestore
    syncOrderToFirestore({
      orderNumber,
      storeSlug,
      paymentStatus: 'paid',
      paymentMode: 'Razorpay (Online/UPI)',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      total: amount,
      customerName,
      table,
      status: 'confirmed',
    }).catch(() => {});

    // Save paid invoice copy in Firestore
    syncInvoiceToFirestore({
      invoiceNumber: `INV-${orderNumber || Date.now()}`,
      orderNumber,
      storeName: storeSlug,
      customerName,
      customerEmail,
      total: amount,
      paymentMode: 'Razorpay',
      razorpayPaymentId: razorpay_payment_id,
      status: 'paid',
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      verified: true,
      paymentId: razorpay_payment_id,
      message: 'Payment verified and order updated successfully.',
    });
  } catch (error: any) {
    console.error('[Razorpay verify error]:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
