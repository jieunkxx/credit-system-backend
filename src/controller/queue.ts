import { Request, Response } from 'express';
import { QueueDTO, CustomRequest } from '../types/types';
import { queueService } from '../services';
//Insert
const enqueue = async (req: CustomRequest<QueueDTO>, res: Response) => {
  const item = req.body;
  await queueService.enqueue(item);
  res.status(200).json();
};
//get first in and remove
const dequeue = async (req: Request, res: Response) => {
  await queueService.dequeue();
  res.status(200).json();
};

//get item at index and remove
const pop = async (req: Request, res: Response) => {
  const index = req.body.index;
  const item = await queueService.pop(index);
  res.status(200).json({ item });
};

const getLength = async (req: Request, res: Response) => {
  await queueService.getLength();
  res.status(200).json();
};

export default {
  enqueue,
  dequeue,
  pop,
  getLength,
};
