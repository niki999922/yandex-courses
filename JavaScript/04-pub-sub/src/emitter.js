'use strict';

/**
 * Сделано дополнительное задание: реализованы методы several и through.
 */
const isExtraTaskSolved = true;

function initIfAbsent(event, events) {
  if (event in events) {
    return;
  }
  events[event] = [];
}

/**
 * Получение нового Emitter'а
 * @returns {Object}
 */
function getEmitter() {
  const EVENT_SEPARATOR = '.';
  const events = {};

  return {
    /**
     * Подписка на событие
     * @param {string} event
     * @param {Object} context
     * @param {Function} handler
     */
    on: function(event, context, handler) {
      initIfAbsent(event, events);
      events[event].push({
        context: context,
        handler: handler
      });

      return this;
    },

    /**
     * Отписка от события
     * @param {string} event
     * @param {Object} context
     */
    off: function(event, context) {
      Object.keys(events).forEach(eventsKey => {
        if (eventsKey === event || eventsKey.indexOf(event + EVENT_SEPARATOR) === 0) {
          events[eventsKey] = events[eventsKey].filter(person => {
            return person.context !== context;
          });
        }
      });

      return this;
    },

    /**
     * Уведомление о событии
     * @param {string} event
     */
    emit: function(event) {
      while (event.length > 0) {
        if (event in events) {
          events[event].forEach(person => {
            person.handler.call(person.context);
          });
        }
        event = event.substr(0, event.lastIndexOf(EVENT_SEPARATOR));
      }

      return this;
    },

    /**
     * Подписка на событие с ограничением по количеству отправляемых уведомлений
     * @param {string} event
     * @param {Object} context
     * @param {Function} handler
     * @param {number} times Сколько раз отправить уведомление
     */
    several: function(event, context, handler, times) {
      if (times <= 0) {
        return this.on(event, context, handler);
      }

      return this.on(event, context, function() {
        if (times > 0) {
          handler.call(context);
          times--;
        }
      });
    },

    /**
     * Подписка на событие с ограничением по частоте отправки уведомлений
     * @param {string} event
     * @param {Object} context
     * @param {Function} handler
     * @param {number} frequency Как часто уведомлять
     */
    through: function(event, context, handler, frequency) {
      if (frequency <= 0) {
        return this.on(event, context, handler);
      }
      let times = 0;

      return this.on(event, context, function() {
        if (times === 0) {
          handler.call(context);
          times = frequency;
        }
        times--;
      });
    }
  };
}

module.exports = {
  getEmitter,

  isExtraTaskSolved
};
