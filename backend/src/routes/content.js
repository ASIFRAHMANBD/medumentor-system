import { Router } from 'express';

const r = Router();
r.get('/:id', (req, res) => {
  res.json({ id: req.params.id });
});

export default r;