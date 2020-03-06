import { Node } from './node';

class LinkedList<T> {
  protected head?: Node<T>;
  protected tail?: Node<T>;
  protected personPointer?: Node<T>;
  protected _size = 0;

  get(index: number): T | undefined {
    if (index < 0 || index >= this._size) {
      return undefined;
    }
    if (index === 0) {
      return this.head!.value;
    }
    if (index === this._size - 1) {
      return this.tail!.value;
    }

    let current: Node<T> | undefined = this.head!;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }

    return current!.value;
  }

  push(element: T): void {
    this._size++;
    if (this.head === undefined) {
      this.head = new Node(element);
      this.tail = this.head;
      this.personPointer = this.head;

      return;
    }
    const oldTail = this.tail!;
    const newTail = new Node(element, undefined, this.tail);

    oldTail.next = newTail;
    this.tail = newTail;
  }

  unshift(element: T): void {
    this._size++;
    if (this.head === undefined) {
      this.head = new Node(element);
      this.tail = this.head;
      this.personPointer = this.head;

      return;
    }
    this.head.prev = new Node(element, this.head);
    this.head = this.head.prev;
  }

  pop(): T | undefined {
    if (this._size === 0) {
      return undefined;
    }
    if (this.tail === this.personPointer) {
      this.prev();
    }
    this._size--;
    if (this.tail !== undefined) {
      const value = this.tail.value;

      if (this._size) {
        this.tail = this.tail.prev;
        this.tail!.next = undefined;
      } else {
        this.head = undefined;
        this.tail = undefined;
        this.personPointer = undefined;
      }

      return value;
    }
    //never here

    return undefined;
  }

  shift(): T | undefined {
    if (this._size === 0) {
      return undefined;
    }
    if (this.head === this.personPointer) {
      this.next();
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
        this.personPointer = undefined;
      }

      return value;
    }
    //never here

    return undefined;
  }

  next(): T | undefined {
    if (this._size === 0) {
      return undefined;
    }

    const value = this.personPointer?.value;
    if (this.personPointer?.next) {
      this.personPointer = this.personPointer.next;
    }

    return value;
  }

  prev(): T | undefined {
    if (this._size === 0) {
      return undefined;
    }

    const value = this.personPointer?.value;
    if (this.personPointer?.prev) {
      this.personPointer = this.personPointer.prev;
    }

    return value;
  }

  get size(): number {
    return this._size;
  }
}

export { LinkedList };
