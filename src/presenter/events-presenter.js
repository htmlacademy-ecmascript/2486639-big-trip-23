import { render } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import EventPresenter from './event-presenter.js';
import EventsListView from '../view/events-list-view.js';
import { UserAction, UiBlockerLimit } from '../const.js';
import NewEventPresenter from './new-event-presenter.js';

export default class EventsPresenter {
  #containerElement = null;
  #eventsModel;

  #events = [];

  #eventPresenters = new Map();
  #activeEventPresenter = null;
  #newEventPresenter = null;

  #eventsListComponent = new EventsListView();

  #uiBlocker = new UiBlocker({
    lowerLimit: UiBlockerLimit.LOWER,
    upperLimit: UiBlockerLimit.UPPER
  });

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

  addEvent() { //! названия, возможно объедегнить с #removeNewEvent
    if (this.#events.length) {
      this.#closeEventForm();
    } else {
      render(this.#eventsListComponent, this.#containerElement); //! в отдельную функцию
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
    const { destinations, offers } = this.#eventsModel;

    this.#newEventPresenter = new NewEventPresenter({
      destinations,
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
    const { destinations, offers } = this.#eventsModel;

    const eventPresenter = new EventPresenter({
      destinations,
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
      this.#activeEventPresenter.closeEventForm();
      this.#activeEventPresenter = null;
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

  #onEventChange = async (actionType, updateType, event) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventPresenters.get(event.id).setSaving();
        try {
          await this.#eventsModel.updateEvent(updateType, event);
        } catch (err) {
          this.#eventPresenters.get(event.id).setAborting();
        }
        break;
      case UserAction.ADD_EVENT:
        this.#newEventPresenter.setSaving();
        try {
          await this.#eventsModel.addEvent(updateType, event);
        } catch (err) {
          this.#newEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_EVENT:
        this.#activeEventPresenter.setDeleting(); // this.#eventPresenters.get(event.id)
        try {
          await this.#eventsModel.deleteEvent(updateType, event);
        } catch (err) {
          this.#activeEventPresenter.setAborting(); // this.#eventPresenters.get(event.id)
        }
        break;
    }

    this.#uiBlocker.unblock();
  };
}
