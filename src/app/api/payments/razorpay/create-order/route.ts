import { NextResponse } from 'next/server';
import { getRazorpay } from '@/lib/razorpay';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      amount, // in INR
      currency = 'INR',
      receipt = `rcpt_${Date.now()}`,
      notes = {},
    } = body;

    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment amount' },
        { status: 400 }
      );
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
    const razorpay = getRazorpay();

    // If real Razorpay keys are configured:
    if (razorpay && keyId) {
      const order = await razorpay.orders.create({
        amount: Math.round(numAmount * 100), // convert to paise
        currency: currency.toUpperCase(),
        receipt: String(receipt).slice(0, 40),
        notes: {
          platform: 'BrewPluse',
          ...notes,
        },
      });

      return NextResponse.json({
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId,
        isLive: true,
      });
    }

    // Graceful fallback for local dev / testing before merchant adds keys
    const mockOrderId = `order_mock_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    return NextResponse.json({
      success: true,
      orderId: mockOrderId,
      amount: Math.round(numAmount * 100),
      currency: 'INR',
      keyId: keyId || 'rzp_test_placeholder',
      isLive: false,
      message: 'Razorpay test mode active. Add RAZORPAY_KEY_ID in .env.local for live payments.',
    });
  } catch (error: any) {
    console.error('[Razorpay create-order error]:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to create Razorpay order' },
      { status: 500 }
    );
  }
}
