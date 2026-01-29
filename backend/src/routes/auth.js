import { Router } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { createUser, findByEmail, setResetToken, findByResetToken, updatePassword, verifyUser, findByVerificationToken } from '../repositories/userRepo.js';
import { sendEmail, welcomeTemplate, resetTemplate, verificationTemplate, emailConfigured } from '../lib/email.js';


const r = Router();

r.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'invalid_input' });
  const normalizedEmail = String(email).trim().toLowerCase();
  const user = await findByEmail(normalizedEmail);
  if (!user) return res.status(401).json({ error: 'invalid_credentials' });
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ error: 'invalid_credentials' });
  
  if (!user.email_verified) {
    return res.status(403).json({ error: 'email_not_verified' });
  }
  
  const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
});

r.post('/register', async (req, res) => {
  const { email, password, name } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'invalid_input' });
  const normalizedEmail = String(email).trim().toLowerCase();
  const existing = await findByEmail(normalizedEmail);
  if (existing) return res.status(409).json({ error: 'email_exists' });
  const hash = await bcrypt.hash(password, 12);
  
  // Generate 6-digit code
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  const verificationExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  const user = await createUser({ 
    email: normalizedEmail, 
    passwordHash: hash, 
    name,
    verificationToken: verificationCode,
    verificationExpires: verificationExpires
  });
  
  if (emailConfigured) {
    await sendEmail({ 
      to: normalizedEmail, 
      subject: 'Verify your Medumentor email', 
      html: verificationTemplate({ name, code: verificationCode }) 
    });
  } else {
    // For development without email service, log the code
    console.log(`Verification code for ${normalizedEmail}: ${verificationCode}`);
  }
  
  res.status(201).json({ 
    id: user.id, 
    email: user.email, 
    name: user.name, 
    role: user.role,
    requiresVerification: true
  });
});

r.post('/verify', async (req, res) => {
  const { email, code } = req.body || {};
  if (!email || !code) return res.status(400).json({ error: 'invalid_input' });
  
  const normalizedEmail = String(email).trim().toLowerCase();
  const user = await findByVerificationToken(normalizedEmail, code);
  
  if (!user) return res.status(400).json({ error: 'invalid_or_expired_code' });
  
  await verifyUser(normalizedEmail);
  
  if (emailConfigured) {
    await sendEmail({ to: normalizedEmail, subject: 'Welcome to Medumentor', html: welcomeTemplate({ name: user.name }) });
  }
  
  // Auto-login after verification
  const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
});

r.post('/forgot-password', async (req, res) => {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'invalid_input' });
  const normalizedEmail = String(email).trim().toLowerCase();
  const user = await findByEmail(normalizedEmail);
  // Always respond 200 to avoid user enumeration
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  if (user) {
    await setResetToken({ email: normalizedEmail, token, expires });
    if (emailConfigured) {
      const link = `${process.env.APP_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
      await sendEmail({ to: normalizedEmail, subject: 'Reset your Medumentor password', html: resetTemplate({ name: user.name, link }) });
    }
  }
  res.json({ ok: true });
});

r.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body || {};
  if (!token || !newPassword) return res.status(400).json({ error: 'invalid_input' });
  const user = await findByResetToken(token);
  if (!user) return res.status(400).json({ error: 'invalid_token' });
  const hash = await bcrypt.hash(newPassword, 12);
  await updatePassword({ userId: user.id, passwordHash: hash });
  res.json({ ok: true });
});

export default r;