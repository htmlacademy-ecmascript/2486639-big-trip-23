import { render } from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import EventFormView from '../view/event-form-view.js';
import MessageView from '../view/message-view.js';
import { EVENT_TYPES, Messages } from '../const.js';

export default class ContentPresenter {
  #containerElement = null;
  #eventsModel = null;

  #events = [];

  #eventsListComponent = new EventsListView();

  constructor({ containerElement, eventsModel }) {
    this.#containerElement = containerElement;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events]; //! временно. сохранить то что будет диспользоваться в других методах.

    this.#renderEventsList();
  }

  #renderEventsList() {
    const eventsListElement = this.#eventsListComponent.element;
    const events = this.#events;
    const { destinationNames } = this.#eventsModel;

    //! временно выводим форму редактирования
    const event = events[0];
    const destination = this.#eventsModel.getDestinationById(event.destination); //? где же правильней собирать данные? может во View?
    const offers = this.#eventsModel.getAvailableEventOffers(event);
    render(new EventFormView(event, EVENT_TYPES, destinationNames, destination, offers), eventsListElement);
    //! временно выводим несколько событий
    for (let i = 1; i < events.length; i++) {
      this.#renderEventItem(events[i], eventsListElement);
    }

    if (events.length) {
      render(this.#eventsListComponent, this.#containerElement);
    } else {
      render(new MessageView(Messages.NEW_EVENT), this.#containerElement);
    }
  }

  #renderEventItem(event, eventsListElement) {
    const { name: destinationName } = this.#eventsModel.getDestinationById(event.destination);
    const eventOffers = this.#eventsModel.getEventOffers(event);
    render(new EventItemView(event, destinationName, eventOffers), eventsListElement);
  }
}
