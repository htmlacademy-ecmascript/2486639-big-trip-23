import { generateMockData } from '../mock/events.js';
import { EVENT_TYPES } from '../const.js';

export default class EventsModel {
  #destinations = new Map();
  #offers = new Map();
  #events = new Map();

  constructor() {
    //! временно - скорее всего нужно сделать init()
    const { destinations, offers, events } = generateMockData(EVENT_TYPES);
    destinations.forEach(({ id, name, description, pictures }) => {
      this.#destinations.set(id, { name, description, pictures });
    });
    offers.forEach(({ type, offers: typeOffers }) => {
      this.#offers.set(type, { name, offers: typeOffers });
    });

    events.forEach((event) => {
      //! может есть смыл добавить, что то постоянно вычисляемое...
      //! например durationMinutes, для использования при сортироке, подсчета Info
      this.#events.set(event.id, event); // весь event, с id, иначе id дополнительно доставать? перекладывать в event или хранить в перезенторе
    });
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get events() {
    //! временно
    return new Map(this.#events);
  }
}
