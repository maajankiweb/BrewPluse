import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectMongoDB } from '@/lib/mongodb';
import { GlobalSetupRequest, saveRuntimeGlobalRequest } from '@/lib/models/GlobalSetupRequest';

export const dynamic = 'force-dynamic';

const GlobalSetupSchema = z.object({
  cafeName: z.string().trim().min(2, 'Cafe name is required').max(100),
  ownerName: z.string().trim().min(2, 'Owner name is required').max(100),
  email: z.string().trim().email('Valid email is required'),
  phone: z.string().trim().min(5, 'Valid phone/WhatsApp number is required').max(30),
  country: z.string().trim().min(2, 'Country is required').max(60),
  city: z.string().trim().min(2, 'City is required').max(80),
  desiredCurrency: z.string().trim().min(2).max(10).default('USD'),
  estimatedTables: z.number().int().min(1).max(500).optional().default(10),
  notes: z.string().trim().max(1000).optional().default(''),
});

/**
 * POST /api/public/global-setup-request
 * Public endpoint for international / global cafe owners wanting to use BrewPluse.
 * Outside India, cafes require custom assisted setup for local currency, VAT & payment rails.
 */
export async function POST(request: Request) {
  try {
    const rawBody = await request.json().catch(() => ({}));
    const parseResult = GlobalSetupSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_FAILED',
            message: parseResult.error.issues[0]?.message || 'Invalid form data provided.',
            details: parseResult.error.issues,
          },
        },
        { status: 400 }
      );
    }

    const data = parseResult.data;
    let savedRequest: any = null;

    try {
      const conn = await connectMongoDB();
      if (conn) {
        savedRequest = await GlobalSetupRequest.create(data);
      }
    } catch (dbErr) {
      console.warn('Failed to save GlobalSetupRequest in MongoDB, falling back to runtime:', dbErr);
    }

    if (!savedRequest) {
      savedRequest = saveRuntimeGlobalRequest(data);
    }

    return NextResponse.json({
      success: true,
      message: 'Global setup request received successfully. Our international onboarding team will contact you within 24 hours.',
      data: {
        requestId: savedRequest._id,
        cafeName: data.cafeName,
        country: data.country,
        desiredCurrency: data.desiredCurrency,
        supportContact: {
          whatsapp: '+919999999999',
          email: 'global@brewpluse.com',
          directChatUrl: `https://wa.me/919999999999?text=${encodeURIComponent(
            `Hi BrewPluse Team, I want to setup BrewPluse for my cafe "${data.cafeName}" in ${data.city}, ${data.country} with ${data.desiredCurrency} currency.`
          )}`,
        },
      },
    });
  } catch (error: any) {
    console.error('Error handling global setup request:', error);
    return NextResponse.json(
      {
        error: {
          code: 'SERVER_ERROR',
          message: 'An error occurred while submitting your international setup request.',
        },
      },
      { status: 500 }
    );
  }
}
