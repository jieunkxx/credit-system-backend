import { PrismaClient } from '@prisma/client';
import moment from 'moment';
import { UserDB, CreditDTO, CreditDB, CreditValue } from 'types';
import {
  deleteBuilder,
  insertBuilder,
  updateBuilder,
  updateBetweenBuilder,
} from './queryBuilder';
const prisma = new PrismaClient();

function isEmpty(obj: {}) {
  return Object.keys(obj).length === 0;
}

const getCreditIdByDate = async (userId: number, date: Date) => {
  const credit: Array<CreditDB> = await prisma.$queryRaw`
    SELECT * FROM credit WHERE date=${date}
  `;
  return credit[0];
};

const addCredit = async (userId: UserDB['id'], creditDTO: CreditDTO) => {
  const query = insertBuilder(
    {
      user_id: userId,
      value: creditDTO.value as number,
      created_at: moment(creditDTO.date).format('YYYY-MM-DD'),
    },
    'credits'
  );
  await prisma.$queryRawUnsafe(query);
};

const addCreditOnExist = async (
  userId: UserDB['id'],
  creditId: CreditDB['id'],
  value: CreditDB['value']
) => {
  const query = updateBuilder(creditId, value, 'credits');
  await prisma.$queryRawUnsafe(query);
};

const getAvailableCredit = async (userId: UserDB['id'], date: Date) => {
  const query = `
    SELECT * FROM credits 
    WHERE 
      user_id=${userId} 
    AND
      created_at > (Date(${date}) - INTERVAL 90 DAYS) 
    ORDER BY created_at ASC
  `;
  const res: Array<CreditDB> = await prisma.$queryRawUnsafe(query);
  return res;
};

const useCredit = async (creditId: CreditDB['id']) => {
  const query = updateBuilder(creditId, { used: true }, 'credits');
  await prisma.$queryRawUnsafe(query);
};

const refundCredit = async (userId: number, creditDTO: CreditDTO) => {
  const query = deleteBuilder(creditDTO, 'credits', null);
  await prisma.$queryRawUnsafe(query);
};
// export class Credit implements Credit {
//   userId: number;

//   constructor(userId: number) {
//     this.userId = userId;
//   }
//   async add(credit: number, createdAt: types.CreditCreatedAt) {
//     addCredit(this.userId, credit, createdAt);
//   }
//   use(credit: number, date: Date) {}
//   get_available(date: Date) {}
//   refund(credit: number, date: Date) {}
// }

export default {
  getCreditIdByDate,
  addCredit,
  addCreditOnExist,
  useCredit,
  getAvailableCredit,
  refundCredit,
};
