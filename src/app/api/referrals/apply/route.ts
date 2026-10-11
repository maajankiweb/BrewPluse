import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { code } = await req.json();
    return NextResponse.json({
      success: true,
      message: `Partner code ${code} applied successfully.`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to apply code.' }, { status: 500 });
  }
}
