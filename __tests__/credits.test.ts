import moment from 'moment';
import * as creditModel from '../src/models/credit';

describe('model credit', () => {
  test('add credit', () => {
    const dto = {
      value: 3,
      created_at: moment().format('YYYY-MM-DD'),
    };
    const res = creditModel.addCredit(dto);
    expect(res.value).toBe(dto.value);
    expect(typeof res.value).toBe(typeof 'number');
  });
});
