import Observable from '../framework/observable.js';
import { updateItemByKey, addItem, deleteItemByKey } from '../utils/utils.js';
import { generateMockData } from '../mock/events.js';
import { EVENT_TYPES } from '../const.js';

export default class EventsModel extends Observable {
  #destinationsByName = new Map();
  #destinationsById = new Map();
  #offers = new Map();
  #events = [];

  constructor() {
    super();

    const { destinations, offers, events } = generateMockData(EVENT_TYPES);

    destinations.forEach((destination) => {
      this.#destinationsByName.set(destination.name, destination);
      this.#destinationsById.set(destination.id, destination);
    });

    offers.forEach(({ type, offers: typeOffers }) => {
      this.#offers.set(type, typeOffers);
    });

    this.#events = events;
  }

  get destinations() {
    return this.#destinationsByName;
  }

  get destinationsById() {
    return this.#destinationsById;
  }

  get destinationNames() {
    return [...this.#destinationsByName.keys()];
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
