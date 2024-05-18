import { render } from '../framework/render.js';
import EventPresenter from './event-presenter.js';
import EventsListView from '../view/events-list-view.js';

export default class EventsPresenter {
  #containerElement = null;
  #eventsModel = null;

  #events = null;

  #eventPresenters = new Map();
  #activeEventPresenter = null;

  #eventsListComponent = new EventsListView();

  constructor({ containerElement, eventsModel }) {
    this.#containerElement = containerElement;
    this.#eventsModel = eventsModel;
  }

  init(events) {
    this.#events = events;

    this.#clearEventsList();
    this.#renderEventsList();
  }

  #clearEventsList() {
    this.#closeEventForm();
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.destroy());
    this.#eventPresenters.clear();
  }

  #renderEventsList() {
    this.#events.forEach((event) => this.#renderEventItem(event));
    render(this.#eventsListComponent, this.#containerElement);
  }

  #renderEventItem(event) {
    const eventPresenter = new EventPresenter({
      containerElement: this.#eventsListComponent.element,
      eventsModel: this.#eventsModel,
      onEventFormOpen: this.#onEventFormOpen,
      onEventFormClose: this.#onEventFormClose,
      onEventChange: this.#onEventChange
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #closeEventForm = () => {
    if (this.#activeEventPresenter) {
      this.#activeEventPresenter.resetEventForm();
      this.#activeEventPresenter.closeEventForm();
    }

    this.#onEventFormClose();
  };

  #onEventFormOpen = (eventPresenter) => {
    this.#closeEventForm();
    this.#activeEventPresenter = eventPresenter;
  };

  #onEventFormClose = () => {
    this.#activeEventPresenter = null;
  };

  #onEventChange = (updatedEvent) => {
    const { id } = updatedEvent;
    this.#events.set(id, updatedEvent);
    this.#eventPresenters.get(id).init(updatedEvent);
    //! тут нужнозвать пересчет Info и при добавлении точки
  };
}
