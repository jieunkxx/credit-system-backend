import * as types from 'types';
import errorGenerator from '../utils/errorGenerator';

class Node<T> {
  item: T;
  next: Node<T> | null = null;
  constructor(item: T, next = null) {
    this.item = item;
    this.next = next;
  }
}

export class Queue<T> {
  head: Node<T> | null = null;

  tail: Node<T> | null = null;
  length: number;

  // EFFECTS: construct queue with head, tail, length
  constructor(head = null) {
    this.head = head;
    this.tail = null;
    this.length = 0;
  }

  // REQUIRES: index >= 0
  // EFFECTS: add credit and date
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

  // MODIFIES: this
  // EFFECTS: insert item at the end of queue
  enqueue(item: T) {
    const newNode = new Node(item);
    if (this.head == null) {
      // queue is empty
      this.head = newNode;
    } else if (this.tail !== null) {
      // update tail node
      this.tail.next = newNode;
    }
    this.tail = newNode;
    this.length++;
  }

  // MODIFIES: this
  // EFFECTS: remove the first item in the queue and returns it
  dequeue() {
    if (this.head == null) {
      // queue ls empty
      errorGenerator({ message: 'QUEUE_IS_EMPTY', statusCode: 400 });
    }
    const target = this.head as Node<T>;
    if (target.next == null) {
      this.tail = null;
    }
    this.head = target.next;
    this.length--;
    return target.item;
  }

  // REQUIRES: index >= 0
  // MODIFIES: this
  // EFFECTS: remove item at the given index position in the queue and returns it
  pop(index: number) {
    if (this.head == null) {
      errorGenerator({ message: 'QUEUE_IS_EMPTY', statusCode: 400 });
    }
    if (this.get_length() === 1) {
      const res = this.head;
      this.head = null;
      this.length--;
      return res?.item;
    }
    if (index === 0) {
      this.head = this.head?.next as Node<T>;
      this.length--;
      return this.head.item;
    }
    const prev = this.getAt(index - 1);
    if (!prev || !prev.next) {
      errorGenerator({ message: `NO ITEM AT INDEX ${index}`, statusCode: 400 });
    } else {
      const target = prev.next;
      prev.next = prev.next.next;
      this.length--;
      return target.item;
    }
  }

  // EFFECTS: returns the length of queue
  get_length() {
    return this.length;
  }
}
