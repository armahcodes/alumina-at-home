import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Alumina At Home <noreply@aluminawellness.com>';
const APP_URL = process.env.BETTER_AUTH_URL || 'http://localhost:3000';

function baseLayout(content: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alumina At Home</title>
</head>
<body style="margin: 0; padding: 0; background-color: #071210; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #071210; min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 480px;">
          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <img
                src="${APP_URL}/alumina-isotipo.webp"
                alt="Alumina"
                width="64"
                height="80"
                style="display: block;"
              />
              <p style="margin: 8px 0 0; font-size: 12px; color: rgba(239, 194, 179, 0.6); letter-spacing: 0.05em;">
                AT HOME
              </p>
            </td>
          </tr>

          <!-- Content Card -->
          <tr>
            <td style="background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 32px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 24px;">
              <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.3);">
                &copy; ${new Date().getFullYear()} Alumina At Home. All rights reserved.
              </p>
              <p style="margin: 4px 0 0; font-size: 12px; color: rgba(255,255,255,0.2);">
                Your longevity journey, optimized.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendResetPasswordEmail(email: string, url: string) {
  const html = baseLayout(`
    <h1 style="margin: 0 0 8px; font-size: 22px; font-weight: 700; color: #ffffff;">
      Reset Your Password
    </h1>
    <p style="margin: 0 0 24px; font-size: 14px; color: rgba(255,255,255,0.6); line-height: 1.5;">
      We received a request to reset the password for your Alumina At Home account.
      Click the button below to choose a new password.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <a href="${url}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #EFC2B3 0%, #e5a896 100%); color: #071210; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 12px; box-shadow: 0 4px 20px rgba(239,194,179,0.3);">
            Reset Password
          </a>
        </td>
      </tr>
    </table>
    <p style="margin: 24px 0 0; font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.5;">
      If you didn&rsquo;t request this, you can safely ignore this email. This link expires in 1 hour.
    </p>
    <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 24px 0;" />
    <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.3); word-break: break-all;">
      ${url}
    </p>
  `);

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Reset your Alumina At Home password',
    html,
  });
}

export async function sendVerificationEmail(email: string, url: string) {
  const html = baseLayout(`
    <h1 style="margin: 0 0 8px; font-size: 22px; font-weight: 700; color: #ffffff;">
      Verify Your Email
    </h1>
    <p style="margin: 0 0 24px; font-size: 14px; color: rgba(255,255,255,0.6); line-height: 1.5;">
      Welcome to Alumina At Home! Please verify your email address to get started
      on your longevity journey.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <a href="${url}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #EFC2B3 0%, #e5a896 100%); color: #071210; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 12px; box-shadow: 0 4px 20px rgba(239,194,179,0.3);">
            Verify Email
          </a>
        </td>
      </tr>
    </table>
    <p style="margin: 24px 0 0; font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.5;">
      If you didn&rsquo;t create this account, you can safely ignore this email.
    </p>
    <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 24px 0;" />
    <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.3); word-break: break-all;">
      ${url}
    </p>
  `);

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Verify your Alumina At Home email',
    html,
  });
}

export async function sendOTPEmail(
  email: string,
  otp: string,
  type: 'sign-in' | 'email-verification' | 'forget-password' | 'change-email'
) {
  const subjectMap: Record<string, string> = {
    'sign-in': 'Your Alumina At Home sign-in code',
    'email-verification': 'Verify your Alumina At Home email',
    'forget-password': 'Your Alumina At Home password reset code',
    'change-email': 'Confirm your new email address',
  };

  const headingMap: Record<string, string> = {
    'sign-in': 'Your Sign-In Code',
    'email-verification': 'Verify Your Email',
    'forget-password': 'Password Reset Code',
    'change-email': 'Confirm Email Change',
  };

  const descriptionMap: Record<string, string> = {
    'sign-in': 'Enter this code to sign in to your Alumina At Home account.',
    'email-verification': 'Enter this code to verify your email address.',
    'forget-password': 'Enter this code to reset your password.',
    'change-email': 'Enter this code to confirm your new email address.',
  };

  const formattedOTP = otp.split('').join(' &nbsp; ');

  const html = baseLayout(`
    <h1 style="margin: 0 0 8px; font-size: 22px; font-weight: 700; color: #ffffff;">
      ${headingMap[type]}
    </h1>
    <p style="margin: 0 0 24px; font-size: 14px; color: rgba(255,255,255,0.6); line-height: 1.5;">
      ${descriptionMap[type]}
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 20px 0;">
          <div style="display: inline-block; padding: 16px 32px; background: rgba(239, 194, 179, 0.1); border: 1px solid rgba(239, 194, 179, 0.2); border-radius: 12px;">
            <span style="font-family: 'Courier New', monospace; font-size: 32px; font-weight: 700; letter-spacing: 0.3em; color: #EFC2B3;">
              ${formattedOTP}
            </span>
          </div>
        </td>
      </tr>
    </table>
    <p style="margin: 24px 0 0; font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.5;">
      This code expires in 5 minutes. If you didn&rsquo;t request this, you can safely ignore this email.
    </p>
  `);

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: subjectMap[type],
    html,
  });
}
