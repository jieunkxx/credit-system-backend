import prisma from '../../src/prisma';
import moment from 'moment';
import { UserDB, CreditDTO, CreditDB } from '../../src/types/types';
import creditModel from '../../src/models/credit';
import creditService from '../../src/services/credit';
import creditRouter from '../../src/routes/credit';
import insertQueryFactory from '../data/insertQueryFactory';
import * as mock from '../data/mock';
const dateGenerator = (date: Date | string) => {
  return new Date(date);
};

const createCreditDTO = (value: number, date: Date | string) => {
  return { value: value, date: dateGenerator(date) };
};

describe('credit', () => {
  let query, mutate, testClient;
  let userId: number, creditDTO, value: number, createdAt: Date;
  beforeAll(async () => {
    testClient = getTestClient();
    query = testClient.query;
    mutate = testClient.query;
  });
  beforeEach(async () => {
    userId = 1;
    value = 3;
    await testClient.truncate(['credits', 'users']);
    const { credits, users } = insertQueryFactory;
    await testClient.startTransaction([credits, users]);
  });

  describe('Get credits', () => {
    test('get all credit', async () => {
      const credits = await prisma.$queryRaw`SELECT * FROM credits`;
      const users = await prisma.$queryRaw`SELECT * FROM users`;
      expect(credits).toStrictEqual(mock.credits);
      expect(users).toStrictEqual(mock.users);
    });
    test('get credit with valid user id', async () => {
      const credits: CreditDB[] =
        await prisma.$queryRaw`SELECT * FROM credits WHERE user_id=${userId}`;
      credits.filter(credit => {
        credit.user_id === 1;
      });
      expect(credits.length).toBe(8);
    });
    test('get credit with invalid user id', async () => {
      const credits: CreditDB[] =
        await prisma.$queryRaw`SELECT * FROM credits WHERE user_id=${userId}`;
      credits.filter(credit => {
        credit.user_id === 3;
      });
      expect(credits.length).toBe(0);
    });
  });

  describe('add credits', () => {
    let credits;
    beforeEach(async () => {
      credits =
        await prisma.$queryRaw`SELECT * FROM credits WHERE user_id=${userId}`;
    });

    test('add credit on existed data', async () => {
      expect(credits.length).toBe(8);
      const creditDTO = createCreditDTO(value, '2022-08-13');
      await creditService.addCredit(1, creditDTO);
      expect(credits.length).toBe(8);
      const res: CreditDB[] =
        await prisma.$queryRaw`SELECT * FROM credits WHERE user_id=${userId}`;
      expect(res[credits.length - 1]).toStrictEqual({
        user_id: 1,
        value: 5,
        created_at: '2022-08-13',
      });
    });

    test('add credit on non-exist ', async () => {
      expect(credits.length).toBe(8);
      const creditDTO = createCreditDTO(1, '2022-08-14');
      await creditService.addCredit(1, creditDTO);
      expect(credits.length).toBe(9);
      const res: CreditDB[] =
        await prisma.$queryRaw`SELECT * FROM credits WHERE user_id=${userId}`;
      expect(res[credits.length - 1]).toStrictEqual(creditDTO);
    });
  });

  describe('use credits', () => {
    test('use credit : all', async () => {
      creditDTO = createCreditDTO(4, new Date().toISOString());
      await creditService.useCredit(1, creditDTO);
      const credits: CreditDB[] =
        await prisma.$queryRaw`SELECT * FROM credits WHERE user_id=${userId}`;
      expect(credits.find(credit => dateGenerator(credit.created_at) === dateGenerator(`2022-05-11`))).toBe(
        undefined
      );
    });

    test('use credit : partial', async () => {
      creditDTO = createCreditDTO(3, new Date().toISOString());
      await creditService.useCredit(1, creditDTO);
      const credits: CreditDB[] =
        await prisma.$queryRaw`SELECT * FROM credits WHERE user_id=${userId}`;
      const res = credits.find(credit => dateGenerator(credit.created_at) === dateGenerator('2022-05-11'));
      expect(res?.value).toBe(1);
    });

    test('use credit : more', async () => {
      creditDTO = createCreditDTO(5, new Date().toISOString());
      try {
        await creditService.useCredit(1, creditDTO);
        expect(true).toBe(false);
      } catch (e) {
        expect(true).toBe(true);
      }
    });
  });

  describe('get available credits', () => {
    test('get available credits ', async () => {
      creditDTO = createCreditDTO(1, '2022-08-13');
    });
    test('get available credits', async () => {
      creditDTO = createCreditDTO(1, '2021-08-13');
    });
  });

  describe('refund credits', () => {
    test('refund credits partial', async () => {
      creditDTO = createCreditDTO(1, '2022-08-13');
    });

    test('refund credits all', async () => {
      creditDTO = createCreditDTO(3, '2022-08-12');
    });

    test('refund credits : request more', async () => {
      creditDTO = createCreditDTO(3, '2022-08-13');
      try {
        await creditService.refundCredit(1, creditDTO);
        expect(true).toBe(false);
      } catch (e) {
        expect(true).toBe(true);
      }
    });

    test('refund credits : non-existed data', async () => {
      creditDTO = createCreditDTO(5, new Date().toISOString());
      try {
        await creditService.refundCredit(1, creditDTO);
        expect(true).toBe(false);
      } catch (e) {
        expect(true).toBe(true);
      }
    });
  });
  afterAll(async () => {
    await testClient.truncate(['credits', 'users']);
  }
});
