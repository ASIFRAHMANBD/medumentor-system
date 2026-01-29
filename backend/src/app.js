import express from 'express';
import cors from 'cors';
import { router as apiRouter } from './routes/index.js';
import { ping } from './lib/db.js';
import { errorMiddleware } from './middleware/error.js';

const app = express();
app.use(cors());
app.use(express.json());
app.get('/health', async (req, res) => {
  const dbUp = await ping();
  res.json({ ok: true, db: dbUp ? 'up' : 'down' });
});
app.use('/api', apiRouter);
app.use(errorMiddleware);

export default app;