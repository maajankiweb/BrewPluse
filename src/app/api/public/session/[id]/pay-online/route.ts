import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { TableSession } from '@/lib/models/TableSession';
import { createRazorpayOrder } from '@/lib/razorpay';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/public/session/:id/pay-online
 * Creates a Razorpay order for the current session's remaining due balance.
 */
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id: sessionId } = await params;
    if (!sessionId) {
      return NextResponse.json(
        { error: { code: 'INVALID_ID', message: 'Session ID is required.' } },
        { status: 400 }
      );
    }

    const conn = await connectMongoDB();
    let session: any = null;

    if (conn) {
      try {
        session = await TableSession.findById(sessionId);
      } catch (err) {}
    }

    if (!session) {
      const allSessions = Object.values(global.runtimeTableSessions || {}).flat();
      session = allSessions.find((s) => s.id === sessionId);
    }

    if (!session) {
      return NextResponse.json(
        { error: { code: 'SESSION_NOT_FOUND', message: 'Dining session not found.' } },
        { status: 404 }
      );
    }

    const duePaise = session.totals?.due ?? 0;
    if (duePaise <= 0 || session.status === 'paid' || session.status === 'closed') {
      return NextResponse.json(
        {
          error: {
            code: 'ALREADY_PAID',
            message: 'This session has no remaining balance to pay.',
          },
        },
        { status: 409 }
      );
    }

    const rpOrder = await createRazorpayOrder({
      amount: duePaise,
      currency: 'INR',
      receipt: `due_${sessionId.slice(-6)}`,
      notes: {
        storeSlug: session.storeId,
        sessionId: String(session._id || session.id),
      },
    });

    return NextResponse.json({
      success: true,
      razorpay: {
        orderId: rpOrder.id,
        keyId:
          process.env.RAZORPAY_KEY_ID ||
          process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
          'rzp_test_brewpluse2026',
        amount: duePaise,
        currency: 'INR',
      },
    });
  } catch (error: any) {
    console.error('[Pay Online Error]:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: error.message || 'Failed to initiate online payment' } },
      { status: 500 }
    );
  }
}
