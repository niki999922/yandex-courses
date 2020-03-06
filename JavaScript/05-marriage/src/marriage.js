'use strict';

const MALE = 'male';
const FEMALE = 'female';

function isFilter(object) {
  return object instanceof Filter;
}

/**
 * @typedef {Object} Friend
 * @property {string} name Имя
 * @property {'male' | 'female'} gender Пол
 * @property {boolean} best Лучший ли друг?
 * @property {string[]} friends Список имён друзей
 */

/**
 * Итератор по друзьям
 * @constructor
 * @param {Friend[]} friends Список друзей
 * @param {Filter} filter Фильтр друзей
 */
function Iterator(friends, filter) {
  if (!isFilter(filter)) {
    throw new TypeError('Parameter filter have to be Filter type');
  }

  const result = [];
  const setFriends = new Set();
  this.maxLevel = this.maxLevel || Infinity;
  let level = this.maxLevel;
  let bestFriends = friends
    .filter(friend => friend.best)
    .sort((first, second) => first.name.localeCompare(second.name));

  while (bestFriends.length > 0 && level > 0) {
    result.push(...bestFriends);

    let nextNames = [];
    for (const friend of bestFriends) {
      setFriends.add(friend.name);
      nextNames.push(...friend.friends);
    }
    nextNames = nextNames.filter(friend => !setFriends.has(friend));

    bestFriends = friends
      .filter(friend => nextNames.includes(friend.name))
      .sort((first, second) => first.name.localeCompare(second.name));
    --level;
  }
  this.filteredFriends = result.filter(filter.access);
  this.position = 0;
}

Iterator.prototype.done = function() {
  return this.position >= this.filteredFriends.length;
};

Iterator.prototype.next = function() {
  return this.done() ? null : this.filteredFriends[this.position++];
};

/**
 * Итератор по друзям с ограничением по кругу
 * @extends Iterator
 * @constructor
 * @param {Friend[]} friends Список друзей
 * @param {Filter} filter Фильтр друзей
 * @param {Number} maxLevel Максимальный круг друзей
 */
function LimitedIterator(friends, filter, maxLevel) {
  if (!isFilter(filter)) {
    throw new TypeError('Parameter filter have to be Filter type');
  }
  if (maxLevel > 0) {
    this.maxLevel = maxLevel;
    Iterator.call(this, friends, filter);
  } else {
    Iterator.call(this, [], filter);
  }
}

LimitedIterator.prototype = Object.create(Iterator.prototype, {
  constructor: {
    value: LimitedIterator
  }
});

/**
 * Фильтр друзей
 * @constructor
 */
function Filter() {}

Filter.prototype.access = friend => Boolean(friend);

/**
 * Фильтр друзей-парней
 * @extends Filter
 * @constructor
 */
function MaleFilter() {}

MaleFilter.prototype = Object.create(Filter.prototype, {
  constructor: { value: MaleFilter },
  access: { value: person => person.gender === MALE }
});

/**
 * Фильтр друзей-девушек
 * @extends Filter
 * @constructor
 */
function FemaleFilter() {}

FemaleFilter.prototype = Object.create(Filter.prototype, {
  constructor: { value: FemaleFilter },
  access: { value: person => person.gender === FEMALE }
});

module.exports = {
  Iterator,
  LimitedIterator,
  Filter,
  MaleFilter,
  FemaleFilter
};
