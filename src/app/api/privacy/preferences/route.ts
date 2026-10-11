import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const response = NextResponse.json({
      success: true,
      message: 'Privacy choices saved',
      data: body,
    });

    // Set cookie
    response.cookies.set({
      name: 'brewpluse_consent',
      value: JSON.stringify(body),
      path: '/',
      maxAge: 365 * 24 * 60 * 60,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ success: true });
  }
}
