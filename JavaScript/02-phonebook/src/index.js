'use strict';

const phonebook = require('./phonebook');

// Эти записи добавятся, вернется `true`
console.log(phonebook.add('5554440044', 'Григорий', 'grisha@example.com'));
console.log(phonebook.add('5552220022', 'Борис', 'boris@example.com'));
console.log(phonebook.add('5551110011', 'Алекс'));
console.log(phonebook.add('5553330033', 'Валерий', 'valera@example.com'));
console.log(phonebook.add('5553330033', 'Валерий', 'valera@example.com'));

// Эти записи не добавятся, вернется `false`
console.log(phonebook.add('3330033', 'Неизвестный', 'unknown@example.com'));
console.log(phonebook.add('5551110011', 'Алексей'));
console.log(phonebook.add('5555550055'));

// Обновление ранее добавленных записей
console.log(phonebook.update('5551110011', 'Алексей', 'alex@example.com'));
console.log(phonebook.update('5553330033', 'Валерий'));

// В следующих примерах вернутся все записи
console.info(phonebook.find('*'));
console.info(phonebook.find('555'));
// В обоих случаях вывод будет следующий
// [
//   'Алексей, +7 (555) 111-00-11, alex@example.com',
//   'Борис, +7 (555) 222-00-22, boris@example.com',
//   'Валерий, +7 (555) 333-00-33',
//   'Григорий, +7 (555) 444-00-44, grisha@example.com'
// ]

// Удаление записей, содержащих '@', вернется `3`
console.info(phonebook.findAndRemove('@'));
console.info(phonebook.find('*'));

if (phonebook.isExtraTaskSolved) {
  const dsv = [
    'Борис;5552220022;boris@example.com',
    'Григорий;5554440044;grisha@example.com',
    'Алексей;5551110011;alex@example.com',
    'Валерий;5553330033;valera@example.com',
    'Неизвестный;3330033;unknown@example.com'
  ].join('\n');

  // Импорт записей из dsv, вернется `4`
  phonebook.importFromDsv(dsv);
}

console.log('\ntests 1:___________\n');
console.log(phonebook.add('5551110011', 'Алексей', 'alex@example.com'));
console.log(phonebook.add('5552220044', 'Григорий', 'grisha@example.com'));
console.log(phonebook.add('5553330033', 'Валерий'));
console.log(phonebook.add('5552220022', 'Борис', 'boris@example.com'));
console.log(phonebook.find('*'));

phonebook.find('*').forEach(el => phonebook.findAndRemove(el.substr(0, 3)));

console.log('\ntests 2:___________\n');
console.log(phonebook.add('5521110011', 'Алексей', 'alex@example.com'));
console.log(phonebook.add('5552120044', 'Григорий', 'grisha@example.com'));
console.log(phonebook.add('5552220044', 'Григорий', 'grisha@example.com'));
console.log(phonebook.add('55533300233', 'Валерий'));
console.log(phonebook.add('5553330asd033', 'Валерий'));
console.log(phonebook.add('5552220022', 'Бййцурис', 'borismax@example.com'));
console.log(phonebook.add('5592220022', 'Борис', 'boris@example.com'));
console.log(phonebook.find('33'));

phonebook.find('*').forEach(el => phonebook.findAndRemove(el.substr(0, 3)));

console.log('\ntests 3:___________\n');
console.log(phonebook.add('5521110011', 'Алексей', 'alex@example.com'));
console.log(phonebook.add('5552120044', 'Яригорий', 'grisha@example.com'));
console.log(phonebook.add('5552220044', 'Еригорий', 'grisha@example.com'));
console.log(phonebook.add('55533300233', 'Валерий'));
console.log(phonebook.add('5553330asd033', 'Валерий'));
console.log(phonebook.add('5552220022', 'Бййцурис', 'borismax@example.com'));
console.log(phonebook.add('5592220022', 'Борис', 'boris@example.com'));
console.log(phonebook.find('ий'));

phonebook.find('*').forEach(el => phonebook.findAndRemove(el.substr(0, 3)));

console.log('\ntests 4:___________\n');
console.log(phonebook.add('5521110011', 'Алексей', 'alex@example.com'));
console.log(phonebook.add('5552120044', 'Яригорий', 'grisha@example.com'));
console.log(phonebook.add('5552220044', 'Еригорий', 'grisha@example.com'));
console.log(phonebook.add('55533300233', 'Валерий'));
console.log(phonebook.add('5553330asd033', 'Валерий'));
console.log(phonebook.add('5552220022', 'Бййцурис', 'borismax@example.com'));
console.log(phonebook.add('5592220022', 'Борис', 'boris@example.com'));
console.log(phonebook.find('@'));

phonebook.find('*').forEach(el => phonebook.findAndRemove(el.substr(0, 3)));

console.log('\ntests 5:___________\n');
console.log(phonebook.add('5521110011', 'Алексей', 'alex@example.com'));
console.log(phonebook.add('5552120044', 'Яригорий', 'grisha@example.com'));
console.log(phonebook.add('5552220044', 'Еригорий', 'grisha@example.com'));
console.log(phonebook.add('55533300233', 'Валерий'));
console.log(phonebook.add('5553330asd033', 'Валерий'));
console.log(phonebook.add('5552220022', 'Бййцурис', 'borismax@example.com'));
console.log(phonebook.add('5592220022', 'Борис', 'boris@example.com'));
console.log(phonebook.findAndRemove('00'));

phonebook.find('*').forEach(el => phonebook.findAndRemove(el.substr(0, 3)));

console.log('\ntests 6:___________\n');
console.log(phonebook.add('5521110011', 'Алексей', 'alex@example.com'));
console.log(phonebook.add('5552120044', 'Яригорий', 'grisha@example.com'));
console.log(phonebook.add('5552220044', 'Еригорий', 'grisha@example.com'));
console.log(phonebook.add('55533300233', 'Валерий'));
console.log(phonebook.add('5553330asd033', 'Валерий'));
console.log(phonebook.add('5552220022', 'Бййцурис', 'borismax@example.com'));
console.log(phonebook.add('5592220022', 'Борис', 'boris@example.com'));
console.log(phonebook.findAndRemove('борис'));

phonebook.find('*').forEach(el => phonebook.findAndRemove(el.substr(0, 3)));

console.log('\ntests 7:___________\n');
console.log(phonebook.add('5521110011', 'Алексей', 'alex@example.com'));
console.log(phonebook.update('5552120044', 'Яригорий', 'grisha@example.com'));
console.log(phonebook.add('5552220044', 'Еригорий', 'grisha@example.com'));
console.log(phonebook.update('5552220044', 'Еригорий', 'grisha@example.com'));
console.log(phonebook.add('55533300233', 'Валерий'));
console.log(phonebook.add('5553330asd033', 'Валерий'));
console.log(phonebook.update('5553330asd033', 'Валерий'));
console.log(phonebook.add('5552220022', 'Бййцурис', 'borismax@example.com'));
console.log(phonebook.add('5592220022', 'Борис', 'boris@example.com'));
console.log(phonebook.update('5592220022', 'Борис', 'boris@example.com'));

phonebook.find('*').forEach(el => phonebook.findAndRemove(el.substr(0, 3)));

console.log('\n\nGlobal TESTS 1:___________\n');
console.log(phonebook.add('5521110011', 'Алексей', 'alex@example.com'));
console.log(phonebook.add('5521110011', 'Алексей', 'alex@example.com'));
console.log(phonebook.add('5521110011', 'Алексей', 'alex@example.com'));
console.log(phonebook.add('5521110011', 'Алексей', 'alex@example.com'));
console.log(phonebook.add('5521110011', 'Алексей', 'alex@example.com'));
