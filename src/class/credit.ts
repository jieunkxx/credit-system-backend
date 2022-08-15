import * as types from 'types';
import moment from 'moment';

const generateDateVariable = (date: Date) => {
  return moment(date).format('YYYYMMDD');
};
const getExpiryDate = (createdAt: Date, expiresAt: Date) => {
  // does not include start date
  const validForUnit = moment(expiresAt).diff(moment(createdAt), 'days');
  return validForUnit < 90;
};

// const getDaysDiff = (start_date, end_date, date_format = 'YYYY-MM-DD') => {
//   const getDateAsArray = date => {
//     return moment(date.split(/\D+/), date_format);
//   };
//   return getDateAsArray(end_date).diff(getDateAsArray(start_date), 'days') + 1;
// };

/*
Credit
Represents a Credit with items
*/
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
        res = 0;
      } else {
        this.items.delete(key);
        res = 2;
      }
    }

    return;
  }

  // EFFECTS: return available credit by target date
  get_available(targetDate: Date) {
    //const res: Array<types.Credit> = [];
    let res = 0;
    for (const key of this.items.keys()) {
      if (getExpiryDate(key.date, targetDate)) {
        res = res + Number(this.items.get(key));
      }
    }
    return res;
  }

  // EFFECTS: return available credit by target date
  get_avaiableFilter(targetDate: Date) {
    const res = 0;
    const newMap = new Map(
      [...this.items].filter(([k, v]) => getExpiryDate(k.date, targetDate))
    );
    console.log(newMap);
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
