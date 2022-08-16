import errorGenerator from '../utils/errorGenerator';
import { QueueDTO, CustomRequest, QueueItem } from 'types';
import { queueModel } from '../models';

const isTableEmpty = async (table: string) => {
  return await queueModel.checkTableNotEmpty(table);
};

const enqueue = async (item: any) => {
  return await queueModel.enqueue(item);
};

// get first in and remove
const dequeue = async () => {
  if (await isTableEmpty('queue')) {
    const msg = 'TABLE_EMPTY';
    errorGenerator({ message: msg, statusCode: 400 });
  }
  return await queueModel.dequeue();
};

const pop = async (index: number) => {
  if (await isTableEmpty('queue')) {
    const msg = 'TABLE_EMPTY';
    errorGenerator({ message: msg, statusCode: 400 });
  }
  return await queueModel.pop;
};

const getLength = async () => {
  if (await isTableEmpty('queue')) {
    return 0;
  } else {
    const res = await queueModel.getLength();
    return res;
  }
};

export default {
  enqueue,
  dequeue,
  pop,
  getLength,
};
