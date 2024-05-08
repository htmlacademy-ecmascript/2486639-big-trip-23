import { EVENT_TYPES } from '../const.js';
import { generateMockData, getMockInfo } from '../mock/events.js';

export default class TripEventsModel {
  #destinations = [];
  #typeOffers = [];
  #events = [];

  constructor() {
    //! временно - скорее всего нужно сделать init()
    const { destinations, typeOffers, events } = generateMockData(EVENT_TYPES);
    this.#destinations = destinations;
    this.#typeOffers = typeOffers;
    this.#events = events;
  }

  get destinations() {
    return this.#destinations;
  }

  get typeOffers() {
    return this.#typeOffers;
  }

  get events() {
    return this.#events;
  }

  //! вычислить в TripInfoView
  get info() {
    return getMockInfo(this.#destinations); //! временно, потом собрать из событий
  }
}
