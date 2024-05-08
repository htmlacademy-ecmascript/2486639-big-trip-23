import { render } from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import EventFormView from '../view/event-form-view.js';
import TripMessageView from '../view/trip-message-view.js';
import { EVENT_TYPES, TripMessage } from '../const.js';

export default class TripEventsPresenter {
  #containerElement = null;
  #tripEventsModel = null;

  #destinations = [];
  #typesOffers = [];
  #events = [];

  #eventsListComponent = new EventsListView();

  constructor({ containerElement, tripEventsModel }) {
    this.#containerElement = containerElement;
    this.#tripEventsModel = tripEventsModel;
  }

  init() {
    //! временно. сохранить то что будет использоваться в других методах.
    this.#destinations = [...this.#tripEventsModel.destinations];
    this.#typesOffers = [...this.#tripEventsModel.typesOffers];
    this.#events = [...this.#tripEventsModel.events];

    this.#renderEventsList();
  }

  #renderEventsList() {
    const eventsListElement = this.#eventsListComponent.element;
    const events = this.#events;
    //const { destinationNames } = this.#tripEventsModel;

    /* */
    //! временно выводим форму редактирования
    const extendedEvent = {
      event: events[0],
      eventTypes: EVENT_TYPES,
      destinations: this.#destinations,
      typesOffers: this.#typesOffers
    };

    const eventEdit = {
      ...extendedEvent,
      onSubmit: null
    };

    render(new EventFormView(eventEdit), eventsListElement);
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
    const extendedEvent = {
      event,
      eventTypes: EVENT_TYPES,
      destinations: this.#destinations,
      typesOffers: this.#typesOffers
    };

    const eventItem = {
      ...extendedEvent,
      onFavoriteClick: null,
      onEditClick: null
    };

    /*
    const eventEdit = {
      ...extendedEvent,
      onSubmit: null
    };
    */

    render(new EventItemView(eventItem), eventsListElement);
  }
}
