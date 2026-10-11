import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  passwordSalt: string;
  name?: string;
  role: 'owner' | 'manager' | 'cashier' | 'barista';
  isVerified: boolean;
  storeName: string;
  referralCode?: string;
  referredBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    passwordSalt: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      default: '',
    },
    role: {
      type: String,
      enum: ['owner', 'manager', 'cashier', 'barista'],
      default: 'owner',
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    storeName: {
      type: String,
      default: 'BrewPluse Cafe',
      trim: true,
    },
    referralCode: {
      type: String,
      uppercase: true,
      trim: true,
    },
    referredBy: {
      type: String,
      uppercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
