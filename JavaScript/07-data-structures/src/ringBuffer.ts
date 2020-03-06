import { LinkedList } from './linkedList';
import { Node } from './node';

class RingBuffer<T> extends LinkedList<T> {
  private readonly _capacity: number;

  constructor(capacity: number) {
    super();
    this._capacity = capacity;
  }

  push(element: T): void {
    if (this._capacity === 0) {
      return;
    }
    if (this.head === undefined) {
      this.head = new Node(element);
      this.tail = this.head;
      this._size++;

      return;
    }

    if (this._size !== this._capacity) {
      this._size++;
      this.tail!.next = new Node(element, undefined, this.tail);
      this.tail = this.tail!.next;
    } else {
      this.tail!.next = new Node(element, undefined, this.tail);
      this.tail = this.tail!.next;
      this.head = this.head.next;
    }
  }

  static concat<T>(...buffers: RingBuffer<T>[]): RingBuffer<T> {
    const newRingBuffer = new RingBuffer<T>(
      buffers.reduce((sum, buffer) => sum + buffer.capacity, 0)
    );
    buffers.forEach(buffer => {
      for (let i = 0; i < buffer._size; i++) {
        newRingBuffer.push(buffer.get(i)!);
      }
    });

    return newRingBuffer;
  }

  get capacity(): number {
    return this._capacity;
  }
}

export { RingBuffer };
