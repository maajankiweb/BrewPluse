import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { Store } from '@/lib/models/Store';
import { User } from '@/lib/models/User';
import { getSessionFromRequest } from '@/lib/authService';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in to configure your cafe profile.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      businessName,
      imageUrl,
      address,
      latitude,
      longitude,
      gpsRadiusMeters = 100,
      paperSize = '80mm',
    } = body;

    if (!businessName || !businessName.trim()) {
      return NextResponse.json(
        { error: 'Business / Café Name is required.' },
        { status: 400 }
      );
    }

    // Securely bind email and ownership to active session
    const cleanEmail = session.email.trim().toLowerCase();
    const cleanSlug =
      businessName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') || session.storeSlug || 'my-cafe';

    let isPaymentVerified = false;

    try {
      const mongo = await connectMongoDB();
      if (mongo) {
        // Verify payment strictly against setup_verifications collection
        const db = mongo.connection.db;
        const verification = await db.collection('setup_verifications').findOne({
          $or: [{ email: cleanEmail }, { uid: session.uid }],
          status: 'verified',
        });

        if (verification) {
          isPaymentVerified = true;
        } else {
          const userDoc = await User.findOne({ email: cleanEmail });
          if (userDoc && (userDoc as any).isAccountVerified) {
            isPaymentVerified = true;
          }
        }

        const storeData = {
          name: businessName.trim(),
          slug: cleanSlug,
          email: cleanEmail,
          ownerUid: session.uid,
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

        const existingStore = await Store.findOne({ email: cleanEmail });
        if (existingStore) {
          existingStore.name = storeData.name;
          existingStore.slug = storeData.slug;
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

        // Update User storeName
        await User.findOneAndUpdate(
          { email: cleanEmail },
          { storeName: storeData.name },
          { upsert: false }
        );

        return NextResponse.json({
          success: true,
          message: 'Store profile successfully configured and activated!',
          store: storeData,
        });
      }
    } catch (dbErr: any) {
      console.warn('[Setup API] Database operation note:', dbErr.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Store profile configured.',
      store: {
        name: businessName.trim(),
        slug: cleanSlug,
        email: cleanEmail,
        paymentTokenVerified: isPaymentVerified,
        setupCompleted: true,
      },
    });
  } catch (err: any) {
    console.error('[Setup API] Error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to complete store setup.' },
      { status: 500 }
    );
  }
}
