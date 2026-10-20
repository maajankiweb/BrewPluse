import { NextResponse } from 'next/server';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { connectMongoDB } from '@/lib/mongodb';
import {
  HardwareOrder,
  updateRuntimeHardwareOrderPayment,
  runtimeHardwareOrders,
} from '@/lib/models/HardwareOrder';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      hardwareOrderNumber,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !hardwareOrderNumber) {
      return NextResponse.json(
        { success: false, error: 'Missing Razorpay verification tokens.' },
        { status: 400 }
      );
    }

    // Verify cryptographic signature
    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature || ''
    );

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Cryptographic payment verification failed.' },
        { status: 400 }
      );
    }

    // Update in runtime memory
    const updatedRuntime = updateRuntimeHardwareOrderPayment(
      hardwareOrderNumber,
      razorpay_payment_id,
      razorpay_order_id
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
              razorpayPaymentId: razorpay_payment_id,
              razorpayOrderId: razorpay_order_id,
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
      paymentId: razorpay_payment_id,
      order,
      message: 'Hardware payment verified and order confirmed successfully.',
    });
  } catch (error: any) {
    console.error('[Hardware verify error]:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Payment verification error.' },
      { status: 500 }
    );
  }
}
