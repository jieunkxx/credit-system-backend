import moment from 'moment';
import errorGenerator from '../utils/errorGenerator';
import { CreditDTO, CreditDB } from 'types';
import { creditModel } from '../models';

function isEmpty(obj: any) {
  return Object.keys(obj).length === 0;
}

// does not include start date
const getExpiryDate = (createdAt: Date, expiresAt: Date) => {
  const validForUnit = moment(expiresAt).diff(moment(createdAt), 'days');
  return validForUnit < 90;
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
  let currVal = 0;
  let usedUpAt = 0;
  const creditIdToUse: number[] = [];
  validCredits.forEach((el: CreditDB, index: number) => {
    currVal += el.value;
    if (currVal >= (creditDTO.value as number)) {
      usedUpAt = index;
    } else {
      creditIdToUse.push(el.id);
    }
  });
  if (usedUpAt === 0) {
    const msg = 'AVAILABLE_CREDIT_NOT_ENOUGH BY ';
    errorGenerator({ message: msg, statusCode: 400 });
  }
  creditIdToUse.forEach(
    async (value: number) => await creditModel.useCredit(value)
  );
};

const refundCredit = async (userId: number, creditDTO: CreditDTO) => {
  const today = new Date();
  let msg = null;
  if (getExpiryDate(creditDTO.date, today))
    msg = 'REFUND_FAILED: CREDIT EXPIRED';
  if (isEmpty(creditModel.getCreditIdByDate(userId, creditDTO.date)))
    msg = 'REFUND_FAILED: CREDIT NOT EXIST';
  if (msg !== null) errorGenerator({ message: msg, statusCode: 400 });

  await creditModel.refundCredit(userId, creditDTO);
};

export default {
  addCredit,
  useCredit,
  getAvailableCredit,
  refundCredit,
};
