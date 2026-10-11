import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStore extends Document {
  name: string;
  slug: string;
  email: string;
  phone?: string;
  address?: string;
  gstin?: string;
  fssaiLicense?: string;
  upiVpa?: string;
  currency: string;
  taxRate: number;
  printSettings: {
    paperSize: '58mm' | '80mm';
    autoCut: boolean;
    headerGreeting?: string;
    footerMessage?: string;
  };
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
  gpsRadiusMeters?: number;
  paymentTokenVerified?: boolean;
  setupCompleted?: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StoreSchema = new Schema<IStore>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String },
    address: { type: String },
    gstin: { type: String },
    fssaiLicense: { type: String },
    upiVpa: { type: String },
    currency: { type: String, default: 'INR' },
    taxRate: { type: Number, default: 5.0 }, // 5% GST
    printSettings: {
      paperSize: { type: String, enum: ['58mm', '80mm'], default: '80mm' },
      autoCut: { type: Boolean, default: true },
      headerGreeting: { type: String, default: 'Welcome to BrewPluse Cafe' },
      footerMessage: { type: String, default: 'Thank you for your visit! Visit again.' },
    },
    imageUrl: { type: String, default: '' },
    latitude: { type: Number },
    longitude: { type: Number },
    gpsRadiusMeters: { type: Number, default: 100 },
    paymentTokenVerified: { type: Boolean, default: false },
    setupCompleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Store: Model<IStore> =
  mongoose.models.Store || mongoose.model<IStore>('Store', StoreSchema);
