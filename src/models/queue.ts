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
  console.log(isNotEmpty);
  return /^1/.test(isNotEmpty[table]);
};

const getItem = async () => {
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

const pop = async (index: QueueIndex) => {
  const items = await getItem();
};

const getLength = async () => {
  const items: any = await getItem();
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
