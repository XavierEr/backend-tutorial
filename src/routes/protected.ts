import express from 'express';

import authenticationHandler from '../requestHandlers/authenticationHandler.js';

const router = express.Router();

router.get('/', authenticationHandler, (req, res, next) => {
  res.json({ 'You are': 'protected.' });
});

export default router;