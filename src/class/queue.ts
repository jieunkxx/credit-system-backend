import * as types from '../common/types';
import moment from 'moment';

export class Queue implements types.Queue {
  enqueue(item: any) {
    return;
  }

  dequeue() {
    return 1;
  }

  pop(index: number) {
    return 1;
  }

  get_length(): number {
    return 1;
  }
}
