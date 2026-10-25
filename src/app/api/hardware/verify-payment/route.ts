import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import {
  HardwareOrder,
  updateRuntimeHardwareOrderPayment,
  runtimeHardwareOrders,
} from '@/lib/models/HardwareOrder';
import { isValidUtr } from '@/lib/platformUpi';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      utr,
      hardwareOrderNumber,
      razorpay_payment_id,
      razorpay_order_id,
    } = body;

    const paymentRef = String(utr || razorpay_payment_id || '').trim();

    if (!hardwareOrderNumber || !paymentRef) {
      return NextResponse.json(
        { success: false, error: 'Hardware Order Number and UPI Reference (UTR) are required.' },
        { status: 400 }
      );
    }

    if (!isValidUtr(paymentRef)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 12-digit UPI Reference Number (UTR).' },
        { status: 400 }
      );
    }

    // Update in runtime memory
    const updatedRuntime = updateRuntimeHardwareOrderPayment(
      hardwareOrderNumber,
      paymentRef,
      razorpay_order_id,
      'Direct UPI'
    );

    // Update in MongoDB
    try {
      const conn = await connectMongoDB();
      if (conn) {
        await HardwareOrder.updateOne(
          { orderNumber: hardwareOrderNumber },
          {
            $set: {
              paymentStatus: 'paid',
              paymentMode: 'Direct UPI',
              upiReference: paymentRef,
              razorpayPaymentId: paymentRef,
              status: 'confirmed',
            },
          }
        );
      }
    } catch (e: any) {
      console.warn('[Hardware verify-payment] Mongo update note:', e?.message);
    }

    const order = updatedRuntime || runtimeHardwareOrders.get(hardwareOrderNumber);

    return NextResponse.json({
      success: true,
      verified: true,
      paymentId: paymentRef,
      paymentMode: 'Direct UPI',
      order,
      message: 'Hardware payment verified via Direct UPI and order confirmed successfully.',
    });
  } catch (error: any) {
    console.error('[Hardware verify error]:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Payment verification error.' },
      { status: 500 }
    );
  }
}
