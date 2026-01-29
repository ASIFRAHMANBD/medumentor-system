import { Router } from 'express';

const r = Router();
r.post('/:id/attempts/start', (req, res) => {
  res.status(201).json({ attemptId: 'example' });
});

export default r;