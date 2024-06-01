import Observable from '../framework/observable.js';
import { updateItemByKey, addItem, deleteItemByKey } from '../utils/utils.js';
import { MessageType, UpdateType } from '../const.js';

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
      throw new Error('Error init events');
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
      throw new Error('Can\'t update event');
    }
  }

  async addEvent(updateType, event) {
    try {
      const response = await this.#eventsApiService.addEvent(this.#adaptToServer(event));
      const newEvent = this.#adaptToClient(response);

      addItem(this.#events, newEvent);

      this._notify(updateType, newEvent);
    } catch (err) {
      throw new Error('Can\'t add event');
    }
  }

  async deleteEvent(updateType, event) {
    try {
      await this.#eventsApiService.deleteEventById(event.id);

      deleteItemByKey(this.#events, event);

      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete event');
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
