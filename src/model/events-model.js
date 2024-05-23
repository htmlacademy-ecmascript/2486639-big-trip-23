import { generateMockData } from '../mock/events.js';
import { EVENT_TYPES } from '../const.js';

export default class EventsModel {
  #destinations = [];
  #offers = new Map();
  #events = [];

  constructor() {
    //! временно - скорее всего нужно сделать init()
    const { destinations, offers, events } = generateMockData(EVENT_TYPES);

    this.#destinations = destinations;
    // перекладываем в Map для удобства поиска по type
    offers.forEach(({ type, offers: typeOffers }) => {
      this.#offers.set(type, { name, offers: typeOffers });
    });
    // в событиях переконвертируем офферы в Set
    this.#events = events.map((event) => ({ ...event, offers: new Set(event.offers) }));
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get events() {
    return this.#events;
  }
}
