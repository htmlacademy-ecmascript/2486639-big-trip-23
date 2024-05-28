import Observable from '../framework/observable.js';
import { updateItemByKey, addItem, deleteItemByKey } from '../utils/utils.js';
import { makeExtendedEvent } from '../utils/event.js';
import { generateMockData } from '../mock/events.js';
import { EVENT_TYPES } from '../const.js';

export default class EventsModel extends Observable {
  #destinationsByName = new Map();
  #offers = new Map();
  #events = [];

  constructor() {
    super();

    //! временно - скорее всего нужно сделать init()
    const { destinations, offers, events } = generateMockData(EVENT_TYPES);

    // подготовим дополнительный справочкик для конвертации событий
    //! возможно destinationsById придеться сохранить в this, т.к. после изменения или добавления сервере придеться перечитывать или оставить, что есть
    const destinationsById = new Map();

    destinations.forEach((destination) => {
      this.#destinationsByName.set(destination.name, destination);
      destinationsById.set(destination.id, destination);
    });

    // перекладываем в Map для удобства поиска по type
    offers.forEach(({ type, offers: typeOffers }) => {
      //! подумать может и сам массив (offers: typeOffers) на Map... но как по нему делать filter...
      this.#offers.set(type, typeOffers);
    });

    // в событиях переконвертируем офферы в Set и добавим информацию по точке назначения и офферам
    // events осталяем массивом т.к. есть сортировка и фильтрация
    this.#events = events.map((event) => makeExtendedEvent(event, this.#offers, destinationsById));
  }

  get destinations() {
    return this.#destinationsByName;
  }

  get offers() {
    return this.#offers;
  }

  get events() {
    return this.#events;
  }

  //! удалить, если не понадобиться, добавил по домашке 15 - Добавьте в модель для точек маршрута 2 метода: один для получения точек маршрута, другой для их записи.
  set events(newEvents) {
    this.#events = newEvents;
  }

  updateEvent(updateType, updatedEvent) {
    updateItemByKey(this.#events, updatedEvent);

    this._notify(updateType, updatedEvent);
  }

  addEvent(updateType, newEvent) {
    addItem(this.#events, newEvent);

    this._notify(updateType, newEvent);
  }

  deleteEvent(updateType, event) {
    deleteItemByKey(this.#events, event);

    this._notify(updateType);
  }
}
