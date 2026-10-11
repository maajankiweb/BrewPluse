import { NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '@/lib/rateLimit';
import { generateOtp } from '@/lib/otpService';
import { sendOtpEmail } from '@/lib/emailService';

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !email.includes('@') || email.length > 120) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

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

    // Dispatch real email via SMTP / Email Service
    await sendOtpEmail({
      to: cleanEmail,
      otp,
      expiresInMinutes: 5,
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
