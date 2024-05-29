import { render } from '../framework/render.js';
import EventPresenter from './event-presenter.js';
import EventsListView from '../view/events-list-view.js';
import { UserAction } from '../const.js';
import NewEventPresenter from './new-event-presenter.js';

export default class EventsPresenter {
  #containerElement = null;
  #eventsModel;

  #events = [];

  #eventPresenters = new Map();
  #activeEventPresenter = null;
  #newEventPresenter = null;

  #eventsListComponent = new EventsListView();

  #onNewEventClose = null;

  constructor({ eventsModel, containerElement, onNewEventClose }) {
    this.#eventsModel = eventsModel;
    this.#containerElement = containerElement;
    this.#onNewEventClose = onNewEventClose;
  }

  clear() {
    this.#closeEventForm();
    this.#closeNewEventForm();
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.destroy());
    this.#eventPresenters.clear();
  }

  init(events) {
    this.#events = events;

    this.#renderEventsList();
  }

  updateEvent(updatedEvent) {
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  }

  addEvent() {
    this.#closeEventForm();
    if (!this.#events.length) {
      render(this.#eventsListComponent, this.#containerElement);
    }
    this.#renderNewEvent();
  }

  #removeNewEvent() {
    if (this.#newEventPresenter) {
      this.#newEventPresenter.destroy();
      this.#newEventPresenter = null;
    }
  }

  #renderNewEvent() {
    const { destinations, destinationsById, destinationNames, offers } = this.#eventsModel;

    this.#newEventPresenter = new NewEventPresenter({
      destinations,
      destinationsById,
      destinationNames,
      offers,
      containerElement: this.#eventsListComponent.element,
      onNewEventFormClose: this.#onNewEventFormClose,
      onEventChange: this.#onEventChange
    });
    this.#newEventPresenter.init();
  }

  #renderEventsList() {
    if (this.#events.length) {
      this.#events.forEach((event) => this.#renderEventItem(event));
      render(this.#eventsListComponent, this.#containerElement);
    }
  }

  #renderEventItem(event) {
    const { destinations, destinationsById, destinationNames, offers } = this.#eventsModel;

    const eventPresenter = new EventPresenter({
      destinations,
      destinationsById,
      destinationNames,
      offers,
      containerElement: this.#eventsListComponent.element,
      onEventFormOpen: this.#onEventFormOpen,
      onEventFormClose: this.#onEventFormClose,
      onEventChange: this.#onEventChange
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #closeEventForm() {
    if (this.#activeEventPresenter) {
      this.#activeEventPresenter.resetEventForm();
      this.#activeEventPresenter.closeEventForm();
      this.#onEventFormClose();
    }
  }

  #closeNewEventForm() {
    if (this.#newEventPresenter) {
      this.#newEventPresenter.closeNewEventForm();
    }
  }

  #onEventFormOpen = (eventPresenter) => {
    this.#closeEventForm();
    this.#closeNewEventForm();
    this.#activeEventPresenter = eventPresenter;
  };

  #onEventFormClose = () => {
    this.#activeEventPresenter = null;
  };

  #onNewEventFormClose = () => {
    this.#removeNewEvent();
    this.#onNewEventClose();
  };

  #onEventChange = (actionType, updateType, event) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, event);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, event);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, event);
        break;
    }
  };
}
