import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ 'I am': 'ok lah' });
});

export default router;