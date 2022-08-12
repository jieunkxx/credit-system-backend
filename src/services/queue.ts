import { Request, Response } from 'express';
import { QueueDTO, CustomRequest } from '../types/types';
import { queueModel } from '../models';

const enqueue = async () => {};

const dequeue = async () => {};

const pop = async (index: number) => {};

const getLength = async () => {};

export default {
  enqueue,
  dequeue,
  pop,
  getLength,
};
