import prisma from '../prisma';
import moment from 'moment';
import { UserDB, CreditDTO, CreditDB } from 'types';
import { deleteBuilder, insertBuilder, updateBuilder } from './queryBuilder';

const getCreditById = async (creditId: number) => {
  const res: Array<CreditDB> = await prisma.$queryRawUnsafe(
    `SELECT value FROM credits WHERE id=${creditId}`
  );
  return res[0];
};

const getCreditIdByDate = async (userId: number, date: Date) => {
  const query = `
    SELECT * FROM credits WHERE created_at='${date}' AND user_id=${userId}
  `;
  const credit: Array<CreditDB> = await prisma.$queryRawUnsafe(query);
  return credit[0];
};

const addCredit = async (userId: UserDB['id'], creditDTO: CreditDTO) => {
  const data = {
    user_id: userId,
    value: creditDTO.value as number,
    created_at: moment(creditDTO.date).format('YYYY-MM-DD'),
  };
  console.log(data);
  const query = insertBuilder(data, 'credits');
  console.log(query);
  await prisma.$queryRawUnsafe(query);
};

const addCreditOnExist = async (
  userId: UserDB['id'],
  creditId: CreditDB['id'],
  value: CreditDB['value']
) => {
  const currVal: number = (await getCreditById(creditId)).value;
  const data = {
    user_id: userId,
    value: currVal + value,
  };
  const query = updateBuilder(creditId, data, 'credits');
  await prisma.$queryRawUnsafe(query);
};

const getAvailableCredit = async (userId: UserDB['id'], date: Date) => {
  const query = `
    SELECT * FROM credits 
    WHERE 
      user_id=${userId} 
    AND
      created_at > (Date('${date}') - INTERVAL 90 DAY) 
    ORDER BY created_at ASC
  `;
  const res: Array<CreditDB> = await prisma.$queryRawUnsafe(query);
  return res;
};

const useCredit = async (
  creditId: CreditDB['id'],
  used: number,
  value: number
) => {
  const data = {
    used: used,
    value: value,
  };

  const query = updateBuilder(creditId, data, 'credits');
  await prisma.$queryRawUnsafe(query);
};

const refundCredit = async (
  userId: number,
  creditId: number,
  creditDTO: CreditDTO
) => {
  let query;
  const currVal = (await getCreditById(creditId)).value;
  const refundVal = creditDTO.value as number;
  if (currVal > refundVal) {
    query = updateBuilder(creditId, { value: currVal - refundVal }, 'credits');
  } else {
    query = deleteBuilder({ id: creditId }, 'credits', null);
  }
  await prisma.$queryRawUnsafe(query);
};

export default {
  getCreditIdByDate,
  addCredit,
  addCreditOnExist,
  useCredit,
  getAvailableCredit,
  refundCredit,
};
