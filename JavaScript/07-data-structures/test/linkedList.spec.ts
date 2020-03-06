/* eslint-disable @typescript-eslint/no-explicit-any */

import { LinkedList, isExtraTaskSolved } from '../src';

describe('LinkedList', () => {
  it('позволяет добавлять элементы', () => {
    const linkedList = new (LinkedList as any)();

    expect(linkedList.size).toBe(0);

    linkedList.push(1);
    linkedList.push(2);

    expect(linkedList.size).toBe(2);
  });

  if (isExtraTaskSolved) {
    it('позволяет ходить по списку с помощью prev / next', () => {
      const linkedList = new (LinkedList as any)();

      linkedList.push(1);
      linkedList.push(2);

      expect(linkedList.next()).toBe(1);
      expect(linkedList.prev()).toBe(2);
      expect(linkedList.next()).toBe(1);
      expect(linkedList.prev()).toBe(2);
    });
  }

  it('позволяет доставать элементы', () => {
    const linkedList = new (LinkedList as any)();

    linkedList.push(1);
    linkedList.push(2);

    expect(linkedList.size).toBe(2);

    expect(linkedList.pop()).toBe(2);
    expect(linkedList.shift()).toBe(1);

    expect(linkedList.size).toBe(0);
  });

  it('мои тесты 1', () => {
    const linkedList = new (LinkedList as any)();

    linkedList.push(1);
    linkedList.push(2);
    linkedList.push(3);

    expect(linkedList.pop()).toBe(3);
    expect(linkedList.shift()).toBe(1);

    expect(linkedList.size).toBe(1);
  });

  it('мои тесты 2', () => {
    const linkedList = new (LinkedList as any)();

    linkedList.push(1);
    linkedList.push(2);
    linkedList.push(3);

    expect(linkedList.shift()).toBe(1);
    expect(linkedList.shift()).toBe(2);
    expect(linkedList.shift()).toBe(3);

    expect(linkedList.size).toBe(0);
  });
});
