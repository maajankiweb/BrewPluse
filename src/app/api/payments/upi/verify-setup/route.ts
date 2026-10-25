import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { syncInvoiceToFirestore } from '@/lib/firebaseAdmin';
import { isValidUtr } from '@/lib/platformUpi';

export const dynamic = 'force-dynamic';

/**
 * GET: Check if a user (by email or uid) has completed setup verification
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email')?.trim().toLowerCase();
    const uid = searchParams.get('uid')?.trim();

    if (!email && !uid) {
      return NextResponse.json({
        verified: false,
        message: 'Email or User ID is required.',
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
        paymentId: record.upiReference || record.razorpayPaymentId || 'VERIFIED_UPI',
        verifiedAt: record.verifiedAt,
      });
    }

    return NextResponse.json({
      verified: false,
      message: 'No completed verification found for this account.',
    });
  } catch (error: any) {
    console.error('[verify-setup-upi GET error]:', error);
    return NextResponse.json(
      { verified: false, error: error?.message || 'Failed to check verification' },
      { status: 500 }
    );
  }
}

/**
 * POST: Verify Direct UPI payment with 12-digit UTR reference
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      utr,
      email = '',
      uid = '',
      amount = 1,
    } = body;

    const cleanUtr = String(utr || '').trim();
    if (!cleanUtr || !isValidUtr(cleanUtr)) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: 'Please enter a valid 12-digit UPI Reference Number (UTR).',
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
              paymentMode: 'Direct UPI',
              upiReference: cleanUtr,
              amount: amount || 1,
              status: 'verified',
              verifiedAt: new Date(),
            },
          },
          { upsert: true }
        );

        // Update User profile
        if (normalizedEmail) {
          await db.collection('users').updateOne(
            { email: normalizedEmail },
            {
              $set: {
                isAccountVerified: true,
                setupPaidAt: new Date(),
                setupPaymentId: cleanUtr,
                setupPaymentMode: 'Direct UPI',
              },
            }
          );
        }
      }
    } catch (dbErr: any) {
      console.warn('[verify-setup-upi DB save note]:', dbErr?.message);
    }

    // Sync invoice receipt to Firestore
    try {
      syncInvoiceToFirestore({
        invoiceNumber: `INV-UPI-${Date.now()}`,
        orderNumber: `SETUP-${cleanUtr.slice(-6)}`,
        storeName: 'Account Verification',
        customerName: email?.split('@')[0] || 'Store Owner',
        customerEmail: normalizedEmail,
        total: amount || 1,
        paymentMode: 'Direct UPI',
        status: 'paid',
      }).catch(() => {});
    } catch (e) {}

    return NextResponse.json({
      success: true,
      verified: true,
      paymentId: cleanUtr,
      message: 'Account successfully verified via Direct UPI.',
    });
  } catch (error: any) {
    console.error('[verify-setup-upi POST error]:', error);
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

