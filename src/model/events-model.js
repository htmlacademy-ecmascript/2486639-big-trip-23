import { generateMockData } from '../mock/events.js';
import { getEventOffers } from '../utils/event.js';
import { EVENT_TYPES } from '../const.js';

export default class EventsModel {
  #destinations = new Map();
  #offers = new Map();
  #events = [];

  constructor() {
    //! временно - скорее всего нужно сделать init()
    const { destinations, offers, events } = generateMockData(EVENT_TYPES);

    destinations.forEach((destination) => {
      this.destinations.set(destination.name, destination);
    });

    // перекладываем в Map для удобства поиска по type
    offers.forEach(({ type, offers: typeOffers }) => {
      //! подумать может и сам массив (offers: typeOffers) на Map... но как по нему делать filter...
      this.#offers.set(type, typeOffers);
    });

    // подготовим дополнительный справочкик для конвертации событий
    const destinationsById = new Map();
    destinations.forEach((destination) => {
      destinationsById.set(destination.id, destination);
    });

    // в событиях переконвертируем офферы в Set и добавим полную информацию
    this.#events = events.map((event) => {
      const { type, destination } = event;
      const eventOfferIds = new Set(event.offers);
      const destinationInfo = destinationsById.get(destination);
      const typeOffers = this.#offers.get(type);
      const eventOffers = getEventOffers(typeOffers, eventOfferIds); // можно и eventOffers, но далее только вывод

      return { ...event, offers: eventOfferIds, destinationInfo, eventOffers, typeOffers };
    });
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
