import { CreditDB, UserDB } from '../../src/types/types';
import { insertBuilder } from '../../src/models/queryBuilder';
import { credits, users } from './mock';

const buildBulkInsertQuery = async (
  table: string,
  data: { [key in string]: number | string | Date | boolean }[]
) => {
  for (const el of data) {
    await insertBuilder(el, table);
  }
};

const insertQueryFactory = {
  credits: buildBulkInsertQuery('credits', credits),
  users: buildBulkInsertQuery('users', users),
};

export default insertQueryFactory;
