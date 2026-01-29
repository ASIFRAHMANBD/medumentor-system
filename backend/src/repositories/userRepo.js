import { pool } from '../lib/db.js';

export async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGSERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT,
      role TEXT NOT NULL DEFAULT 'user',
      email_verified BOOLEAN NOT NULL DEFAULT false,
      reset_token TEXT,
      reset_expires TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

export async function findByEmail(email) {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0] || null;
}

export async function createUser({ email, passwordHash, name, verificationToken, verificationExpires }) {
  const { rows } = await pool.query(
    'INSERT INTO users (email, password_hash, name, verification_token, verification_expires) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, name, role, created_at',
    [email, passwordHash, name, verificationToken, verificationExpires]
  );
  return rows[0];
}

export async function verifyUser(email) {
  await pool.query(
    'UPDATE users SET email_verified = true, verification_token = NULL, verification_expires = NULL WHERE email = $1',
    [email]
  );
}

export async function findByVerificationToken(email, token) {
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE email = $1 AND verification_token = $2 AND verification_expires > NOW()',
    [email, token]
  );
  return rows[0] || null;
}


export async function setResetToken({ email, token, expires }) {
  await pool.query(
    'UPDATE users SET reset_token = $1, reset_expires = $2 WHERE email = $3',
    [token, expires, email]
  );
}

export async function findByResetToken(token) {
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE reset_token = $1 AND reset_expires IS NOT NULL AND reset_expires > NOW()',
    [token]
  );
  return rows[0] || null;
}

export async function updatePassword({ userId, passwordHash }) {
  await pool.query(
    'UPDATE users SET password_hash = $1, reset_token = NULL, reset_expires = NULL WHERE id = $2',
    [passwordHash, userId]
  );
}