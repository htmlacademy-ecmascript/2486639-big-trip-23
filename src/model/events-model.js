import Observable from '../framework/observable.js';
import { updateItemByKey, addItem, deleteItemByKey } from '../utils/common.js';
import { UpdateType } from '../const.js';

const ErrorMessage = {
  INIT: 'Error init events',
  UPDATE: 'Can\'t update event',
  ADD: 'Can\'t add event',
  DELETE: 'Can\'t delete event'
};

export default class EventsModel extends Observable {
  #eventsApiService = null;
  #destinations = [];
  #offers = new Map();
  #events = [];

  constructor({ eventsApiService }) {
    super();

    this.#eventsApiService = eventsApiService;
  }

  async init() {
    try {
      this.#destinations = await this.#eventsApiService.destinations;

      const offers = await this.#eventsApiService.offers;
      offers.forEach(({ type, offers: typeOffers }) => {
        this.#offers.set(type, typeOffers);
      });

      const events = await this.#eventsApiService.events;
      this.#events = events.map(this.#adaptToClient);
      this._notify(UpdateType.INIT);
    } catch (error) {
      throw new Error(ErrorMessage.INIT);
    }
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

  async updateEvent(updateType, event) {
    try {
      const response = await this.#eventsApiService.updateEvent(this.#adaptToServer(event));
      const updatedEvent = this.#adaptToClient(response);

      updateItemByKey(this.#events, updatedEvent);

      this._notify(updateType, updatedEvent);
    } catch (error) {
      throw new Error(ErrorMessage.UPDATE);
    }
  }

  async addEvent(updateType, event) {
    try {
      const response = await this.#eventsApiService.addEvent(this.#adaptToServer(event));
      const newEvent = this.#adaptToClient(response);

      addItem(this.#events, newEvent);

      this._notify(updateType, newEvent);
    } catch (err) {
      throw new Error(ErrorMessage.ADD);
    }
  }

  async deleteEvent(updateType, event) {
    try {
      await this.#eventsApiService.deleteEventById(event.id);

      deleteItemByKey(this.#events, event);

      this._notify(updateType);
    } catch (err) {
      throw new Error(ErrorMessage.DELETE);
    }
  }

  #adaptToClient(event) {
    const adaptedEvent = {
      ...event,
      basePrice: event['base_price'],
      dateFrom: event['date_from'],
      dateTo: event['date_to'],
      isFavorite: event['is_favorite']
    };

    delete adaptedEvent['base_price'];
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
  }

  #adaptToServer(event) {
    const { basePrice, dateFrom, dateTo, isFavorite } = event;
    const adaptedEvent = {
      ...event,
      ['base_price']: basePrice,
      ['date_from']: dateFrom,
      ['date_to']: dateTo,
      ['is_favorite']: isFavorite
    };

    delete adaptedEvent.basePrice;
    delete adaptedEvent.dateFrom;
    delete adaptedEvent.dateTo;
    delete adaptedEvent.isFavorite;

    return adaptedEvent;
  }
}
