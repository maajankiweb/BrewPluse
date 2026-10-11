import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { Store } from '@/lib/models/Store';
import { User } from '@/lib/models/User';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      email,
      businessName,
      imageUrl,
      address,
      latitude,
      longitude,
      gpsRadiusMeters = 100,
      paperSize = '80mm',
      paymentVerified = true,
    } = body;

    if (!businessName || !businessName.trim()) {
      return NextResponse.json(
        { error: 'Business / Café Name is required.' },
        { status: 400 }
      );
    }

    const cleanEmail = (email || 'demo@brewpluse.com').trim().toLowerCase();
    const cleanSlug =
      businessName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') || 'my-cafe';

    let storeData = {
      name: businessName.trim(),
      slug: cleanSlug,
      email: cleanEmail,
      address: address || 'Main Street, Bengaluru, KA',
      imageUrl: imageUrl || '',
      latitude: latitude ? Number(latitude) : undefined,
      longitude: longitude ? Number(longitude) : undefined,
      gpsRadiusMeters: Number(gpsRadiusMeters) || 100,
      paymentTokenVerified: Boolean(paymentVerified),
      setupCompleted: true,
      printSettings: {
        paperSize: paperSize === '58mm' ? '58mm' : '80mm',
        autoCut: true,
        headerGreeting: `Welcome to ${businessName.trim()}`,
        footerMessage: 'Thank you for dining with us! Visit again.',
      },
    };

    try {
      const mongo = await connectMongoDB();
      if (mongo) {
        // Find existing store by email or create new
        const existingStore = await Store.findOne({ email: cleanEmail });
        if (existingStore) {
          existingStore.name = storeData.name;
          existingStore.address = storeData.address;
          existingStore.imageUrl = storeData.imageUrl;
          existingStore.latitude = storeData.latitude;
          existingStore.longitude = storeData.longitude;
          existingStore.gpsRadiusMeters = storeData.gpsRadiusMeters;
          existingStore.paymentTokenVerified = true;
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
      }
    } catch (dbErr: any) {
      console.warn('[Setup API] MongoDB save warning (fallback to memory/client):', dbErr.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Store profile successfully configured and activated!',
      store: storeData,
    });
  } catch (err: any) {
    console.error('[Setup API] Error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to complete store setup.' },
      { status: 500 }
    );
  }
}
