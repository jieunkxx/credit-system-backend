import * as types from 'types';
import errorGenerator from '../utils/errorGenerator';

class Node {
  item: any;
  next: any;
  constructor(item: any, next = null) {
    this.item = item;
    this.next = next;
  }
}

export class QueueLinkedList {
  // head -------- tail
  // ^             ^
  // |             |
  head: any;

  tail: any;
  length: number;
  constructor(head = null) {
    this.head = head;
    this.tail = null;
    this.length = 0;
  }

  getAt(index: number) {
    let cnt = 0;
    let node = this.head;
    while (node) {
      if (cnt === index) {
        return node;
      }
      cnt++;
      node = node.next;
    }
    return null;
  }

  enqueue(item: any) {
    const newNode = new Node(item);
    if (!this.head) {
      // queue is empty
      this.head = newNode;
    } else {
      // update tail node
      this.tail.next = newNode;
    }
    this.tail = newNode;
    this.length++;
  }

  dequeue() {
    if (!this.head) {
      // queue ls empty
      errorGenerator({ message: 'QUEUE_IS_EMPTY', statusCode: 400 });
    }
    const res = this.head;
    if (this.head.next == null) {
      this.tail = null;
    }
    this.head = this.head.next;
    this.length--;
    return res.item;
  }

  pop(index: number) {
    if (!this.head) {
      errorGenerator({ message: 'QUEUE_IS_EMPTY', statusCode: 400 });
    }
    if (index === 0) {
      this.head = this.head.next;
      return this.head.data;
    }
    const prev = this.getAt(index - 1);
    if (!prev || !prev.next) {
      errorGenerator({ message: `NO ITEM AT INDEX ${index}`, statusCode: 400 });
    }
    const res = prev.next.item;
    prev.next = prev.next.next;
    this.length--;
    return res;
  }

  get_length() {
    return this.length;
  }
}

export class QueueArray implements types.Queue {
  queueArray: types.QueueArray;
  head: number;
  tail: number;
  indexCalc: number;

  // head directs the index of first element in the queue
  // tail directs the last element in the queue
  constructor() {
    this.queueArray = [];
    this.head = -1;
    this.tail = -1;
    this.indexCalc = 0;
  }

  // Insert item at the end
  enqueue<T>(item: T) {
    // increment index if queueArray is empty
    if (this.head === -1) {
      this.head++;
    }
    this.tail++;

    this.queueArray[this.tail] = item;
  }

  // get first in and remove
  dequeue() {
    if (this.head === -1) {
      errorGenerator({ message: 'QUEUE_IS_EMPTY', statusCode: 400 });
    }

    const res = this.queueArray[this.head];

    if (this.get_length() === 1) {
      // queue becomes empty. reset head and tail
      this.head = -1;
      this.tail = -1;
    } else if (this.get_length() === 2) {
      // queue has one item left
      this.head = 0;
      this.tail = 0;
    }
    return res;
  }

  pop(index: number) {
    if (this.head === -1) {
      errorGenerator({ message: 'QUEUE_IS_EMPTY', statusCode: 400 });
    }
    if (!this.queueMap.has({ index: this.index })) {
      errorGenerator({ message: `NO ITEM AT INDEX ${index}`, satusCode: 400 });
    }
    this.queueMap.delete({ index: this.index });
    this.length--;
    if (index === this.head) this.head++;
    if (index === this.tail) this.tail--;

    const head = this.queueArray.slice(0, index);
    const tail = this.queueArray.slice(index + 1, this.length);
    const res = this.queueArray.slice(index, index + 1);
    this.queueArray = head.concat(tail);
    return res;
  }

  get_length(): number {
    return this.tail - this.head + 1;
  }
}

export class Queue implements types.Queue {
  queueArray: types.QueueArray;
  head: number;
  tail: number;
  indexCalc: number;

  // head directs the index of first element in the queue
  // tail directs the last element in the queue
  constructor() {
    this.queueArray = [];
    this.head = -1;
    this.tail = -1;
    this.indexCalc = 0;
  }

  // Insert item at the end
  enqueue<T>(item: T) {
    // increment index if queueArray is empty
    if (this.head === -1) {
      this.head++;
    }
    this.tail++;

    this.queueArray[this.tail] = item;
  }

  // get first in and remove
  dequeue() {
    if (this.head === -1) {
      errorGenerator({ message: 'QUEUE_IS_EMPTY', statusCode: 400 });
    }

    const res = this.queueArray[this.head];

    if (this.get_length() === 1) {
      // queue becomes empty. reset head and tail
      this.head = -1;
      this.tail = -1;
    } else if (this.get_length() === 2) {
      // queue has one item left
      this.head = 0;
      this.tail = 0;
    }
    return res;
  }

  pop(index: number) {
    if (this.head === -1) {
      errorGenerator({ message: 'QUEUE_IS_EMPTY', statusCode: 400 });
    }
    const res = this.queueArray[this.head + index];
    if (this.head + index > this.tail || res == null) {
      errorGenerator({ message: `NO ITEM AT INDEX ${index}`, statusCode: 400 });
    }
    if (index === 0) {
      return this.queueArray[this.head];
    }
    return this.queueArray[this.head + index];
  }

  get_length() {
    return this.tail - this.head + 1;
  }
}

export class QueueMap {
  queueMap: types.QueueItem;
  length: number;
  index: number;
  start: number;
  end: number;
  indexCalc: number;

  constructor() {
    this.queueMap = new Map();
    this.length = 0;
    this.index = -1;
    this.start = 0;
    this.end = 0;
    this.indexCalc = 0;
  }

  set currIndex(newIndex: number) {
    this.index = newIndex;
  }

  get currIndex() {
    return this.index - this.indexCalc;
  }

  enqueue<T>(item: T) {
    this.index++;
    this.end++;
    this.length++;
    this.queueMap.set({ index: this.index }, { item: item });
  }

  dequeue() {
    if (this.start === -1) {
      errorGenerator({ message: 'QUEUE_IS_EMPTY', statusCode: 400 });
    }
    if (!this.queueMap.has({ index: this.start })) {
      errorGenerator({ message: `INVALID REQUEST`, statusCode: 400 });
    }
    this.queueMap.delete({ index: this.start });
    this.length--;
    if (this.length < 3) {
      this.start = 0;
      this.end = 0;
    }
    this.start++;
  }

  pop(index: number) {
    if (this.start === -1) {
      errorGenerator({ message: 'QUEUE_IS_EMPTY', statusCode: 400 });
    }
    if (!this.queueMap.has({ index: this.index })) {
      errorGenerator({ message: `NO ITEM AT INDEX ${index}`, statusCode: 400 });
    }
    const res = this.queueMap.get({ index: this.index });
    this.queueMap.delete({ index: this.index });
    this.length--;
    if (index === this.start) this.start++;
    if (index === this.end) this.end--;
    return res;
  }

  get_length(): number {
    return this.length;
  }
}
