import { Request, Response } from 'express';
import { QueueDTO, CustomRequest } from '../types/types';
import { queueService } from '../services';
const enqueue = async (req: CustomRequest<QueueDTO>, res: Response) => {
  res.status(200).json();
};

const dequeue = async (req: Request, res: Response) => {
  res.status(200).json();
};

const pop = async (req: Request, res: Response) => {
  const index = req.body.index;
  const item = await queueService.pop(index);
  res.status(200).json({ item });
};

const getLength = async (req: Request, res: Response) => {
  res.status(200).json();
};

export default {
  enqueue,
  dequeue,
  pop,
  getLength,
};
