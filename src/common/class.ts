import * as types from './types';
import moment from 'moment';
export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  getErrorMessage() {
    return 'Something went wrong: ' + this.message;
  }
}

const getExpiryDate = (createdAt: Date, expiresAt: Date) => {
  // does not include start date
  const validForUnit = moment(expiresAt).diff(moment(createdAt), 'days');
  return validForUnit < 90;
};
export class Credit implements types.Credit {
  items: any = [];
  constructor() {
    this.items = [];
  }
  add(credit: types.CreditId, date: Date) {
    const obj: types.item = {
      credit: credit,
      date: date,
    };
    this.items.push({ credit: credit, date: date });
    return;
  }

  use(credit: types.CreditId, date: Date) {
    this.items.shift();
    return;
  }
  get_available(date: Date) {
    let res: Array<types.Credit> = [];
    res = this.items.filter((el: types.item) => {
      getExpiryDate(el.date, date);
    });
    return res;
  }

  refund(credit: types.CreditId, date: Date) {
    const res: Array<types.item> = this.items.filter(
      (el: types.item, index: number) => {
        return !moment(el.date).isSame(date);
      }
    );
    return;
  }
}
