import { NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '@/lib/rateLimit';
import { generateOtp } from '@/lib/otpService';
import { sendOtpEmail } from '@/lib/emailService';
import { syncOtpToFirestore, getAdminFirestore } from '@/lib/firebaseAdmin';
import { isValidEmail, normalizeEmail } from '@/lib/validation';
import { connectMongoDB } from '@/lib/mongodb';
import { User } from '@/lib/models/User';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const body = await req.json();
    const { email } = body;

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address (e.g., name@example.com).' },
        { status: 400 }
      );
    }

    const cleanEmail = normalizeEmail(email);

    // Prevent duplicate accounts: Ensure an email can only be registered once
    try {
      const conn = await connectMongoDB();
      if (conn) {
        const existing = await User.findOne({ email: cleanEmail });
        if (existing) {
          return NextResponse.json(
            { error: 'An account is already registered with this email address. Please log in instead.' },
            { status: 409 }
          );
        }
      }
    } catch (mErr: any) {
      console.warn('[send-otp-simple Mongo note]:', mErr?.message);
    }

    try {
      const firestore = getAdminFirestore();
      if (firestore) {
        const snap = await firestore
          .collection('users')
          .where('email', '==', cleanEmail)
          .limit(1)
          .get();

        if (!snap.empty) {
          return NextResponse.json(
            { error: 'An account is already registered with this email address. Please log in instead.' },
            { status: 409 }
          );
        }
      }
    } catch (fErr: any) {
      console.warn('[send-otp-simple Firestore note]:', fErr?.message);
    }

    // Rate limit: Max 4 OTP requests per 10 minutes per IP/email
    const limiter = rateLimit(`otp:${ip}:${cleanEmail}`, 4, 10 * 60 * 1000);
    if (!limiter.success) {
      return NextResponse.json(
        {
          error: `Too many verification requests. Please wait ${limiter.resetSeconds} seconds before requesting a new code.`,
        },
        {
          status: 429,
          headers: { 'Retry-After': limiter.resetSeconds.toString() },
        }
      );
    }

    // Generate secure 6-digit OTP (persisted in MongoDB)
    const { otp, expiresAt } = await generateOtp(cleanEmail);

    // Dual-sync OTP to Firestore
    syncOtpToFirestore(cleanEmail, otp, expiresAt).catch(() => {});

    // Dispatch real email via SMTP / Email Service
    await sendOtpEmail({
      to: cleanEmail,
      otp,
      expiresInMinutes: 10,
    });

    const isDev = process.env.NODE_ENV !== 'production';

    return NextResponse.json({
      success: true,
      message: `Verification code sent to ${cleanEmail}`,
      expiresAt,
      // Dev tester convenience
      ...(isDev ? { demoCode: otp } : {}),
    });
  } catch (err: any) {
    console.error('[send-otp-simple] Error:', err);
    return NextResponse.json({ error: err.message || 'Failed to send OTP.' }, { status: 500 });
  }
}
