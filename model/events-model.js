import Observable from '../framework/observable.js';
import { updateItemByKey, addItem, deleteItemByKey } from '../utils/utils.js';
import { generateMockData } from '../mock/events.js';
import { EVENT_TYPES } from '../const.js';

export default class EventsModel extends Observable {
  #destinations = [];
  #offers = new Map();
  #events = [];

  constructor() {
    super();

    const { destinations, offers, events } = generateMockData(EVENT_TYPES);

    this.#destinations = destinations;

    offers.forEach(({ type, offers: typeOffers }) => {
      this.#offers.set(type, typeOffers);
    });

    this.#events = events;
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

  updateEvent(updateType, updatedEvent) {
    updateItemByKey(this.#events, updatedEvent);

    this._notify(updateType, updatedEvent);
  }

  addEvent(updateType, newEvent) {
    //! временно новый id
    const id = this.#events.length + 1;
    newEvent.id = id;

    addItem(this.#events, newEvent);

    this._notify(updateType, newEvent);
  }

  deleteEvent(updateType, event) {
    deleteItemByKey(this.#events, event);

    this._notify(updateType);
  }
}
