import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { User } from '@/lib/models/User';
import { Store } from '@/lib/models/Store';
import { createSessionToken } from '@/lib/authService';
import { createStaffFirebaseCustomToken } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, uid, displayName } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanUid =
      uid || 'usr_' + Buffer.from(cleanEmail).toString('hex').slice(0, 12);

    let userRole = 'owner';
    let storeName = 'BrewPluse Cafe';
    let storeSlug = 'my-cafe';
    let hasStore = false;
    let ownerName = displayName || cleanEmail.split('@')[0];

    try {
      const mongo = await connectMongoDB();
      if (mongo) {
        let userDoc = await User.findOne({ email: cleanEmail });
        if (!userDoc) {
          userDoc = await User.create({
            email: cleanEmail,
            name: ownerName,
            passwordHash: 'oauth2_google_provider',
            passwordSalt: 'oauth2_google_provider',
            role: 'owner',
            isVerified: true,
            storeName: `${ownerName}'s Cafe`,
          });
        }

        userRole = userDoc.role || 'owner';
        ownerName = userDoc.name || ownerName;
        storeName = userDoc.storeName || `${ownerName}'s Cafe`;

        // Check if store already exists for this account
        const storeDoc = await Store.findOne({
          $or: [{ email: cleanEmail }, { ownerUid: cleanUid }],
        });

        if (storeDoc) {
          hasStore = true;
          storeName = storeDoc.name || storeName;
          storeSlug = storeDoc.slug || storeSlug;
          if (storeDoc.ownerName) {
            ownerName = storeDoc.ownerName;
          }
        } else {
          storeSlug =
            storeName
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, '') || 'my-cafe';
        }
      }
    } catch (dbErr: any) {
      console.warn('[auth/google] Database operation note:', dbErr.message);
    }

    const sessionUser = {
      uid: cleanUid,
      email: cleanEmail,
      role: userRole,
      name: ownerName,
      storeName,
      storeSlug,
    };

    // Generate tamper-proof signed session token
    const token = createSessionToken(sessionUser);

    // Generate Firebase custom token for live Firestore listener authorization
    let firebaseCustomToken: string | null = null;
    try {
      firebaseCustomToken = await createStaffFirebaseCustomToken(cleanUid, {
        storeSlug,
        role: (userRole as any) || 'owner',
      });
    } catch (e) {
      console.warn('[auth/google] Firebase custom token note:', e);
    }

    const response = NextResponse.json({
      success: true,
      message: 'Google authentication successful.',
      user: sessionUser,
      token,
      firebaseCustomToken,
      hasStore,
      storeSlug,
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
    console.error('[auth/google] Server error:', err);
    return NextResponse.json(
      { error: err.message || 'Google authentication failed.' },
      { status: 500 }
    );
  }
}
