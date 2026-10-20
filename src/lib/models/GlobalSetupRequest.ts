import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGlobalSetupRequest extends Document {
  cafeName: string;
  ownerName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  desiredCurrency: string;
  estimatedTables?: number;
  notes?: string;
  status: 'pending' | 'contacted' | 'setup_in_progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const GlobalSetupRequestSchema = new Schema<IGlobalSetupRequest>(
  {
    cafeName: { type: String, required: true, trim: true },
    ownerName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    desiredCurrency: { type: String, default: 'USD', trim: true },
    estimatedTables: { type: Number, default: 10 },
    notes: { type: String, trim: true },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'setup_in_progress', 'completed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Fallback runtime memory cache for serverless environments without persistent MongoDB
const runtimeRequests: any[] = [];

export function saveRuntimeGlobalRequest(reqData: any) {
  const record = {
    ...reqData,
    _id: 'req-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  runtimeRequests.unshift(record);
  return record;
}

export function getRuntimeGlobalRequests() {
  return runtimeRequests;
}

export const GlobalSetupRequest: Model<IGlobalSetupRequest> =
  (mongoose.models?.GlobalSetupRequest as Model<IGlobalSetupRequest>) ||
  mongoose.model<IGlobalSetupRequest>('GlobalSetupRequest', GlobalSetupRequestSchema);
