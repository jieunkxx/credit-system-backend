import prisma from '../../src/prisma';
import moment from 'moment';
import { UserDB, CreditDTO, CreditDB } from '../../src/types/types';
import {
  deleteBuilder,
  insertBuilder,
  updateBuilder,
} from '../../src/models/queryBuilder';
import insertQueryFactory from '../data/insertQueryFactory';

describe('credit model', () => {
  let query, mutate, testClient;

  beforeAll(async () => {
    testClient = getTestClient();
    query = testClient.query;
    mutate = testClient.query;
  });

  describe('Get credits', () => {
    beforeAll(async () => {
      await testClient.truncate(['credits', 'users']);
      const { credits, users } = insertQueryFactory;
      await testClient.startTransaction([credits, users]);
    });
  });

  describe('Create a batches', () => {});

  describe('update batches', () => {});

  describe('Delete a batches', () => {});
});

// describe('model credit', () => {
//   beforeAll() {
//     const userId = 1;
//   }
//   test('add credit', () => {
//     const dto = {
//       value: 3,
//       created_at: moment().format('YYYY-MM-DD'),
//     };
//     const res = creditModel.addCredit(userId, dto);
//     expect(res.value).toBe(dto.value);
//     expect(typeof res.value).toBe(typeof 'number');
//   });
// });
