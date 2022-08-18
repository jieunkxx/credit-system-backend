import prisma from '../../src/prisma';
import { PrismaPromise } from '.prisma/client';
import { UserDB, CreditDTO, CreditDB } from '../../src/types/types';
import creditModel from '../../src/models/credit';
import creditService from '../../src/services/credit';
import creditRouter from '../../src/routes/credit';
import { selectBuilder } from '../../src/models/queryBuilder';
import * as mock from '../data/mock';
import moment from 'moment';
import { ExpressApp } from '../../src/app';
const dateGenerator = (date: Date | string) => {
  return moment(date).format('YYYY-MM-DD');
};

const createCreditDTO = (value: number, date: string) => {
  return { value: value, date: dateGenerator(date) };
};

const truncateTables = async (tables: string[]) => {
  const transactions: PrismaPromise<any>[] = [];
  transactions.push(prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`);

  for (const table of tables) {
    if (table !== '_prisma_migrations') {
      try {
        transactions.push(prisma.$executeRawUnsafe(`TRUNCATE ${table};`));
      } catch (error) {
        console.log({ error });
      }
    }
  }
  transactions.push(prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`);

  try {
    await prisma.$transaction(transactions);
  } catch (error) {
    console.log({ error });
  }
};

describe('credit api', () => {
  let app: ExpressApp;

  beforeAll(() => {}); // 전체 테스트 중 제일 첫 한번

  beforeEach(() => { // 각 테스트 돌기 전에 한번
    app = new ExpressApp();
    app.listen(10010);
  });

  afterAll(() => {});

  afterEach(() => {});

  test('유저가 localhost:3000/abc로 body 값을 보냄', async () => {
    const result = await fetch('http://localhost:10010', {'Content-Type': '', body: ''});
    const json = await result.json();
    expect(result.status).toBe(200);
    expect(json.message).toBe('abljal;ekjflka');
  })
});

describe('credit', () => {
  let userId: number, creditDTO, value: number;
  beforeAll(async () => {
    await truncateTables(['credits', 'users']);
    await prisma.users.createMany({
      data: mock.users,
    });
    await prisma.credits.createMany({
      data: mock.credits,
    });
  });

  beforeEach(async () => {
    userId = 1;
    value = 3;
  });

  describe('Get credits', () => {
    test('get all credit', async () => {
      const credits = await prisma.$queryRawUnsafe(
        selectBuilder(['id', 'user_id', 'value', 'created_at'], 'credits')
      );
      const users = await prisma.$queryRawUnsafe(
        selectBuilder(['user_name', 'password', 'created_at'], 'users')
      );
      expect(credits).toStrictEqual(mock.credits);
      expect(users).toStrictEqual(mock.users);
    });
    test('get credit with valid user id', async () => {
      const credits: CreditDB[] = await prisma.$queryRawUnsafe(
        selectBuilder(['all'], 'credits', { userId: `${userId}` })
      );
      credits.filter(credit => {
        credit.user_id === 1;
      });
      expect(credits.length).toBe(8);
    });
    test('get credit with invalid user id', async () => {
      const credits: CreditDB[] = await prisma.$queryRawUnsafe(
        selectBuilder(['all'], 'credits', { userId: `${userId}` })
      );

      const invalid = credits.filter(credit => {
        credit.user_id === 3;
      });
      expect(invalid.length).toBe(0);
    });
  });

  describe('add credits', () => {
    let credits;
    beforeEach(async () => {
      credits = await prisma.$queryRawUnsafe(
        selectBuilder(['all'], 'credits', { userId: `${userId}` })
      );
    });

    test('add credit on existed data', async () => {
      expect(credits.length).toBe(8);
      const creditDTO = createCreditDTO(value, '2022-08-13');
      await creditService.addCredit(1, creditDTO);
      expect(credits.length).toBe(8);
      const res: CreditDB[] = await prisma.$queryRawUnsafe(
        selectBuilder(['id', 'user_id', 'value', 'created_at'], 'credits', {
          userId: `${userId}`,
        })
      );
      expect(res[credits.length - 1]).toStrictEqual({
        id: credits.length,
        user_id: 1,
        value: 5,
        created_at: new Date('2022-08-13'),
      });
    });

    test('add credit on non-exist ', async () => {
      expect(credits.length).toBe(8);
      const creditDTO = createCreditDTO(1, '2022-08-14');
      await creditService.addCredit(1, creditDTO);
      const res: CreditDB[] = await prisma.$queryRawUnsafe(
        selectBuilder(['value', 'created_at'], 'credits', {
          userId: `${userId}`,
        })
      );
      expect(res.length).toBe(9);
      expect(res[res.length - 1]).toStrictEqual({
        created_at: new Date('2022-08-14'),
        value: 1,
      });
    });
  });

  describe('use credits', () => {
    test('use credit : all', async () => {
      creditDTO = createCreditDTO(4, new Date().toISOString());
      await creditService.useCredit(1, creditDTO);
      const credits: CreditDB[] = await prisma.$queryRawUnsafe(
        selectBuilder(['all'], 'credits', { userId: `${userId}` })
      );
      expect(
        credits.find(
          credit =>
            dateGenerator(credit.created_at) === dateGenerator(`2022-05-11`)
        )
      ).toBe(undefined);
    });

    test('use credit : partial', async () => {
      userId = 2;
      value = 1;
      const date = moment().format('YYYY-MM-DD');
      creditDTO = createCreditDTO(value, date);
      const target = await creditModel.getAvailableCredit(
        userId,
        creditDTO.date
      );
      const orgVal = target[0].value;
      const targetId = target[0].id;
      const expectedVal = orgVal - value;
      await creditService.useCredit(userId, creditDTO);
      const query = `SELECT * FROM credits WHERE user_id=${userId} AND id="${targetId}";`;
      const credit: CreditDB[] = await prisma.$queryRawUnsafe(query);
      expect(credit[0].value).toBe(expectedVal);
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
    await truncateTables(['credits', 'users']);
  });
});
