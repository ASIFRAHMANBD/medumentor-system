import 'dotenv/config';
import app from './app.js';
import { pool } from './lib/db.js';

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
const server = app.listen(port, () => {});

function shutdown() {
  server.close(() => {
    pool.end().then(() => process.exit(0)).catch(() => process.exit(1));
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);