import { NextResponse } from 'next/server';
import { isValidEmail, normalizeEmail } from '@/lib/validation';
import { connectMongoDB } from '@/lib/mongodb';
import { User } from '@/lib/models/User';
import { getAdminFirestore } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const emailParam = searchParams.get('email');

    if (!emailParam) {
      return NextResponse.json(
        { exists: false, error: 'Email parameter is required.' },
        { status: 400 }
      );
    }

    if (!isValidEmail(emailParam)) {
      return NextResponse.json(
        { exists: false, error: 'Invalid email address format.' },
        { status: 400 }
      );
    }

    const cleanEmail = normalizeEmail(emailParam);

    // 1. Check MongoDB for existing account
    try {
      const conn = await connectMongoDB();
      if (conn) {
        const existing = await User.findOne({ email: cleanEmail });
        if (existing) {
          return NextResponse.json({
            exists: true,
            message: 'An account is already registered with this email address. Please log in instead.',
          });
        }
      }
    } catch (mErr: any) {
      console.warn('[check-email Mongo note]:', mErr?.message);
    }

    // 2. Check Firestore for existing user document
    try {
      const firestore = getAdminFirestore();
      if (firestore) {
        const snap = await firestore
          .collection('users')
          .where('email', '==', cleanEmail)
          .limit(1)
          .get();

        if (!snap.empty) {
          return NextResponse.json({
            exists: true,
            message: 'An account is already registered with this email address. Please log in instead.',
          });
        }
      }
    } catch (fErr: any) {
      console.warn('[check-email Firestore note]:', fErr?.message);
    }

    return NextResponse.json({
      exists: false,
      message: 'Email is available for registration.',
    });
  } catch (error: any) {
    console.error('[check-email error]:', error);
    return NextResponse.json(
      { exists: false, error: error?.message || 'Server error while checking email availability.' },
      { status: 500 }
    );
  }
}
