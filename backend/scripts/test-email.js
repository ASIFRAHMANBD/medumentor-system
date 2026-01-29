import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpFrom = process.env.SMTP_FROM || 'no-reply@medumentor.local';

console.log('--- Debugging Email Configuration ---');
console.log(`SMTP_HOST: ${smtpHost}`);
console.log(`SMTP_PORT: ${smtpPort}`);
console.log(`SMTP_USER: ${smtpUser}`);
console.log(`SMTP_PASS: ${smtpPass ? '****' : 'MISSING'}`);

if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
  console.error('ERROR: Missing required environment variables.');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465, // true for 465, false for other ports
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

async function test() {
  try {
    console.log('Attempting to verify transporter...');
    await transporter.verify();
    console.log('Transporter verification successful!');

    console.log('Attempting to send test email...');
    const info = await transporter.sendMail({
      from: smtpFrom,
      to: smtpUser, // Send to self
      subject: 'Medumentor SMTP Test',
      text: 'If you receive this, SMTP is working correctly.',
    });
    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('Email sending failed:');
    console.error(error);
  }
}

test();
