import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/medumentor';
const ssl = process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false;
const pool = new Pool({ connectionString, ssl });

async function ensureTable() {
  await pool.query(
    'CREATE TABLE IF NOT EXISTS schema_migrations (id TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW())'
  );
}

async function appliedIds() {
  const { rows } = await pool.query('SELECT id FROM schema_migrations');
  return new Set(rows.map(r => r.id));
}

async function run() {
  await ensureTable();
  const applied = await appliedIds();
  const dir = path.join(process.cwd(), 'migrations');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.sql')).sort();
  for (const file of files) {
    const id = file;
    if (applied.has(id)) continue;
    const sql = fs.readFileSync(path.join(dir, file), 'utf8');
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(sql);
      await client.query('INSERT INTO schema_migrations (id) VALUES ($1)', [id]);
      await client.query('COMMIT');
      process.stdout.write(`Applied ${id}\n`);
    } catch (e) {
      await client.query('ROLLBACK');
      process.stderr.write(`Failed ${id}\n`);
      process.stderr.write(String(e) + '\n');
      process.exitCode = 1;
      break;
    } finally {
      client.release();
    }
  }
  await pool.end();
}

run();