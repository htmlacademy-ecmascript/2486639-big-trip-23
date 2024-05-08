import { render } from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import EventFormView from '../view/event-form-view.js';
import MessageView from '../view/message-view.js';
import { EVENT_TYPES, Message } from '../const.js';

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

    /**/
    //! временно выводим форму редактирования
    const event = events[0];
    const extendedEvent = {
      event,
      types: EVENT_TYPES,
      destinationNames,
      destination: this.#eventsModel.getDestinationById(event.destination),//? где же правильней собирать данные? может во View?
      offers: this.#eventsModel.getAvailableEventOffers(event)
    };
    render(new EventFormView({ extendedEvent }), eventsListElement);
    /**/
    for (let i = 0; i < events.length; i++) {
      this.#renderEventItem(events[i], eventsListElement);
    }

    if (events.length) {
      render(this.#eventsListComponent, this.#containerElement);
    } else {
      render(new MessageView(Message.NEW_EVENT), this.#containerElement);
    }
  }

  #renderEventItem(event, eventsListElement) {
    const eventInfo = {
      event,
      destinationName: this.#eventsModel.getDestinationById(event.destination)?.name,
      eventOffers: this.#eventsModel.getEventOffers(event)
    };
    render(new EventItemView({ eventInfo }), eventsListElement);
  }
}
