import { NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '@/lib/rateLimit';
import { verifyOtp } from '@/lib/otpService';
import { hashPassword, createSessionToken } from '@/lib/authService';
import { connectMongoDB } from '@/lib/mongodb';
import { User } from '@/lib/models/User';
import { verifyOtpFromFirestore, getAdminFirestore } from '@/lib/firebaseAdmin';

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const body = await req.json();
    const { email, otp, password, referralCode } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    if (!otp || typeof otp !== 'string' || otp.trim().length !== 6) {
      return NextResponse.json(
        { error: 'Please enter a valid 6-digit verification code.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Rate limit verification attempts: Max 5 attempts per 10 minutes per IP
    const limiter = rateLimit(`verify:${ip}:${cleanEmail}`, 5, 10 * 60 * 1000);
    if (!limiter.success) {
      return NextResponse.json(
        {
          error: `Too many failed attempts. Please wait ${limiter.resetSeconds} seconds.`,
        },
        {
          status: 429,
          headers: { 'Retry-After': limiter.resetSeconds.toString() },
        }
      );
    }

    // 1. Verify OTP (check memory/MongoDB or Firestore)
    let verifyResult = await verifyOtp(cleanEmail, otp.trim());
    if (!verifyResult.success) {
      const firestoreVerified = await verifyOtpFromFirestore(cleanEmail, otp.trim());
      if (firestoreVerified) {
        verifyResult = { success: true };
      }
    }

    if (!verifyResult.success) {
      return NextResponse.json(
        { error: verifyResult.error || 'Invalid verification code.' },
        { status: 401 }
      );
    }

    // 2. Hash Password securely
    const { hash, salt } = hashPassword(password);

    // 3. Persist / Update user in MongoDB
    let userId = 'usr_' + Buffer.from(cleanEmail).toString('hex').slice(0, 12);
    let userRole = 'owner';
    let storeName = 'BrewPluse Cafe';

    try {
      const mongo = await connectMongoDB();
      if (mongo) {
        let existingUser = await User.findOne({ email: cleanEmail });

        if (existingUser) {
          existingUser.passwordHash = hash;
          existingUser.passwordSalt = salt;
          existingUser.isVerified = true;
          if (referralCode) existingUser.referredBy = referralCode.trim().toUpperCase();
          await existingUser.save();

          userId = existingUser._id.toString();
          userRole = existingUser.role;
          storeName = existingUser.storeName;
        } else {
          const newUser = await User.create({
            email: cleanEmail,
            passwordHash: hash,
            passwordSalt: salt,
            name: cleanEmail.split('@')[0],
            role: 'owner',
            isVerified: true,
            storeName: 'BrewPluse Cafe',
            referredBy: referralCode ? referralCode.trim().toUpperCase() : undefined,
          });

          userId = newUser._id.toString();
          userRole = newUser.role;
          storeName = newUser.storeName;
        }
      }
    } catch (dbErr: any) {
      console.warn('[verify-otp-simple] MongoDB error, continuing with session issuance:', dbErr.message);
    }

    // 3.5. Sync user to Firestore collection 'users'
    try {
      const fdb = getAdminFirestore();
      if (fdb) {
        fdb.collection('users').doc(cleanEmail).set(
          {
            uid: userId,
            email: cleanEmail,
            role: userRole,
            storeName,
            isVerified: true,
            updatedAt: new Date(),
          },
          { merge: true }
        ).catch(() => {});
      }
    } catch (e) {}

    // 4. Create secure JWT session token
    const sessionUser = {
      uid: userId,
      email: cleanEmail,
      role: userRole,
      storeName,
    };

    const token = createSessionToken(sessionUser);

    const response = NextResponse.json({
      success: true,
      message: 'Account verified and created successfully.',
      user: {
        uid: userId,
        email: cleanEmail,
        role: userRole,
        storeName,
      },
    });

    // Set secure HTTP-only session cookie
    response.cookies.set({
      name: 'brewpluse_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (err: any) {
    console.error('[verify-otp-simple] Server error:', err);
    return NextResponse.json(
      { error: err.message || 'Verification failed. Please try again.' },
      { status: 500 }
    );
  }
}
