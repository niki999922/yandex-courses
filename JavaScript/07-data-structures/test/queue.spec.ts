/* eslint-disable @typescript-eslint/no-explicit-any */

import { Queue } from '../src';

describe('Queue', () => {
  it('позволяет добавлять элементы', () => {
    const queue = new (Queue as any)();

    expect(queue.size).toBe(0);

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.size).toBe(2);
  });

  it('позволяет получать элемент по индексу', () => {
    const queue = new (Queue as any)();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.get(0)).toBe(2);
  });

  it('позволяет доставать элементы', () => {
    const queue = new (Queue as any)();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.size).toBe(2);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);

    expect(queue.size).toBe(0);
  });

  it('позволяет доставать элементы побольше', () => {
    const queue = new (Queue as any)();

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.enqueue(4);

    expect(queue.size).toBe(4);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);

    expect(queue.size).toBe(2);
  });
});
