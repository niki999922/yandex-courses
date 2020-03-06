type CellArray<T> = Array<Pair<T>>;

const TABLE_CAPACITY = 1_024;
const HASH_INIT = 313;
const HASH_SHIFT = 2;

class Pair<T> {
  constructor(public key: object | string, public value: T) {}
}

class HashTable<T> {
  private table: CellArray<T>[];
  private _size = 0;

  constructor() {
    this.table = new Array<CellArray<T>>(TABLE_CAPACITY);
  }

  get(key: object | string): T | undefined {
    return this.table[this.hashCode(key)]?.find(it => it.key === key)?.value;
  }

  put(key: object | string, value: T): void {
    const index = this.hashCode(key);

    if (!this.table[index]) {
      this.table[index] = new Array<Pair<T>>();
    }

    this.table[index].push(new Pair(key, value));
    this._size++;
  }

  clear(): void {
    this.table = new Array<CellArray<T>>(TABLE_CAPACITY);
    this._size = 0;
  }

  get size(): number {
    return this._size;
  }

  private hashCode(object: object | string): number {
    const jsonString = typeof object === 'string' ? object : JSON.stringify(object);
    let hashSum = HASH_INIT;

    for (const c of jsonString) {
      hashSum = (hashSum + (hashSum << HASH_SHIFT) + Number(c.charCodeAt(0))) % TABLE_CAPACITY;
    }

    return Math.abs(hashSum);
  }
}

export { HashTable };
