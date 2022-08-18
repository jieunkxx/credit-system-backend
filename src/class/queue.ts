import * as types from 'types';
import errorGenerator from '../utils/errorGenerator';

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
      // queue is empty
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

class Node<T> {
  item: T;
  next: Node<T> | null = null;

  constructor(private item: T, private next = null) { }
}

abstract class Queue<T> {
  abstract enqueue(item: T): void;
  abstract dequeue(): T;
  abstract pop(index: number): T;
  abstract getLength(): number;
}

export class LinkedQueue extends Queue<T> {
  head: Node<T> | null = null;
  tail: Node<T> | null = null;
  length: number = 0;

  constructor(values?: T[]) {
    if (values) {
      values.forEach(value => {
        this.head = new Node(value);
        this.tail = this.head;
        this.length += 1;
      });
    }
  }

  enqueue(item: T) {
    const node = new Node(item);
    this.length += 1;
    if (this.tail) {
      this.tail.next = node;
      this.tail = node;
    }
    else {
      this.head = node;
      this.tail = this.head;
    }
  } // O(1)

  dequeue() {
    if(!this.head) {
      throw new Error('queue is empty!');
    }
    const { item } = this.head;
    this.head = this.head.next;
    this.length -= 1;
    return item;
  } // O(1)

  // Node1{ item: 'abc', next: Node2 } -> Node2{ item: 'def', next: null}
  pop(index: number) {
    if(index >= this.length) {
      throw new Error('invalid index!');
    }
    const prevNode : Node<T> | null = null;
    const currentNode = this.head;
    while(index--) {
      prevNode = currentNode;
      currentNode = currentNode.next;
    }
    const { item } = currentNode;
    this.length -= 1;
    if (prevNode)
      prevNode.next = currentNode.next;
    return item;
  } // O(n)

  getLength() {
    return this.length;
  } // O(1)
}

export class ArrayQueue<T> {
  queue: T[];

  constructor(private queue: T[] = []) {}

  enqueue(item: T) {
    queue.push(item);
  } // O(n)

  dequeue() {
    if(this.queue.length <= 0) {
      throw new Error('queue is empty!');
    }
    const item = queue.shift();
    return item;
  } // O(n)

  pop(index: number) {
    if(index >= this.queue.length) {
      throw new Error('invalid index!');
    }
    const item = queue[index];
    this.queue = queue.filter((_, idx) => index !== idx);
    return item;
  } // O(n)

  getLength() {
    return this.queue.length;
  } // O(1)
}