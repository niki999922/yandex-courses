const WEEKDAY = 1440;
const MINUTES_IN_HOUR = 60;

const weekdayMapRaw = Object.freeze({
  ПН: 0,
  ВТ: WEEKDAY,
  СР: WEEKDAY * 2,
  ЧТ: WEEKDAY * 3,
  ПТ: WEEKDAY * 4,
  СБ: WEEKDAY * 5,
  ВС: WEEKDAY * 6
});

const weekdayMapFromRaw = Object.freeze({
  0: 'ПН',
  1: 'ВТ',
  2: 'СР',
  3: 'ЧТ',
  4: 'ПТ',
  5: 'СБ',
  6: 'ВС'
});

const eventsComparator = (first, second) => {
  return first.fromTime - second.fromTime;
};

function dayWeekAndTimeToRaw(value) {
  const [, weekday, time] = value.match(/^([А-Я]{2}) (.*)$/);

  return weekdayMapRaw[weekday] + timeToRaw(time);
}

function dayWeekAndTimeFromRaw(time) {
  return {
    day: weekdayMapFromRaw[Math.floor(time / WEEKDAY)],
    hour: Math.floor(time / MINUTES_IN_HOUR) % 24,
    minute: time % MINUTES_IN_HOUR
  };
}

function timeToRaw(time) {
  const tmp = time.match(/^(\d{2}):(\d{2})\+(\d+)$/);

  return Number(tmp[1]) * MINUTES_IN_HOUR + Number(tmp[2]) - Number(tmp[3]) * MINUTES_IN_HOUR;
}

/**
 * В зависимости от взаимного расположения интервалов времени, возвращает соответсвующую цифру
 *
 * @param event
 * @param robber
 * @returns Number
 */
function whichCase(event, robber) {
  if (event.fromTime <= robber.fromTime && robber.toTime <= event.toTime) {
    return 0;
  }
  if (
    robber.fromTime <= event.fromTime &&
    robber.toTime <= event.toTime &&
    event.fromTime <= robber.toTime
  ) {
    return 1;
  }
  if (
    event.fromTime <= robber.fromTime &&
    event.toTime <= robber.toTime &&
    robber.fromTime <= event.toTime
  ) {
    return 2;
  }
  if (robber.fromTime <= event.fromTime && event.toTime <= robber.toTime) {
    return 3;
  }

  return 4;
}

/**
 *  Принимает на вход массив с интервалами времени и нарезает каждый из них в зависимости от
 *  взаиморасположения интервала с интревалом robber
 * @param events array of time
 * @param robber robber time interval
 * @returns array corrected array of events
 */
function eraseTime(events, robber) {
  const newEvents = [];

  events.forEach(event => {
    switch (whichCase(event, robber)) {
      case 0:
        newEvents.push(
          {
            fromTime: event.fromTime,
            toTime: robber.fromTime
          },
          {
            fromTime: robber.toTime,
            toTime: event.toTime
          }
        );
        break;
      case 1:
        newEvents.push({
          fromTime: robber.toTime,
          toTime: event.toTime
        });
        break;
      case 2:
        newEvents.push({
          fromTime: event.fromTime,
          toTime: robber.fromTime
        });
        break;
      case 3:
        break;
      default:
        newEvents.push(event);
    }
  });

  return newEvents.sort(eventsComparator);
}

/**
 * Из events оставляет такие интервалы, что event.toTime - event.fromTime >= duration
 *
 * @param events
 * @param duration
 * @returns Array array without corrected intervals
 */
function normalizeIntervals(events, duration) {
  return events.filter(event => {
    return event.toTime - event.fromTime >= duration;
  });
}

function formatEvent(str, obj) {
  return str
    .replace(/%DD/g, obj.day)
    .replace(/%HH/g, obj.hour.toString().padStart(2, '0'))
    .replace(/%MM/g, obj.minute.toString().padStart(2, '0'));
}

module.exports = {
  dayWeekAndTimeToRaw,
  timeToRaw,
  eraseTime,
  normalizeIntervals,
  dayWeekAndTimeFromRaw,
  formatEvent,

  WEEKDAY,
  MINUTES_IN_HOUR
};
