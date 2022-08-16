import * as types from 'types';
import moment from 'moment';
import errorGenerator from '../utils/errorGenerator';

const generateDateVariable = (date: Date) => {
  return moment(date).format('YYYYMMDD');
};
const getExpiryDate = (createdAt: Date, expiresAt: Date) => {
  // does not include start date
  const validForUnit = moment(expiresAt).diff(moment(createdAt), 'days');
  return validForUnit < 90;
};

export class Credit implements types.Credit {
  items: types.CreditItem;

  // EFFECTS: construct credit with empty items map
  constructor() {
    this.items = new Map();
  }

  // REQUIRES:
  // MODIFIES: this
  // EFFECTS: add credit and date
  add(credit: types.CreditValue, createdAt: Date) {
    if (this.items.has({ date: createdAt })) {
      const currVal = this.items.get({ date: createdAt });
      this.items.set({ date: createdAt }, Number(currVal) + credit);
    } else {
      this.items.set({ date: createdAt }, credit);
    }
    return;
  }

  // MODIFIES: this
  // EFFECTS: decrement credit value by credit
  //          Has enough credit: current credit >= : return 1;
  //          REFUND PARTIALLY: return (credit - current credit);
  //          REFUND FAILED: return -1;
  use(credit: types.CreditValue, date: Date) {
    if (this.items.has({ date: date })) {
      const currVal = this.items.get({ date: date });
    }
    const key = { date: date };
    let res;
    if (this.items.has(key)) {
      const currVal = Number(this.items.get(key));
      if (currVal >= credit) {
        this.items.set(key, currVal - credit);
        return 1;
      } else {
        errorGenerator({ message: 'NOT_ENOUGH_CREDIT', statusCode: 400 });
      }
    }
    return 0;
  }

  // EFFECTS: return available credit by target date
  get_available(targetDate: Date) {
    let credit = 0;
    for (const key of this.items.keys()) {
      if (getExpiryDate(key.date, targetDate)) {
        credit = credit + Number(this.items.get(key));
      }
    }
    return credit;
  }

  // EFFECTS: return available credit by target date
  get_avaiableFilter(targetDate: Date) {
    const res = 0;
    const newMap = new Map(
      [...this.items].filter(([k, v]) => getExpiryDate(k.date, targetDate))
    );
    return newMap;
  }

  // MODIFIES: this
  // EFFECTS: return REFUND STATUS
  //          REFUND ALL: return 0;
  //          REFUND PARTIALLY: return (credit - current credit);
  //          REFUND FAILED: return -1;
  refund(credit: types.CreditValue, targetDate: Date) {
    const key = { date: targetDate };
    let res;
    if (this.items.has(key)) {
      const currVal = Number(this.items.get(key));
      if (currVal >= credit) {
        this.items.set(key, currVal - credit);
        res = 0;
      } else {
        this.items.delete(key);
        res = credit - currVal;
      }
    }
    res = -1;
    return res;
  }
}
