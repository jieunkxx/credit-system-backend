import express from 'express';
import CreditRouter from './credit';
import QueueRouter from './queue';

const router = express.Router();

router.use('/credit', CreditRouter);
router.use('/queue', queueRouter);

export default router;
