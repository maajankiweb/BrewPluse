import crypto from 'crypto';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/brewpluse';

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

async function seedDemoCafe() {
  console.log('Connecting to MongoDB at:', MONGODB_URI.replace(/:([^@]+)@/, ':****@'));
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('✓ Connected to MongoDB');

    const db = mongoose.connection.db;

    // 1. Seed or Update Demo User
    const { hash, salt } = hashPassword('BrewPluse@2026');
    const demoEmail = 'demo@brewpluse.com';

    await db.collection('users').updateOne(
      { email: demoEmail },
      {
        $set: {
          email: demoEmail,
          passwordHash: hash,
          passwordSalt: salt,
          name: 'BrewPluse Demo Owner',
          role: 'owner',
          isVerified: true,
          storeName: 'BrewPluse Specialty Cafe',
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );
    console.log('✓ Demo User configured: demo@brewpluse.com (Password: BrewPluse@2026)');

    // 2. Seed or Update Demo Store
    await db.collection('stores').updateOne(
      { slug: 'brewpluse' },
      {
        $set: {
          name: 'BrewPluse Specialty Cafe',
          slug: 'brewpluse',
          email: demoEmail,
          upiId: 'demo@okhdfcbank',
          upiName: 'BrewPluse Demo Merchant',
          country: 'IN',
          currency: 'INR',
          taxRate: 0.0,
          paymentPolicy: 'customer_choice',
          platformFeeMode: 'cafe',
          acceptingOrders: true,
          platformBilling: {
            accumulatedDuePaise: 0,
            totalOrdersBilled: 0,
            isLockedDueToBalance: false,
          },
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );
    console.log('✓ Demo Cafe Store configured: slug "brewpluse" with Direct UPI & 0% GST default');

    console.log('\n🎉 Demo Cafe Setup Completed Successfully!');
    console.log('----------------------------------------------------');
    console.log('Login URL:      https://your-domain.com/login (or http://localhost:3000/login)');
    console.log('Email:          demo@brewpluse.com');
    console.log('Password:       BrewPluse@2026');
    console.log('Dashboard:      /dashboard/brewpluse');
    console.log('Customer Menu:  /t/demo-table-1/menu');
    console.log('----------------------------------------------------\n');

    await mongoose.disconnect();
  } catch (err) {
    console.warn('MongoDB connection note (offline/not running):', err.message);
    console.log('ℹ Note: The app also has built-in in-memory fallback for demo@brewpluse.com even if MongoDB is offline.');
  }
}

seedDemoCafe();
