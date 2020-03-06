'use strict';

global.fetch = require('node-fetch');

/**
 * @typedef {object} TripItem Город, который является частью маршрута.
 * @property {number} geoid Идентификатор города
 * @property {number} day Порядковое число дня маршрута
 */

class TripBuilder {
  static Day = {
    SUNNY: 1,
    CLOUDY: 2
  };


  constructor(geoIds) {
    this.trip = [];
    this.geoIds = geoIds;
    this.cityResidence = Number.MAX_VALUE;
    // this.Day = {
    //   SUNNY: 1,
    //   CLOUDY: 2
    // };
  }

  /**
   * Метод, добавляющий условие наличия в маршруте
   * указанного количества солнечных дней
   * Согласно API Яндекс.Погоды, к солнечным дням
   * можно приравнять следующие значения `condition`:
   * * `clear`;
   * * `partly-cloudy`.
   * @param {number} daysCount количество дней
   * @returns {object} Объект планировщика маршрута
   */
  sunny(daysCount) {
    for (let i = 0; i < daysCount; i++) {
      this.trip.push({
        type: this.Day.SUNNY
      });
    }

    return this;
  }

  /**
   * Метод, добавляющий условие наличия в маршруте
   * указанного количества пасмурных дней
   * Согласно API Яндекс.Погоды, к солнечным дням
   * можно приравнять следующие значения `condition`:
   * * `cloudy`;
   * * `overcast`.
   * @param {number} daysCount количество дней
   * @returns {object} Объект планировщика маршрута
   */
  cloudy(daysCount) {
    for (let i = 0; i < daysCount; i++) {
      this.trip.push({
        type: this.Day.CLOUDY
      });
    }

    return this;
  }

  /**
   * Метод, добавляющий условие максимального количества дней.
   * @param {number} daysCount количество дней
   * @returns {object} Объект планировщика маршрута
   */
  max(daysCount) {
    this.cityResidence = Math.min(daysCount, this.cityResidence);

    return this;
  }

  /**
   * Метод, возвращающий Promise с планируемым маршрутом.
   * @returns {Promise<TripItem[]>} Список городов маршрута
   */
  build() {
    return this.buildTrip();
  }

  async buildTrip() {
    const tripResidence = this.trip.length;
    if (tripResidence > 7) {
      throw new Error('Не могу построить маршрут!');
    }

    if (tripResidence === 0) {
      return [];
    }

    const citiesInformation = await this.getWeatherFrom();

    const closeCities = [];
    const resultTrip = [];
    let currentDay = 0;
    let update = true;

    while (update && currentDay < tripResidence) {
      update = false;
      citiesInformation.forEach(city => {
        if (!closeCities.includes(city.geoId) && city.conditions[currentDay]) {
          for (let i = 0; i < this.cityResidence; i++) {
            if (
              currentDay !== tripResidence &&
              city.conditions[currentDay] === this.trip[currentDay].type
            ) {
              if (!update) {
                closeCities.push(city.geoId);
              }
              update = true;
              currentDay++;

              resultTrip.push({ geoid: city.geoId, day: currentDay });
            } else {
              break;
            }
          }
        }
      });
    }

    if (currentDay !== tripResidence) {
      throw new Error('Не могу построить маршрут!');
    }

    return resultTrip;
  }

  getWeatherFrom() {
    return Promise.all(this.geoIds.map(geoId => this.fetchWeatherFromYandexAPI(geoId))).then(
      jsons =>
        jsons.reduce((arrayCities, currentCity) => {
          arrayCities.push(currentCity);

          return arrayCities;
        }, [])
    );
  }

  fetchWeatherFromYandexAPI(geoId) {
    return global
      .fetch(`https://api.weather.yandex.ru/v1/forecast?hours=false&limit=7&geoid=${geoId}`)
      .then(response => response.json())
      .then(json => {
        return {
          geoId: json['geo_object']['locality']['id'],
          conditions: json['forecasts'].map(day => {
            const condition = day['parts']['day_short']['condition'];
            if (['cloudy', 'overcast'].includes(condition)) {
              return this.Day.CLOUDY;
            }
            if (['clear', 'partly-cloudy'].includes(condition)) {
              return this.Day.SUNNY;
            }

            return undefined;
          })
        };
      });
  }
}

/**
 * Фабрика для получения планировщика маршрута.
 * Принимает на вход список идентификаторов городов, а
 * возвращает планировщик маршрута по данным городам.
 *
 * @param {number[]} geoIds Список идентификаторов городов
 * @returns {TripBuilder} Объект планировщика маршрута
 * @see https://yandex.ru/dev/xml/doc/dg/reference/regions-docpage/
 */
function planTrip(geoIds) {
  return new TripBuilder(geoIds);
}

module.exports = {
  planTrip
};
