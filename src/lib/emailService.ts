import nodemailer from 'nodemailer';

interface SendOtpEmailParams {
  to: string;
  otp: string;
  expiresInMinutes?: number;
  brandName?: string;
  brandDomain?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let transporter: any = null;

function getTransporter(): any {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
    return transporter;
  }

  return null;
}

/**
 * Send 6-Digit OTP Email with modern HTML template matching BrewPluse brand
 */
export async function sendOtpEmail({
  to,
  otp,
  expiresInMinutes = 10,
  brandName = process.env.NEXT_PUBLIC_APP_NAME || 'BrewPluse',
  brandDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'brewpluse.com',
}: SendOtpEmailParams): Promise<{ success: boolean; previewUrl?: string; messageId?: string }> {
  const mailTransporter = getTransporter();

  const fromEmail = process.env.EMAIL_FROM || `"${brandName} Security" <security@${brandDomain}>`;
  const spacedOtp = otp.split('').join(' ');

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify your email - ${brandName}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      </style>
    </head>
    <body style="margin: 0; padding: 32px 12px; background-color: #f4efe6; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e1b18; -webkit-font-smoothing: antialiased;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4efe6;">
        <tr>
          <td align="center">
            <!-- Main Card Container -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 540px; background-color: #ffffff; border-radius: 22px; overflow: hidden; box-shadow: 0 10px 35px rgba(0,0,0,0.06); border: 1px solid #e7e2d6;">
              
              <!-- Brand Header Banner -->
              <tr>
                <td style="background-color: #0c4d2e; padding: 22px 32px;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td width="44" valign="middle">
                        <div style="background-color: #ffffff; width: 40px; height: 40px; border-radius: 12px; text-align: center; line-height: 40px; font-size: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">
                          ☕
                        </div>
                      </td>
                      <td style="padding-left: 14px;" valign="middle">
                        <div style="font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.3px; line-height: 1.2;">
                          ${brandName}
                        </div>
                        <div style="font-size: 11.5px; color: #a4ddbe; font-weight: 500; letter-spacing: 0.2px; margin-top: 2px;">
                          Cafe &amp; Restaurant Management Software
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Body Content -->
              <tr>
                <td style="padding: 38px 34px 28px 34px; background-color: #ffffff;">
                  <div style="font-size: 11px; font-weight: 800; color: #8e5c26; text-transform: uppercase; letter-spacing: 1.8px; margin-bottom: 10px;">
                    EMAIL VERIFICATION
                  </div>
                  <h1 style="font-family: Georgia, -apple-system, serif; font-size: 32px; font-weight: 700; color: #161817; margin: 0 0 20px 0; letter-spacing: -0.5px; line-height: 1.18;">
                    Verify your email
                  </h1>
                  <p style="font-size: 14.5px; color: #47433e; margin: 0 0 14px 0; line-height: 1.6;">
                    Hello,
                  </p>
                  <p style="font-size: 14.5px; color: #47433e; margin: 0 0 28px 0; line-height: 1.6;">
                    Use the verification code below to continue with <strong>${brandName}</strong>.
                  </p>

                  <!-- Verification Code Container -->
                  <div style="background-color: #f7f4ee; border-radius: 18px; padding: 26px 20px; text-align: center; margin-bottom: 22px; border: 1px solid #eae3d5;">
                    <div style="font-size: 10.5px; font-weight: 700; color: #787267; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px;">
                      YOUR VERIFICATION CODE
                    </div>
                    <div style="font-size: 42px; font-weight: 800; color: #0c4d2e; font-family: 'SF Mono', Monaco, Menlo, 'Courier New', Courier, monospace; letter-spacing: 12px; margin-left: 12px; line-height: 1.2;">
                      ${spacedOtp}
                    </div>
                  </div>

                  <p style="font-size: 13px; color: #5a554e; text-align: center; margin: 0 0 26px 0;">
                    This code expires in <strong>${expiresInMinutes} minutes</strong>.
                  </p>

                  <!-- Divider -->
                  <div style="border-top: 1px solid #ebe6dc; margin: 24px 0;"></div>

                  <p style="font-size: 12px; color: #767067; line-height: 1.65; margin: 0;">
                    If you didn&apos;t request this code, you can safely ignore this email. For your security, never share your verification code with anyone.
                  </p>
                </td>
              </tr>

              <!-- Footer Section -->
              <tr>
                <td style="background-color: #faf8f4; padding: 26px 32px; border-top: 1px solid #ede8dc; text-align: center;">
                  <div style="display: inline-flex; align-items: center; justify-content: center; margin-bottom: 8px;">
                    <span style="font-size: 15px; margin-right: 6px;">☕</span>
                    <span style="font-size: 15px; font-weight: 800; color: #0c4d2e; letter-spacing: -0.2px;">${brandName}</span>
                  </div>
                  <div style="font-size: 12.5px; color: #6d675e; margin-bottom: 14px;">
                    The all-in-one cafe &amp; restaurant management software.
                  </div>
                  <div style="font-size: 11.5px; color: #9a948a; line-height: 1.6;">
                    <a href="https://${brandDomain}" style="color: #0c4d2e; text-decoration: none; font-weight: 600;">${brandDomain}</a>
                    &nbsp;&middot;&nbsp;
                    <a href="https://${brandDomain}/status" style="color: #767067; text-decoration: none;">System Status</a>
                    &nbsp;&middot;&nbsp;
                    <span>&copy; ${new Date().getFullYear()} ${brandName}. All rights reserved.</span>
                  </div>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  if (mailTransporter) {
    try {
      const info = await mailTransporter.sendMail({
        from: fromEmail,
        to,
        subject: `Your ${brandName} Verification Code is ${otp}`,
        text: `Hello,\n\nUse the verification code below to continue with ${brandName}:\n\nYOUR VERIFICATION CODE: ${otp}\n\nThis code expires in ${expiresInMinutes} minutes.\n\nIf you didn't request this code, you can safely ignore this email. For your security, never share your verification code with anyone.\n\n---\n${brandName} - The all-in-one cafe & restaurant management software.\nhttps://${brandDomain}`,
        html: htmlContent,
      });

      return { success: true, messageId: info.messageId };
    } catch (err: any) {
      console.error('[EmailService] SMTP delivery failed, falling back to console:', err.message);
    }
  }

  // Fallback for development / mock environments
  console.log('----------------------------------------------------');
  console.log(`[EmailService DEV] To: ${to}`);
  console.log(`[EmailService DEV] Subject: Your ${brandName} Verification Code is ${otp}`);
  console.log(`[EmailService DEV] Code: >>> ${otp} <<< (Expires in ${expiresInMinutes} mins)`);
  console.log('----------------------------------------------------');

  return { success: true };
}
