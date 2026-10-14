import { NextResponse } from 'next/server';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { connectMongoDB } from '@/lib/mongodb';
import { syncInvoiceToFirestore } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

/**
 * GET: Check if a user (by email or uid) has completed ₹1.00 verification
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email')?.trim().toLowerCase();
    const uid = searchParams.get('uid')?.trim();

    if (!email && !uid) {
      return NextResponse.json({
        verified: false,
        message: 'Email or User ID is required to check verification status.',
      });
    }

    const conn = await connectMongoDB();
    if (!conn) {
      return NextResponse.json({
        verified: false,
        message: 'Database connection unavailable.',
      });
    }

    const db = conn.connection.db;
    const query: any = {};
    const orConditions: any[] = [];
    if (email) orConditions.push({ email });
    if (uid) orConditions.push({ uid });
    if (orConditions.length > 0) query.$or = orConditions;

    const record = await db.collection('setup_verifications').findOne({
      ...query,
      status: 'verified',
    });

    if (record) {
      return NextResponse.json({
        verified: true,
        paymentId: record.razorpayPaymentId,
        verifiedAt: record.verifiedAt,
      });
    }

    return NextResponse.json({
      verified: false,
      message: 'No completed ₹1.00 verification payment found for this account.',
    });
  } catch (error: any) {
    console.error('[verify-setup GET error]:', error);
    return NextResponse.json(
      { verified: false, error: error?.message || 'Failed to check verification' },
      { status: 500 }
    );
  }
}

/**
 * POST: Verify payment signature and store verification record
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email = '',
      uid = '',
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json(
        { success: false, verified: false, error: 'Missing payment identifiers' },
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
        {
          success: false,
          verified: false,
          error: 'Invalid payment signature. Verification rejected.',
        },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email || '').trim().toLowerCase();

    // Store in MongoDB
    try {
      const conn = await connectMongoDB();
      if (conn) {
        const db = conn.connection.db;
        await db.collection('setup_verifications').updateOne(
          {
            $or: [
              ...(normalizedEmail ? [{ email: normalizedEmail }] : []),
              ...(uid ? [{ uid }] : []),
            ],
          },
          {
            $set: {
              email: normalizedEmail,
              uid,
              razorpayOrderId: razorpay_order_id,
              razorpayPaymentId: razorpay_payment_id,
              amount: 100, // ₹1.00 in paise
              status: 'verified',
              verifiedAt: new Date(),
            },
          },
          { upsert: true }
        );

        // Also update User profile if exists
        if (normalizedEmail) {
          await db.collection('users').updateOne(
            { email: normalizedEmail },
            {
              $set: {
                isAccountVerified: true,
                setupPaidAt: new Date(),
                setupPaymentId: razorpay_payment_id,
              },
            }
          );
        }
      }
    } catch (dbErr: any) {
      console.warn('[verify-setup DB save note]:', dbErr?.message);
    }

    // Sync invoice receipt to Firestore
    try {
      syncInvoiceToFirestore({
        invoiceNumber: `INV-VERIFY-${Date.now()}`,
        orderNumber: `SETUP-${Date.now().toString().slice(-6)}`,
        storeName: 'Account Verification',
        customerName: email?.split('@')[0] || 'Store Owner',
        customerEmail: normalizedEmail,
        total: 1,
        paymentMode: 'Razorpay Verification',
        razorpayPaymentId: razorpay_payment_id,
        status: 'paid',
      }).catch(() => {});
    } catch (e) {}

    return NextResponse.json({
      success: true,
      verified: true,
      paymentId: razorpay_payment_id,
      message: 'Account successfully verified.',
    });
  } catch (error: any) {
    console.error('[verify-setup POST error]:', error);
    return NextResponse.json(
      { success: false, verified: false, error: error?.message || 'Verification failed' },
      { status: 500 }
    );
  }
}

/**
 * DELETE: Clear test verification (for debugging/testing)
 */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email')?.trim().toLowerCase();
    const uid = searchParams.get('uid')?.trim();

    const conn = await connectMongoDB();
    if (conn) {
      const db = conn.connection.db;
      const orConditions: any[] = [];
      if (email) orConditions.push({ email });
      if (uid) orConditions.push({ uid });
      if (orConditions.length > 0) {
        await db.collection('setup_verifications').deleteMany({ $or: orConditions });
      }
    }

    return NextResponse.json({ success: true, message: 'Verification records cleared.' });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message }, { status: 500 });
  }
}
