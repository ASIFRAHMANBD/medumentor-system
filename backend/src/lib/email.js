import nodemailer from 'nodemailer';

// Export these to allow lazy loading if needed, or re-evaluation
export let transporter = null;
export let emailConfigured = false;

// Initialize function to be called after env vars are guaranteed loaded
function initEmail() {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  
  if (smtpHost && smtpPort && smtpUser && smtpPass) {
    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass }
    });
    emailConfigured = true;
    console.log(`Email service configured with ${smtpHost}`);
  } else {
    console.log('Email service NOT configured (missing env vars)');
  }
}

// Auto-init on load, but also export for manual re-init
initEmail();

const smtpFrom = process.env.SMTP_FROM || 'no-reply@medumentor.local';

export async function sendEmail({ to, subject, html }) {
  if (!transporter) {
    // Try one more time just in case env vars were late
    initEmail();
    if (!transporter) return;
  }
  await transporter.sendMail({ from: smtpFrom, to, subject, html });
}


export function welcomeTemplate({ name }) {
  return `
  <div style="font-family:Inter,Arial,sans-serif;background:#f6f9fc;padding:24px;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr><td align="center">
        <div style="max-width:600px;background:#ffffff;border-radius:12px;padding:24px;border:1px solid #e6edf5;">
          <h2 style="margin:0 0 12px;color:#111827;">Welcome to Medumentor${name ? ', ' + name : ''}!</h2>
          <p style="color:#374151;margin:0 0 16px;">Your learning journey starts now. Explore stages, subjects, and chapters curated for you.</p>
          <a href="${process.env.APP_URL || 'http://localhost:3000'}" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:10px 16px;border-radius:8px;">Go to Medumentor</a>
          <p style="font-size:12px;color:#6b7280;margin-top:16px;">If you didn’t create this account, please ignore this email.</p>
        </div>
      </td></tr>
    </table>
  </div>`;
}

export function verificationTemplate({ name, code }) {
  const currentYear = new Date().getFullYear();
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify your email</title>
    <style>
      body { margin: 0; padding: 0; background-color: #f4f4f5; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
      .card { background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
      .header { background: #111F35; padding: 32px; text-align: center; }
      .logo-text { font-size: 28px; font-weight: 700; letter-spacing: -0.025em; margin: 0; }
      .logo-medu { color: #ffffff; }
      .logo-mentor { color: #D02752; }
      .content { padding: 40px 32px; }
      .h1 { color: #111827; font-size: 24px; font-weight: 600; margin: 0 0 16px; text-align: center; }
      .text { color: #4b5563; font-size: 16px; line-height: 24px; margin: 0 0 24px; text-align: center; }
      .code-container { background: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; text-align: center; margin: 32px 0; }
      .code { font-family: monospace; font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #111F35; display: inline-block; }
      .footer { background: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb; }
      .footer-text { color: #6b7280; font-size: 12px; line-height: 16px; margin: 0; }
      .timestamp { color: #9ca3af; font-size: 12px; margin-top: 16px; border-top: 1px solid #e5e7eb; padding-top: 16px; }
      .accent-bar { height: 4px; background: linear-gradient(to right, #F63049, #D02752); }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="card">
        <div class="accent-bar"></div>
        <div class="header">
          <div class="logo-text">
            <span class="logo-medu">Medu</span><span class="logo-mentor">mentor</span>
          </div>
        </div>
        <div class="content">
          <h1 class="h1">Verify your email address</h1>
          <p class="text">
            Hello ${name || 'Future Doctor'},<br>
            Please use the verification code below to complete your registration.
          </p>
          
          <div class="code-container">
            <span class="code">${code}</span>
          </div>
          
          <p class="text" style="font-size: 14px; color: #6b7280;">
            This code will expire in 15 minutes. If you didn't request this, you can safely ignore this email.
          </p>
        </div>
        <div class="footer">
          <p class="footer-text">
            © ${currentYear} Medumentor. All rights reserved.<br>
            Professional learning, thoughtfully structured.
          </p>
          <div class="timestamp">
            Requested on ${date} at ${time}
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>`;
}



export function resetTemplate({ name, link }) {
  return `
  <div style="font-family:Inter,Arial,sans-serif;background:#f6f9fc;padding:24px;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr><td align="center">
        <div style="max-width:600px;background:#ffffff;border-radius:12px;padding:24px;border:1px solid #e6edf5;">
          <h2 style="margin:0 0 12px;color:#111827;">Reset your Medumentor password</h2>
          <p style="color:#374151;margin:0 0 16px;">${name ? name + ',' : ''} click the button below to set a new password. This link expires in 1 hour.</p>
          <a href="${link}" style="display:inline-block;background:#16a34a;color:#fff;text-decoration:none;padding:10px 16px;border-radius:8px;">Reset Password</a>
          <p style="font-size:12px;color:#6b7280;margin-top:16px;">If you didn’t request this, you can safely ignore this email.</p>
        </div>
      </td></tr>
    </table>
  </div>`;
}