class Node<T> {
  constructor(public value: T, public next?: Node<T>, public prev?: Node<T>) {}
}

class PriorityNode<T> {
  constructor(
    public value: T,
    public priority: Priority,
    public next?: PriorityNode<T>,
    public prev?: PriorityNode<T>
  ) {}
}

const enum Priority {
  Low = 1,
  Middle = 2,
  High = 3
}

export { Node, PriorityNode, Priority };
