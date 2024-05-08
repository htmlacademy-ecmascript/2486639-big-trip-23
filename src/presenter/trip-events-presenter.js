import { render, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils/utils.js';
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
    if (this.#events.length) {
      this.#events.forEach((event) => this.#renderEventItem(event, this.#eventsListComponent.element));
      render(this.#eventsListComponent, this.#containerElement);
    } else {
      render(new TripMessageView(TripMessage.NEW_EVENT), this.#containerElement);
    }
  }

  #renderEventItem(event, eventsListElement) {
    //? по ТЗ нужен Enter?
    const onEscKeyDown = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceFormToItem();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const extendedEvent = {
      event,
      eventTypes: EVENT_TYPES,
      destinations: this.#destinations,
      typesOffers: this.#typesOffers
    };

    const eventItem = {
      ...extendedEvent,
      onFavoriteClick: null,
      onEditClick: () => {
        replaceItemToForm();
        document.addEventListener('keydown', onEscKeyDown);
      }
    };

    const eventItemComponent = new EventItemView(eventItem);

    const eventEdit = {
      ...extendedEvent,
      onSubmit: () => {
        replaceFormToItem();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const eventFormComponent = new EventFormView(eventEdit);

    function replaceItemToForm() {
      replace(eventFormComponent, eventItemComponent);
    }

    function replaceFormToItem() {
      replace(eventItemComponent, eventFormComponent);
    }

    render(eventItemComponent, eventsListElement);
  }
}
