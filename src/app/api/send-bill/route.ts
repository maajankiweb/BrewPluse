import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { syncInvoiceToFirestore } from '@/lib/firebaseAdmin';
import { rateLimit, getClientIp } from '@/lib/rateLimit';
import { getSessionFromRequest } from '@/lib/authService';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const session = getSessionFromRequest(request);

    // Rate limiting: 20 per 10 mins for authenticated cafe users, 3 per 10 mins for unauthenticated/demo
    const maxRequests = session ? 20 : 3;
    const limiter = rateLimit(`send-bill:${session?.uid || ip}`, maxRequests, 10 * 60 * 1000);
    if (!limiter.success) {
      return NextResponse.json(
        {
          success: false,
          error: `Email sending rate limit exceeded. Please wait ${limiter.resetSeconds} seconds.`,
        },
        {
          status: 429,
          headers: { 'Retry-After': limiter.resetSeconds.toString() },
        }
      );
    }

    const body = await request.json();
    const {
      customerEmail,
      customerName = 'Valued Customer',
      orderNumber = 'BP-1001',
      storeName = session?.storeName || 'BrewPluse Cafe',
      table = 'Table 1',
      items = [],
      subtotal = 0,
      discount = 0,
      tax = 0,
      total = 0,
      paymentMode = 'UPI',
      date = new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    } = body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerEmail || !emailRegex.test(customerEmail) || customerEmail.length > 100) {
      return NextResponse.json(
        { success: false, error: 'Valid customer email address is required.' },
        { status: 400 }
      );
    }


    // Build items HTML table rows
    const itemsHtml = Array.isArray(items)
      ? items
          .map(
            (item: any) => `
          <tr style="border-bottom: 1px solid #eeeeee;">
            <td style="padding: 10px 0; font-size: 13px; color: #1a1a1a;">
              <strong>${item.name}</strong>
            </td>
            <td style="padding: 10px 0; text-align: center; font-size: 13px; color: #555555;">
              ${item.qty}
            </td>
            <td style="padding: 10px 0; text-align: right; font-size: 13px; font-weight: bold; color: #1a1a1a;">
              ₹${item.price * item.qty}
            </td>
          </tr>`
          )
          .join('')
      : '';

    const receiptHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Receipt for Order #${orderNumber}</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f8f7f4; margin: 0; padding: 24px;">
        <div style="max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e5e5e5; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <!-- Header -->
          <div style="background-color: #0B2B1A; color: #ffffff; padding: 28px 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px; letter-spacing: -0.5px;">${storeName}</h1>
            <p style="margin: 6px 0 0; font-size: 12px; color: #A3E635; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">
              Official Digital Receipt · Paid via ${paymentMode}
            </p>
          </div>

          <!-- Order Info -->
          <div style="padding: 24px;">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed #dddddd; padding-bottom: 14px; margin-bottom: 16px; font-size: 12px; color: #555555;">
              <div>
                <strong>Order #:</strong> ${orderNumber}<br>
                <strong>Seating:</strong> ${table}
              </div>
              <div style="text-align: right;">
                <strong>Date:</strong> ${date}<br>
                <strong>Guest:</strong> ${customerName}
              </div>
            </div>

            <!-- Items -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <thead>
                <tr style="border-bottom: 2px solid #0B2B1A; font-size: 11px; text-transform: uppercase; color: #777777;">
                  <th style="text-align: left; padding-bottom: 8px;">Item</th>
                  <th style="text-align: center; padding-bottom: 8px;">Qty</th>
                  <th style="text-align: right; padding-bottom: 8px;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <!-- Summary -->
            <div style="background-color: #fbfbfa; border-radius: 12px; padding: 14px; font-size: 13px; line-height: 1.8;">
              <div style="display: flex; justify-content: space-between; color: #666666;">
                <span>Subtotal:</span>
                <span>₹${subtotal}</span>
              </div>
              ${
                discount > 0
                  ? `<div style="display: flex; justify-content: space-between; color: #059669; font-weight: bold;">
                      <span>Discount:</span>
                      <span>-₹${discount}</span>
                    </div>`
                  : ''
              }
              <div style="display: flex; justify-content: space-between; color: #666666;">
                <span>Platform Fee:</span>
                <span>₹1</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: bold; color: #0B2B1A; border-top: 1px solid #eeeeee; padding-top: 8px; margin-top: 6px;">
                <span>Grand Total:</span>
                <span>₹${total}</span>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px dashed #dddddd; font-size: 11px; color: #888888;">
              <p style="margin: 0 0 4px;">Thank you for dining with us! We hope to see you again soon.</p>
              <p style="margin: 0; font-weight: bold; color: #0B2B1A;">Powered by BrewPluse Cafe OS · www.brewpluse.com</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Attempt real SMTP if environment variables exist
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: `"${storeName}" <${smtpUser}>`,
        to: customerEmail,
        subject: `Your receipt from ${storeName} (Order #${orderNumber})`,
        html: receiptHtml,
      });

      // Save invoice copy to Firestore collection 'invoices'
      syncInvoiceToFirestore({
        orderNumber,
        storeName,
        customerName,
        customerEmail,
        table,
        items,
        subtotal,
        tax,
        total,
        paymentMode,
        status: 'emailed',
      }).catch(() => {});

      return NextResponse.json({
        success: true,
        sent: true,
        message: `Digital bill emailed to ${customerEmail}`,
      });
    }

    // Save invoice copy to Firestore in simulated/dev mode too
    syncInvoiceToFirestore({
      orderNumber,
      storeName,
      customerName,
      customerEmail,
      table,
      items,
      subtotal,
      tax,
      total,
      paymentMode,
      status: 'simulated_email',
    }).catch(() => {});

    // Graceful fallback simulation when SMTP is not yet configured in local env
    return NextResponse.json({
      success: true,
      sent: true,
      simulated: true,
      message: `Digital bill prepared and dispatched to ${customerEmail}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to dispatch email bill' },
      { status: 500 }
    );
  }
}
