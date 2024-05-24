import { generateMockData } from '../mock/events.js';
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
    const destinationsMap = new Map();
    destinations.forEach((destination) => {
      destinationsMap.set(destination.id, destination);
    });

    // в событиях переконвертируем офферы в Set и добавим информацию по точке назначения и офферам
    // events осталяем массивом т.к. есть сортировка и фильтрация
    this.#events = events.map((event) => {
      const { type, destination, offers: offerIds } = event;
      const offersMap = new Set(offerIds);
      const destinationInfo = destinationsMap.get(destination);
      const typeOffers = this.#offers.get(type);

      return { ...event, offers: offersMap, destinationInfo, typeOffers };
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
