import bcrypt from 'bcrypt';
import { pool } from '../src/lib/db.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env vars
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const DEMO_USER = {
  email: 'demo@medumentor.com',
  password: 'password123',
  name: 'Demo User'
};

async function createDemoUser() {
  try {
    console.log(`Checking for existing user: ${DEMO_USER.email}`);
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [DEMO_USER.email]);
    
    if (rows.length > 0) {
      console.log('User already exists. Updating password...');
      const hash = await bcrypt.hash(DEMO_USER.password, 12);
      await pool.query('UPDATE users SET password_hash = $1, email_verified = true WHERE email = $2', [hash, DEMO_USER.email]);
      console.log('User updated successfully.');
    } else {
      console.log('Creating new user...');
      const hash = await bcrypt.hash(DEMO_USER.password, 12);
      await pool.query(
        'INSERT INTO users (email, password_hash, name, role, email_verified) VALUES ($1, $2, $3, $4, $5)',
        [DEMO_USER.email, hash, DEMO_USER.name, 'user', true]
      );
      console.log('User created successfully.');
    }
  } catch (error) {
    console.error('Error creating demo user:', error);
  } finally {
    await pool.end();
  }
}

createDemoUser();
