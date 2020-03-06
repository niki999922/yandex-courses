'use strict';

const isExtraTaskSolved = true;
const util = require('./util');

const phoneBook = new Map();

/**
 * Добавление записи в телефонную книгу
 * @param {string} phone
 * @param {string} [name]
 * @param {string} [email]
 * @returns {boolean}
 */
function add(phone, name, email) {
  if (
    !util.isPhone(phone) ||
    !util.isEmail(email) ||
    !util.isNonZeroString(name) ||
    phoneBook.has(phone) ||
    !/^\d{10}$/.test(phone)
  ) {
    return false;
  }
  phoneBook.set(phone, { name: name, email: email || undefined });

  return true;
}

/**
 * Обновление записи в телефонной книге
 * @param {string} phone
 * @param {string} [name]
 * @param {string} [email]
 * @returns {boolean}
 */
function update(phone, name, email) {
  const contact = phoneBook.get(phone);
  if (!contact || !util.isNonZeroString(name)) {
    return false;
  }

  contact['email'] = email || undefined;
  contact['name'] = name;

  return true;
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {string} query
 * @returns {string[]}
 */
function find(query) {
  if (!util.isNonZeroString(query)) {
    return [];
  }

  if (query === '*') {
    const newArray = [];
    for (const [key, contact] of phoneBook) {
      newArray.push(`${contact.name}${util.convertPhoneEmail(key, contact.email)}`);
    }

    return newArray.sort();
  }

  const newArray = [];
  for (const [key, contact] of phoneBook) {
    if (
      contact.name.includes(query) ||
      (contact.email && contact.email.includes(query)) ||
      key.includes(query)
    ) {
      newArray.push(`${contact.name}${util.convertPhoneEmail(key, contact.email)}`);
    }
  }
  newArray.sort();

  return newArray;
}

/**
 * Удаление записей по запросу из телефонной книги
 * @param {string} query
 * @returns {number}
 */
function findAndRemove(query) {
  if (!util.isNonZeroString(query)) {
    return 0;
  }
  let count = 0;
  if (query === '*') {
    count = phoneBook.size;
    phoneBook.clear();

    return count;
  }
  for (const [key, contact] of phoneBook) {
    if (
      contact.name.includes(query) ||
      (contact.email && contact.email.includes(query)) ||
      key.includes(query)
    ) {
      phoneBook.delete(key);
      count++;
    }
  }

  return count;
}

/**
 * Импорт записей из dsv-формата
 * @param {string} dsv
 * @returns {number} Количество добавленных и обновленных записей
 */
function importFromDsv(dsv) {
  let count = 0;
  dsv.split('\n').forEach(el => {
    const [name, phone, email] = el.split(';');
    if (add(phone, name, email) || update(phone, name, email)) {
      count++;
    }
  });

  return count;
}

module.exports = {
  add,
  update,
  find,
  findAndRemove,
  importFromDsv,

  isExtraTaskSolved
};
