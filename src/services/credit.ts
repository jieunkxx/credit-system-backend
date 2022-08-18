import moment from 'moment';
import errorGenerator from '../utils/errorGenerator';
import { CreditDTO, CreditDB } from 'types';
import { creditModel } from '../models';

function isEmpty(obj: Record<string, any>) {
  return Object.keys(obj || {}).length === 0;
}

// does not include start date
const isExpired = (createdAt: string, expiresAt: string) => {
  const validForUnit = moment(expiresAt).diff(moment(createdAt), 'days');
  return validForUnit > 90;
};

const addCredit = async (userId: number, creditDTO: CreditDTO) => {
  const credit = await creditModel.getCreditIdByDate(userId, creditDTO.date);
  if (isEmpty(credit)) {
    await creditModel.addCredit(userId, creditDTO);
  } else {
    const creditId = credit.id;
    await creditModel.addCreditOnExist(
      userId,
      creditId,
      creditDTO.value as number
    );
  }
};

const getAvailableCredit = async (userId: number, creditDTO: CreditDTO) => {
  const validCredits = await creditModel.getAvailableCredit(
    userId,
    creditDTO.date
  );

  if (isEmpty(validCredits[0])) {
    const msg = 'AVAILABLE_CREDIT_DOES_NOT_EXIST';
    errorGenerator({ message: msg, statusCode: 400 });
  }
  return validCredits;
};

const useCredit = async (userId: number, creditDTO: CreditDTO) => {
  const validCredits = await creditModel.getAvailableCredit(
    userId,
    creditDTO.date
  );
  if (isEmpty(validCredits[0])) {
    const msg = 'AVAILABLE_CREDIT_DOES_NOT_EXIST';
    errorGenerator({ message: msg, statusCode: 400 });
  }
  let usedUpAt = -1;
  let targetVal = creditDTO.value as number;
  validCredits.every(async (el: CreditDB, index: number) => {
    if (el.value > targetVal) {
      await creditModel.useCredit(el.id, 0, el.value - targetVal);
      usedUpAt = index;
      return false;
    } else if (el.value === targetVal) {
      await creditModel.useCredit(el.id, 1, 0);
      usedUpAt = index;
      return false;
    }
    targetVal = targetVal - el.value;
    await creditModel.useCredit(el.id, 1, 0);
    return true;
  });
  if (usedUpAt === 0) {
    const msg = 'AVAILABLE_CREDIT_NOT_ENOUGH BY ';
    errorGenerator({ message: msg, statusCode: 400 });
  }
};

const refundCredit = async (userId: number, creditDTO: CreditDTO) => {
  const today = moment().format('YYYY-MM-DD');
  let msg = null;
  const credit = await creditModel.getCreditIdByDate(userId, creditDTO.date);
  if (isExpired(creditDTO.date, today)) {
    msg = 'REFUND_FAILED: CREDIT EXPIRED';
  } else if (isEmpty(credit)) {
    msg = 'REFUND_FAILED: CREDIT NOT EXIST';
  } else if (credit.value < (creditDTO.value as number)) {
    msg = 'NOT_ENOUGH_CREDIT';
  }
  if (msg !== null) errorGenerator({ message: msg, statusCode: 400 });

  await creditModel.refundCredit(userId, credit.id, creditDTO);
};

export default {
  addCredit,
  useCredit,
  getAvailableCredit,
  refundCredit,
};
