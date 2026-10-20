import { NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '@/lib/rateLimit';
import { createSessionToken, verifyPassword } from '@/lib/authService';
import { connectMongoDB } from '@/lib/mongodb';
import { User } from '@/lib/models/User';
import { createStaffFirebaseCustomToken } from '@/lib/firebaseAdmin';

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);

    // Rate limit: Max 5 attempts per 15 minutes per IP
    const limiter = rateLimit(`login:${ip}`, 5, 15 * 60 * 1000);
    if (!limiter.success) {
      return NextResponse.json(
        {
          error: `Too many login attempts. Please try again in ${limiter.resetSeconds} seconds.`,
        },
        {
          status: 429,
          headers: { 'Retry-After': limiter.resetSeconds.toString() },
        }
      );
    }

    const body = await req.json();
    const { email, password } = body;

    // Strict validation
    if (!email || typeof email !== 'string' || !email.includes('@') || email.length > 120) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string' || password.length < 6 || password.length > 128) {
      return NextResponse.json(
        { error: 'Password must be between 6 and 128 characters.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    let userId = 'usr_' + Buffer.from(cleanEmail).toString('hex').slice(0, 12);
    let userRole = 'owner';
    let storeName = 'BrewPluse Cafe';

    // Demo Cafe Account setup
    const isDemoAccount =
      cleanEmail === 'demo@brewpluse.com' &&
      (password === 'BrewPluse@2026' || password === 'demo1234' || password === 'admin123');

    if (isDemoAccount) {
      userId = 'usr_demo_brewpluse_owner';
      userRole = 'owner';
      storeName = 'BrewPluse Specialty Cafe';
    } else {
      // Verify against MongoDB
      try {
        const mongo = await connectMongoDB();
        if (mongo) {
          const userDoc = await User.findOne({ email: cleanEmail });
          if (userDoc) {
            const isValid = verifyPassword(password, userDoc.passwordHash, userDoc.passwordSalt);
            if (!isValid) {
              return NextResponse.json(
                { error: 'Invalid email or password.' },
                { status: 401 }
              );
            }

            userId = userDoc._id.toString();
            userRole = userDoc.role;
            storeName = userDoc.storeName;
          } else {
            // If user doesn't exist in MongoDB yet
            if (process.env.NODE_ENV === 'production') {
              return NextResponse.json(
                { error: 'Account not found. Please sign up to create your cafe account.' },
                { status: 404 }
              );
            }
          }
        }
      } catch (dbErr: any) {
        console.warn('[login] MongoDB lookup bypassed:', dbErr.message);
      }
    }

    const storeSlug =
      storeName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') || 'brewpluse';

    // Authenticated user payload
    const user = {
      uid: userId,
      email: cleanEmail,
      role: userRole,
      storeName,
      storeSlug,
    };

    // Generate tamper-proof session token
    const token = createSessionToken(user);

    // Generate Firebase custom token for live Firestore listener authorization
    let firebaseCustomToken: string | null = null;
    try {
      firebaseCustomToken = await createStaffFirebaseCustomToken(userId, {
        storeSlug,
        role: (userRole as any) || 'owner',
      });
    } catch (e) {
      console.warn('[login] Firebase custom token note:', e);
    }

    const response = NextResponse.json({
      success: true,
      message: 'Login successful.',
      user,
      firebaseCustomToken,
    });

    // Set secure HttpOnly session cookie
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
    console.error('[login] Error:', err);
    return NextResponse.json({ error: err.message || 'Login failed.' }, { status: 500 });
  }
}
