'use strict';

/**
 * Складывает два целых числа
 * @param {Number} a Первое целое
 * @param {Number} b Второе целое
 * @throws {TypeError} Когда в аргументы переданы не числа
 * @returns {Number} Сумма аргументов
 */
function abProblem(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError("'a' and 'b' have to be Numbers");
  }
  return a + b;
}

/**
 * Определяет век по году
 * @param {Number} year Год, целое положительное число
 * @throws {TypeError} Когда в качестве года передано не число
 * @throws {RangeError} Когда год – отрицательное значение
 * @returns {Number} Век, полученный из года
 */
function centuryByYearProblem(year) {
  if (typeof year !== 'number') {
    throw new TypeError('Uncorrected format for year');
  }
  if (!Number.isInteger(year) || year <= 0) {
    throw new RangeError('Year have to be positive number');
  }
  return Math.ceil(year / 100);
}

/**
 * Переводит цвет из формата HEX в формат RGB
 * @param {String} hexColor Цвет в формате HEX, например, '#FFFFFF'
 * @throws {TypeError} Когда цвет передан не строкой
 * @throws {RangeError} Когда значения цвета выходят за пределы допустимых
 * @returns {String} Цвет в формате RGB, например, '(255, 255, 255)'
 */
function colorsProblem(hexColor) {
  if (typeof hexColor !== 'string') {
    throw new TypeError('hexColor have to be String');
  }
  if (!(hexColor.match(/^#[a-fA-F\d]{6}$/) || hexColor.match(/^#[a-fA-F\d]{3}$/))) {
    throw new RangeError('Uncorrected format HEX color');
  }

  let r, g, b;

  if (hexColor.match(/^#[a-fA-F\d]{6}$/)) {
    r = parseInt(hexColor.substr(1, 2), 16);
    g = parseInt(hexColor.substr(3, 2), 16);
    b = parseInt(hexColor.substr(5, 2), 16);
  } else {
    r = parseInt(hexColor.substr(1, 1) + hexColor.substr(1, 1), 16);
    g = parseInt(hexColor.substr(2, 1) + hexColor.substr(2, 1), 16);
    b = parseInt(hexColor.substr(3, 1) + hexColor.substr(3, 1), 16);
  }
  return `(${r}, ${g}, ${b})`;
}

/**
 * Находит n-ое число Фибоначчи
 * @param {Number} n Положение числа в ряде Фибоначчи
 * @throws {TypeError} Когда в качестве положения в ряде передано не число
 * @throws {RangeError} Когда положение в ряде не является целым положительным числом
 * @returns {Number} Число Фибоначчи, находящееся на n-ой позиции
 */
function fibonacciProblem(n) {
  if (typeof n !== 'number' || !Number.isInteger(n)) {
    throw new TypeError('Uncorrected type of parameter');
  }
  if (n <= 0) {
    throw new RangeError('n have to be positive');
  }

  const pair = { first: 0, second: 1 };

  for (let i = 0; i < n; i++) {
    const tmp = pair.first + pair.second;
    pair.first = pair.second;
    pair.second = tmp;
  }
  return pair.first;
}

/**
 * Транспонирует матрицу
 * @param {(Any[])[]} matrix Матрица размерности MxN
 * @throws {TypeError} Когда в функцию передаётся не двумерный массив
 * @returns {(Any[])[]} Транспонированная матрица размера NxM
 */
function matrixProblem(matrix) {
  if (!(Array.isArray(matrix) && matrix.length !== 0 && matrix.every(it => Array.isArray(it)))) {
    throw new TypeError('Uncorrected format of matrix');
  }

  const mSize = matrix[0].length;
  if (!matrix.every(it => it.length === mSize)) {
    throw new TypeError('Uncorrected format of matrix');
  }

  const newArray = [];

  for (let i = 0; i < matrix[0].length; i++) {
    newArray.push([]);
    for (let j = 0; j < matrix.length; j++) {
      newArray[i].push(matrix[j][i]);
    }
  }

  return newArray;
}

/**
 * Переводит число в другую систему счисления
 * @param {Number} n Число для перевода в другую систему счисления
 * @param {Number} targetNs Система счисления, в которую нужно перевести (Число от 2 до 36)
 * @throws {TypeError} Когда переданы аргументы некорректного типа
 * @throws {RangeError} Когда система счисления выходит за пределы значений [2, 36]
 * @returns {String} Число n в системе счисления targetNs
 */
function numberSystemProblem(n, targetNs) {
  if (typeof n !== 'number' || typeof targetNs !== 'number' || !Number.isInteger(targetNs)) {
    throw new TypeError('Uncorrected type arguments');
  }
  if (targetNs > 36 || targetNs < 2) {
    throw new RangeError('targetNs must be between [2, 36] and integer');
  }
  return n.toString(targetNs);
}

/**
 * Проверяет соответствие телефонного номера формату
 * @param {String} phoneNumber Номер телефона в формате '8–800–xxx–xx–xx'
 * @returns {Boolean} Если соответствует формату, то true, а иначе false
 */
function phoneProblem(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    throw new TypeError('Illegal argument exception');
  }
  return /^8-800-\d{3}-\d{2}-\d{2}$/.test(phoneNumber);
}

/**
 * Определяет количество улыбающихся смайликов в строке
 * @param {String} text Строка в которой производится поиск
 * @throws {TypeError} Когда в качестве аргумента передаётся не строка
 * @returns {Number} Количество улыбающихся смайликов в строке
 */
function smilesProblem(text) {
  if (typeof text !== 'string') {
    throw new TypeError('Argument have to be string');
  }
  return (text.match(/(\(-:|:-\))/g) || []).length;
}

/**
 * Определяет победителя в игре "Крестики-нолики"
 * Тестами гарантируются корректные аргументы.
 * @param {(('x' | 'o')[])[]} field Игровое поле 3x3 завершённой игры
 * @returns {'x' | 'o' | 'draw'} Результат игры
 */
function ticTacToeProblem(field) {
  function checkWin(person) {
    return (
      (field[0][0] === person && field[0][1] === person && field[0][2] === person) ||
      (field[1][0] === person && field[1][1] === person && field[1][2] === person) ||
      (field[2][0] === person && field[2][1] === person && field[2][2] === person) ||
      (field[0][0] === person && field[1][0] === person && field[2][0] === person) ||
      (field[0][1] === person && field[1][1] === person && field[2][1] === person) ||
      (field[0][2] === person && field[1][2] === person && field[2][2] === person) ||
      (field[0][0] === person && field[1][1] === person && field[2][2] === person) ||
      (field[0][2] === person && field[1][1] === person && field[2][0] === person)
    );
  }

  if (checkWin('x')) {
    return 'x';
  } else {
    if (checkWin('o')) {
      return 'o';
    } else {
      return 'draw';
    }
  }
}

function isNumber(value) {
  return typeof value !== 'number' || value instanceof 'Number';
}

module.exports = {
  abProblem,
  centuryByYearProblem,
  colorsProblem,
  fibonacciProblem,
  matrixProblem,
  numberSystemProblem,
  phoneProblem,
  smilesProblem,
  ticTacToeProblem
};
