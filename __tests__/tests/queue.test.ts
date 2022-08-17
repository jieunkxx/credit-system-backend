import { Queue } from '../../src/class/queue';
import { CustomError } from '../../src/class/common';

describe('queue', () => {
  test('constructor', () => {
    const queue = new Queue();
    expect(queue.head).toBe(null);
    expect(queue.tail).toBe(null);
    expect(queue.length).toBe(0);
    expect(queue.get_length()).toBe(0);
  });
  describe('enqueue', () => {
    test('enqueue single item', () => {
      const queue = new Queue();
      expect(queue.head).toBe(null);
      queue.enqueue({ item: 1 });
      expect(typeof queue.head).toBe('object');
      expect(typeof queue.tail).toBe('object');
      expect(queue.head?.item).toStrictEqual({ item: 1 });
      expect(queue.head?.next).toBe(null);
    });
    test('enqueue multiple item', () => {
      const queue = new Queue();
      expect(queue.head).toBe(null);
      queue.enqueue({ item: 1 });
      queue.enqueue({ item: 2 });
      queue.enqueue({ item: 3 });
      queue.enqueue({ item: 4 });
      queue.enqueue({ item: 5 });
      expect(typeof queue.head).toBe('object');
      expect(typeof queue.head?.next).toBe('object');
      expect(typeof queue.tail).toBe('object');
      expect(queue.head?.item).toStrictEqual({ item: 1 });
      expect(queue.head?.next?.item).toStrictEqual({ item: 2 });
      expect(queue.head?.next?.next?.item).toStrictEqual({ item: 3 });
      expect(queue.head?.next?.next?.next?.item).toStrictEqual({ item: 4 });
      expect(queue.head?.next?.next?.next?.next?.item).toStrictEqual({
        item: 5,
      });
      expect(queue.tail?.item).toStrictEqual({ item: 5 });
      expect(queue.tail?.next).toStrictEqual(null);
      expect(queue.get_length()).toBe(5);
    });
  });

  describe('dequeue', () => {
    test('dequeue from empty queue', () => {
      const queue = new Queue();
      try {
        queue.dequeue();
        expect(true).toBe(false);
      } catch (e) {
        expect(true).toBe(true);
      }
      expect(queue.get_length()).toBe(0);
      expect(queue.head).toBe(null);
    });
    test('dequeue single item', () => {
      const queue = new Queue();
      queue.enqueue({ item: 'a' });
      expect(queue.get_length()).toBe(1);
      expect(queue.head?.item).toStrictEqual({ item: 'a' });
      expect(queue.dequeue()).toStrictEqual({ item: 'a' });
      expect(queue.head).toBe(null);
      expect(queue.get_length()).toBe(0);
    });
    test('dequeue multiple item', () => {
      const queue = new Queue();
      queue.enqueue({ item: 'a' });
      queue.enqueue({ item: 'b' });
      queue.enqueue({ item: 'c' });
      queue.enqueue({ item: 'd' });
      queue.enqueue({ item: 'e' });
      expect(queue.get_length()).toBe(5);
      expect(queue.head?.item).toStrictEqual({ item: 'a' });
      expect(queue.dequeue()).toStrictEqual({ item: 'a' });
      expect(queue.head?.item).toStrictEqual({ item: 'b' });
      expect(queue.get_length()).toBe(4);
      queue.dequeue();
      queue.dequeue();
      queue.dequeue();
      expect(queue.get_length()).toBe(1);
      expect(queue.head?.item).toStrictEqual({ item: 'e' });
      expect(queue.dequeue()).toStrictEqual({ item: 'e' });
      expect(queue.head?.item).toStrictEqual(undefined);
      expect(queue.get_length()).toBe(0);
    });
  });
  describe('pop', () => {
    test('empty', () => {
      const queue = new Queue();
      try {
        queue.pop(0);
        expect(true).toBe(false);
      } catch (e) {
        expect(true).toBe(true);
      }
    });
    test('invalid index', () => {
      const queue = new Queue();
      queue.enqueue({ item: 'a' });
      queue.enqueue({ item: 'b' });
      try {
        queue.pop(3);
        expect(true).toBe(false);
      } catch (e) {
        expect(true).toBe(true);
      }
    });
    test('single', () => {
      const queue = new Queue();
      queue.enqueue({ item: 'a' });
      expect(queue.get_length()).toBe(1);
      expect(queue.pop(0)).toStrictEqual({ item: 'a' });
      expect(queue.get_length()).toBe(0);
    });
    test('multiple', () => {
      const queue = new Queue();
      queue.enqueue({ item: 1 });
      queue.enqueue({ item: 2 });
      queue.enqueue({ item: 3 });
      queue.enqueue({ item: 4 });
      queue.enqueue({ item: 5 });
      expect(queue.pop(1)).toStrictEqual({ item: 2 });
      expect(queue.pop(3)).toStrictEqual({ item: 5 });
      expect(queue.pop(2)).toStrictEqual({ item: 4 });
    });
  });
});
