import { Router } from 'express';

const r = Router();
r.post('/stages', (req, res) => {
  res.status(201).json({ ok: true });
});

export default r;