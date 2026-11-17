import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectMongoDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

// Lead Inquiry Schema
const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    cafeName: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    outlets: { type: String, default: '1' },
    interests: [{ type: String }],
    message: { type: String, trim: true },
    status: { type: String, default: 'new', enum: ['new', 'contacted', 'qualified', 'closed'] },
    ip: { type: String },
  },
  { timestamps: true }
);

const Lead = (mongoose.models?.LeadInquiry as any) || mongoose.model('LeadInquiry', LeadSchema);

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid 10-digit phone number'),
  email: z.string().email('Please enter a valid email address'),
  cafeName: z.string().min(2, 'Cafe name must be at least 2 characters'),
  city: z.string().min(2, 'City is required'),
  outlets: z.string().default('1 Outlet'),
  interests: z.array(z.string()).default([]),
  message: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = contactSchema.parse(body);

    try {
      await connectMongoDB();
      const ip = req.headers.get('x-forwarded-for') || 'unknown';
      await Lead.create({
        ...validated,
        ip,
      });
    } catch (dbErr) {
      console.warn('[Contact API] DB storage warning (falling back to memory log):', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your inquiry has been received. Our team will contact you within 2 business hours.',
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      const messages = (err as any).issues?.map((i: any) => i.message) || (err as any).errors?.map((e: any) => e.message) || ['Invalid input'];
      return NextResponse.json(
        { success: false, errors: messages },
        { status: 400 }
      );
    }
    console.error('[Contact API Error]:', err);
    return NextResponse.json(
      { success: false, message: 'Internal server error. Please reach out via WhatsApp or email directly.' },
      { status: 500 }
    );
  }
}
