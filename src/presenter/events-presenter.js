import { remove, render } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import EventPresenter from './event-presenter.js';
import EventsListView from '../view/events-list-view.js';
import { UserAction, UpdateType, UiBlockerLimit } from '../const.js';
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

  init(events) {
    this.#events = events;

    this.#renderEventItems();
  }

  clear() {
    this.#closeEventForm();
    this.#closeNewEventForm();
    this.#removeEventItems();
  }

  updateEvent(updatedEvent) {
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  }

  addNewEvent() {
    this.#closeEventForm();
    if (!this.#events.length) {
      this.#renderEventsList();
    }
    this.#renderNewEvent();
  }

  #renderEventsList() {
    // можно всегда добавлять ul в TripPresenter и не удалять, но будет не соответсвие с markup-и
    render(this.#eventsListComponent, this.#containerElement);
  }

  #removeEventsList() {
    remove(this.#eventsListComponent);
  }

  #renderEventItems() {
    if (this.#events.length) {
      this.#renderEventsList();
      this.#events.forEach((event) => this.#renderEventItem(event));
    }
  }

  #removeEventItems() {
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.destroy());
    this.#eventPresenters.clear();
    if (this.#events.length) {
      this.#removeEventsList();
    }
  }

  #renderEventItem(event) {
    const eventPresenter = new EventPresenter({
      destinations: this.#eventsModel.destinations,
      offers: this.#eventsModel.offers,
      containerElement: this.#eventsListComponent.element,
      onEventFormOpen: this.#onEventFormOpen,
      onEventFormClose: this.#onEventFormClose,
      onEventChange: this.#onEventChange
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderNewEvent() {
    this.#newEventPresenter = new NewEventPresenter({
      destinations: this.#eventsModel.destinations,
      offers: this.#eventsModel.offers,
      containerElement: this.#eventsListComponent.element,
      onNewEventFormClose: this.#onNewEventFormClose,
      onEventChange: this.#onEventChange
    });
    this.#newEventPresenter.init();
  }

  #removeNewEvent() {
    if (this.#newEventPresenter) {
      this.#newEventPresenter.destroy();
      this.#newEventPresenter = null;
    }
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

  #getEventPresenter(userAction, updateType, event) {
    if (userAction === UserAction.ADD_EVENT) {
      return this.#newEventPresenter;
    }

    if ((userAction === UserAction.UPDATE_EVENT) && (updateType === UpdateType.PATCH)) {
      return this.#eventPresenters.get(event.id);
    }

    return this.#activeEventPresenter;
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
    if (!this.#events.length) {
      this.#removeEventsList();
    }
    this.#onNewEventClose();
  };

  #onEventChange = async (actionType, updateType, event) => {
    this.#uiBlocker.block();

    const eventPresenter = this.#getEventPresenter(actionType, updateType, event);

    switch (actionType) {
      case UserAction.UPDATE_EVENT:

        eventPresenter.setSaving();
        try {
          await this.#eventsModel.updateEvent(updateType, event);
        } catch (err) {
          eventPresenter.setAborting();
        }
        break;
      case UserAction.ADD_EVENT:
        eventPresenter.setSaving();
        try {
          await this.#eventsModel.addEvent(updateType, event);
        } catch (err) {
          eventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_EVENT:
        eventPresenter.setDeleting();
        try {
          await this.#eventsModel.deleteEvent(updateType, event);
        } catch (err) {
          // иногда на автотестах eventPresenter равный this.#activeEventPresenter, уже null, т.е. форма уже закрыта..., возможно в других вызовах добавить...
          eventPresenter?.setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };
}
