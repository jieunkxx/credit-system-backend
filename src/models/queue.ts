import prisma from '../prisma';
import {
  UserDB,
  CreditDTO,
  CreditDB,
  CreditValue,
  QueueItem,
  QueueIndex,
} from 'types';
import {
  deleteBuilder,
  insertBuilder,
  updateBuilder,
  updateBetweenBuilder,
} from './queryBuilder';

const checkTableNotEmpty = async (table: string) => {
  const [isNotEmpty]: any = await prisma.$queryRawUnsafe(`
    SELECT EXISTS (SELECT 1 FROM ${table}) ${table}
  `);
  return /^1/.test(isNotEmpty[table]);
};

const getItems = async () => {
  const query = `SELECT * FROM queue`;
  return await prisma.$queryRawUnsafe(query);
};

const enqueue = async (item: any) => {
  const query = insertBuilder(item, 'queue');
  await prisma.$queryRawUnsafe(query);
};

const dequeue = async () => {
  const query = `SELECT * FROM queue WHERE id
    
  `;
  prisma.$queryRawUnsafe(query);
};

const pop = async (index: number) => {
  const items = await getItems();
};

const getLength = async () => {
  const items = await getItems();
  const query = ``;
  const res = prisma.$queryRawUnsafe(query);
  return res;
};

export default {
  checkTableNotEmpty,
  enqueue,
  dequeue,
  pop,
  getLength,
};
