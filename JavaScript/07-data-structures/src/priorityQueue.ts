import { PriorityNode as Node, Priority } from './node';

class PriorityQueue<T> {
  private head?: Node<T>;
  private tail?: Node<T>;
  private _size = 0;

  enqueue(element: T, priority: Priority): void {
    this._size++;
    if (this.head === undefined) {
      this.head = new Node(element, priority);
      this.tail = this.head;

      return;
    }

    if (priority === 1) {
      this.tail!.next = new Node(element, priority, undefined, this.tail);
      this.tail = this.tail!.next;

      return;
    }

    let current: Node<T> | undefined = this.tail!;
    while (current !== undefined && current.priority.valueOf() < priority.valueOf()) {
      current = current!.prev;
    }

    if (!current) {
      this.head.prev = new Node(element, priority, this.head);
      this.head = this.head.prev;
    } else {
      current.next = new Node(element, priority, current.next, current);
      current.next.next!.prev = current.next;
    }
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

export { PriorityQueue };
