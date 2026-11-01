import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { Store } from '@/lib/models/Store';
import { User } from '@/lib/models/User';
import { getSessionFromRequest, createSessionToken } from '@/lib/authService';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const session = getSessionFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const {
      email: bodyEmail,
      uid: bodyUid,
      businessName,
      ownerName,
      imageUrl,
      address,
      latitude,
      longitude,
      gpsRadiusMeters = 100,
      paperSize = '80mm',
    } = body;

    const cleanEmail = (session?.email || bodyEmail || '').trim().toLowerCase();
    const cleanUid =
      session?.uid ||
      bodyUid ||
      (cleanEmail
        ? 'usr_' + Buffer.from(cleanEmail).toString('hex').slice(0, 12)
        : '');

    if (!cleanEmail || !cleanEmail.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email address is required to activate your cafe profile.' },
        { status: 400 }
      );
    }

    if (!businessName || !businessName.trim()) {
      return NextResponse.json(
        { error: 'Business / Café Name is required.' },
        { status: 400 }
      );
    }

    let isPaymentVerified = false;
    let isAuthorized = !!session;

    const mongo = await connectMongoDB();
    if (mongo) {
      const db = mongo.connection.db;

      // Verify payment against setup_verifications collection
      const verification = await db.collection('setup_verifications').findOne({
        $or: [{ email: cleanEmail }, { uid: cleanUid }],
        status: 'verified',
      });

      if (verification) {
        isPaymentVerified = true;
        isAuthorized = true;
      } else {
        const userDoc = await User.findOne({ email: cleanEmail });
        if (userDoc && (userDoc as any).isAccountVerified) {
          isPaymentVerified = true;
          isAuthorized = true;
        }
      }
    }

    if (!isAuthorized && !isPaymentVerified) {
      return NextResponse.json(
        {
          error:
            'Unauthorized. Please complete the ₹1 setup verification or sign in to activate your cafe.',
        },
        { status: 401 }
      );
    }

    const cleanSlug =
      businessName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') ||
      session?.storeSlug ||
      'my-cafe';

    const cleanOwnerName = (ownerName || session?.storeName || '').trim() || 'Cafe Owner';

    const storeData = {
      name: businessName.trim(),
      slug: cleanSlug,
      email: cleanEmail,
      ownerUid: cleanUid,
      ownerName: cleanOwnerName,
      address: address || 'Main Street, India',
      imageUrl: imageUrl || '',
      latitude: latitude ? Number(latitude) : undefined,
      longitude: longitude ? Number(longitude) : undefined,
      gpsRadiusMeters: Number(gpsRadiusMeters) || 100,
      paymentTokenVerified: isPaymentVerified,
      setupCompleted: true,
      printSettings: {
        paperSize: paperSize === '58mm' ? '58mm' : '80mm',
        autoCut: true,
        headerGreeting: `Welcome to ${businessName.trim()}`,
        footerMessage: 'Thank you for dining with us! Visit again.',
      },
    };

    if (mongo) {
      const existingStore = await Store.findOne({
        $or: [{ email: cleanEmail }, { slug: cleanSlug }],
      });

      if (existingStore) {
        existingStore.name = storeData.name;
        existingStore.slug = storeData.slug;
        existingStore.ownerName = storeData.ownerName;
        existingStore.address = storeData.address;
        existingStore.imageUrl = storeData.imageUrl;
        existingStore.latitude = storeData.latitude;
        existingStore.longitude = storeData.longitude;
        existingStore.gpsRadiusMeters = storeData.gpsRadiusMeters;
        existingStore.paymentTokenVerified = isPaymentVerified;
        existingStore.setupCompleted = true;
        await existingStore.save();
      } else {
        await Store.create(storeData);
      }

      // Update User with storeName and cafe owner's real name
      await User.findOneAndUpdate(
        { email: cleanEmail },
        {
          $set: {
            storeName: storeData.name,
            name: cleanOwnerName,
          },
        },
        { upsert: true }
      );
    }

    // Generate signed session token for seamless immediate dashboard access
    const sessionToken = createSessionToken({
      uid: cleanUid,
      email: cleanEmail,
      role: 'owner',
      storeName: storeData.name,
      storeSlug: cleanSlug,
    });

    const response = NextResponse.json({
      success: true,
      message: 'Store profile successfully configured and activated!',
      store: storeData,
      token: sessionToken,
    });

    // Set secure HttpOnly session cookie on the response so dashboard middleware passes
    response.cookies.set({
      name: 'brewpluse_session',
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (err: any) {
    console.error('[Setup API] Error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to complete store setup.' },
      { status: 500 }
    );
  }
}
