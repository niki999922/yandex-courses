import { LinkedList } from './linkedList';
import { Node } from './node';

class Queue<T> extends LinkedList<T> {
  get(index: number): T | undefined {
    return super.get(this._size - 1 - index);
  }

  enqueue(element: T): void {
    this._size++;
    if (this.head === undefined) {
      this.head = new Node(element);
      this.tail = this.head;

      return;
    }
    this.tail!.next = new Node(element, undefined, this.tail);
    this.tail = this.tail!.next;
  }

  dequeue(): T | undefined {
    if (this._size === 0) {
      return undefined;
    }
    this._size--;
    if (this.head !== undefined) {
      const value = this.head.value;

      if (this._size) {
        this.head = this.head.next;
        this.head!.prev = undefined;
      } else {
        this.head = undefined;
        this.tail = undefined;
      }

      return value;
    }

    return undefined;
  }

  get size(): number {
    return this._size;
  }
}

export { Queue };
