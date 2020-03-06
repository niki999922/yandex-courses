'use strict';

const time = require('./time');
const { WEEKDAY, MINUTES_IN_HOUR } = require('./time');

const isExtraTaskSolved = true;

/**
 * @param {Object} scheduleBand Расписание Банды
 * @param {number} duration Время на ограбление в минутах
 * @param {Object} workingHours Время работы банка
 * @param {string} workingHours.from Время открытия, например, "10:00+5"
 * @param {string} workingHours.to Время закрытия, например, "18:00+5"
 * @returns {Object}
 */
function getAppropriateMoment(scheduleBand, duration, workingHours) {
  let events = [];
  const shift = Number(workingHours.from.match(/^\d{2}:\d{2}\+(\d+)$/)[1]);

  for (let i = 0; i < 3; i++) {
    events.push({
      fromTime: time.timeToRaw(workingHours.from) + i * WEEKDAY,
      toTime: time.timeToRaw(workingHours.to) + i * WEEKDAY
    });
  }
  Object.values(scheduleBand).forEach(robber => {
    robber.forEach(robberTime => {
      events = time.eraseTime(events, {
        fromTime: time.dayWeekAndTimeToRaw(robberTime.from),
        toTime: time.dayWeekAndTimeToRaw(robberTime.to)
      });
    });
  });

  events = time.normalizeIntervals(events, duration);

  return {
    /**
     * Есть ли свободное время
     * @returns {boolean}
     */
    exists() {
      return events.length !== 0;
    },

    /**
     * Возвращает отформатированную строку с часами
     * для ограбления во временной зоне банка
     * %HH - часы, %MM - минуты, %DD - день недели
     * @param {string} template
     * @returns {string} строка в нужном формате
     */
    format(template) {
      if (!this.exists()) {
        return '';
      }

      return time.formatEvent(
        template,
        time.dayWeekAndTimeFromRaw(events[0].fromTime + MINUTES_IN_HOUR * shift)
      );
    },

    /**
     * Попробовать найти часы для ограбления через 30 минут после последего поулченного времени
     * @returns {boolean}
     */
    tryLater() {
      if (!this.exists()) {
        return false;
      }

      let newEvents = time.eraseTime(events, {
        fromTime: events[0].fromTime,
        toTime: events[0].fromTime + 30
      });
      newEvents = time.normalizeIntervals(newEvents, duration);

      if (newEvents.length === 0) {
        return false;
      }
      events = newEvents;

      return true;
    }
  };
}

module.exports = {
  getAppropriateMoment,

  isExtraTaskSolved
};
