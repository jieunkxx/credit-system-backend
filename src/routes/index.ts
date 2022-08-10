import express from 'express';
import creditRouter from './credit';
import queueRouter from './queue';

const router = express.Router();

router.use('/credit', creditRouter);
router.use('/queue', queueRouter);

export default router;
