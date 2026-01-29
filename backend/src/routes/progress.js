import { Router } from 'express';

const r = Router();
r.post('/contents/:id/start', (req, res) => {
  res.status(201).json({ contentId: req.params.id });
});
r.post('/contents/:id/complete', (req, res) => {
  res.status(201).json({ contentId: req.params.id });
});

export default r;