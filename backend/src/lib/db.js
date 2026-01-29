import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/medumentor';
const ssl = process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false;

export const pool = new Pool({ connectionString, ssl });

export async function ping() {
  try {
    await pool.query('SELECT 1');
    return true;
  } catch {
    return false;
  }
}