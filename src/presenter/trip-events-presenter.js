import { render } from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import EventFormView from '../view/event-form-view.js';
import TripMessageView from '../view/trip-message-view.js';
import { EVENT_TYPES, TripMessage } from '../const.js';

export default class TripEventsPresenter {
  #containerElement = null;
  #tripEventsModel = null;

  #events = [];

  #eventsListComponent = new EventsListView();

  constructor({ containerElement, tripEventsModel }) {
    this.#containerElement = containerElement;
    this.#tripEventsModel = tripEventsModel;
  }

  init() {
    this.#events = [...this.#tripEventsModel.events]; //! временно. сохранить то что будет диспользоваться в других методах.

    this.#renderEventsList();
  }

  #renderEventsList() {
    const eventsListElement = this.#eventsListComponent.element;
    const events = this.#events;
    const { destinationNames } = this.#tripEventsModel;

    /**/
    //! временно выводим форму редактирования
    const event = events[0];
    const extendedEvent = {
      event,
      types: EVENT_TYPES,
      destinationNames,
      destination: this.#tripEventsModel.getDestinationById(event.destination),//? где же правильней собирать данные? может во View?
      offers: this.#tripEventsModel.getAvailableEventOffers(event)
    };
    render(new EventFormView({ extendedEvent }), eventsListElement);
    /**/
    for (let i = 0; i < events.length; i++) {
      this.#renderEventItem(events[i], eventsListElement);
    }

    if (events.length) {
      render(this.#eventsListComponent, this.#containerElement);
    } else {
      render(new TripMessageView(TripMessage.NEW_EVENT), this.#containerElement);
    }
  }

  #renderEventItem(event, eventsListElement) {
    const eventInfo = {
      event,
      destinationName: this.#tripEventsModel.getDestinationById(event.destination)?.name,
      eventOffers: this.#tripEventsModel.getEventOffers(event)
    };
    render(new EventItemView({ eventInfo }), eventsListElement);
  }
}
