import { NextResponse } from 'next/server';
import { connectMongoDB, getMongoDbStatus } from '@/lib/mongodb';

export async function GET() {
  const health: {
    status: string;
    timestamp: string;
    database: {
      provider: string;
      status: string;
      configured: boolean;
      message?: string;
    };
  } = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: {
      provider: 'MongoDB (Mongoose)',
      configured: Boolean(process.env.MONGODB_URI),
      status: 'disconnected',
    },
  };

  // Test MongoDB Connection
  try {
    const mongo = await connectMongoDB();
    const state = getMongoDbStatus();
    health.database.status = state;
    health.database.message =
      state === 'connected'
        ? 'MongoDB connection pool active and healthy.'
        : 'MongoDB is running in deferred or local connection mode.';
  } catch (err: any) {
    health.database.status = 'error';
    health.database.message = err.message;
  }

  return NextResponse.json(health);
}
