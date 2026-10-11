import nodemailer from 'nodemailer';

interface SendOtpEmailParams {
  to: string;
  otp: string;
  expiresInMinutes?: number;
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
 * Send 6-Digit OTP Email with modern HTML template matching BrewPulse brand
 */
export async function sendOtpEmail({
  to,
  otp,
  expiresInMinutes = 5,
}: SendOtpEmailParams): Promise<{ success: boolean; previewUrl?: string; messageId?: string }> {
  const mailTransporter = getTransporter();

  const fromEmail = process.env.EMAIL_FROM || '"BrewPluse Security" <security@brewpluse.com>';
  const spacedOtp = otp.split('').join(' ');

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify your email - BrewPluse</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
      </style>
    </head>
    <body style="margin: 0; padding: 24px 12px; background-color: #f3efe6; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e1b18;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f3efe6;">
        <tr>
          <td align="center">
            <!-- Main Card Container -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 540px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e7e2d6;">
              
              <!-- Dark Green Header Banner -->
              <tr>
                <td style="background-color: #0c4d2e; padding: 20px 28px;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td width="42" valign="middle">
                        <div style="background-color: #ffffff; width: 38px; height: 38px; border-radius: 10px; text-align: center; line-height: 38px; font-size: 20px;">
                          ☕
                        </div>
                      </td>
                      <td style="padding-left: 14px;" valign="middle">
                        <div style="font-size: 19px; font-weight: 800; color: #ffffff; letter-spacing: -0.3px;">
                          BrewPluse
                        </div>
                        <div style="font-size: 11px; color: #a4ddbe; font-weight: 500; letter-spacing: 0.2px;">
                          Cafe & Restaurant Management Software
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Body Content -->
              <tr>
                <td style="padding: 36px 32px 28px 32px; background-color: #ffffff;">
                  <div style="font-size: 11px; font-weight: 700; color: #8e5c26; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px;">
                    EMAIL VERIFICATION
                  </div>
                  <h1 style="font-family: Georgia, serif; font-size: 32px; font-weight: 700; color: #161817; margin: 0 0 18px 0; letter-spacing: -0.5px; line-height: 1.15;">
                    Verify your email
                  </h1>
                  <p style="font-size: 14px; color: #47433e; margin: 0 0 14px 0; line-height: 1.6;">
                    Hello,
                  </p>
                  <p style="font-size: 14px; color: #47433e; margin: 0 0 26px 0; line-height: 1.6;">
                    Use the verification code below to continue with BrewPluse.
                  </p>

                  <!-- Verification Code Container -->
                  <div style="background-color: #f4efe6; border-radius: 16px; padding: 28px 20px; text-align: center; margin-bottom: 24px; border: 1px solid #eae3d5;">
                    <div style="font-size: 10.5px; font-weight: 700; color: #736e63; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 14px;">
                      YOUR VERIFICATION CODE
                    </div>
                    <div style="font-size: 40px; font-weight: 800; color: #0c4d2e; font-family: 'Courier New', Courier, monospace; letter-spacing: 12px; margin-left: 12px;">
                      ${spacedOtp}
                    </div>
                  </div>

                  <p style="font-size: 12.5px; color: #5a554e; text-align: center; margin: 0 0 24px 0;">
                    This code expires in <strong>${expiresInMinutes} minutes</strong>.
                  </p>

                  <!-- Divider -->
                  <div style="border-top: 1px solid #eae6de; margin: 24px 0;"></div>

                  <p style="font-size: 12px; color: #767067; line-height: 1.6; margin: 0;">
                    If you didn&apos;t request this code, you can safely ignore this email. For your security, never share your verification code with anyone.
                  </p>
                </td>
              </tr>

              <!-- Footer Section -->
              <tr>
                <td style="background-color: #f9f7f2; padding: 24px 32px; border-top: 1px solid #ede8dc; text-align: center;">
                  <div style="display: inline-flex; align-items: center; justify-content: center; margin-bottom: 6px;">
                    <span style="font-size: 15px; margin-right: 6px;">☕</span>
                    <span style="font-size: 14px; font-weight: 800; color: #0c4d2e;">BrewPluse</span>
                  </div>
                  <div style="font-size: 12px; color: #6d675e; margin-bottom: 12px;">
                    The all-in-one cafe & restaurant management software.
                  </div>
                  <div style="font-size: 11px; color: #9a948a;">
                    <a href="https://brewpluse.com" style="color: #0c4d2e; text-decoration: none; font-weight: 600;">brewpluse.com</a>
                    &nbsp;&middot;&nbsp;
                    <span style="color: #767067;">System Status</span>
                    &nbsp;&middot;&nbsp;
                    <span>&copy; ${new Date().getFullYear()} BrewPluse. All rights reserved.</span>
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
        subject: `Your BrewPulse Verification Code is ${otp}`,
        text: `Your BrewPulse verification code is: ${otp}. It will expire in ${expiresInMinutes} minutes.`,
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
  console.log(`[EmailService DEV] Subject: Your BrewPulse Code is ${otp}`);
  console.log(`[EmailService DEV] Code: >>> ${otp} <<< (Expires in ${expiresInMinutes} mins)`);
  console.log('----------------------------------------------------');

  return { success: true };
}
