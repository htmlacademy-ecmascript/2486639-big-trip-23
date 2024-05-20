import { render } from '../framework/render.js';
import { findItemIndexByKey } from '../utils/utils.js';
import EventPresenter from './event-presenter.js';
import EventsListView from '../view/events-list-view.js';
import { DEFAULT_EVENT } from '../const.js';

export default class EventsPresenter {
  #containerElement = null;
  #eventsModel = null;

  #events = [];
  #isOpenNewEvent = false;

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

  AddEvent() {
    //! посмотреть ТЗ, что делать если уже открыто добавление
    if (!this.#isOpenNewEvent) {
      this.#isOpenNewEvent = true;
      this.#renderEventItem(DEFAULT_EVENT);
    }
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
      onEventChange: this.#onEventChange,
      onEventDelete: this.#onEventDelete
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #closeEventForm = () => {
    if (this.#activeEventPresenter) {
      if (this.#isOpenNewEvent) {
        this.#activeEventPresenter.destroy();
      } else {
        this.#activeEventPresenter.resetEventForm();
        this.#activeEventPresenter.closeEventForm();
      }
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
    const id = (this.#isOpenNewEvent) ? this.#events.length : updatedEvent.id;

    if (this.#isOpenNewEvent) {
      const eventPresenter = this.#eventPresenters.get(updatedEvent.id); //! updatedEvent.id === null
      this.#eventPresenters.delete(updatedEvent.id);
      updatedEvent.id = id;
      this.#eventPresenters.set(updatedEvent.id, eventPresenter);

      this.#events.push(updatedEvent);
      this.#isOpenNewEvent = false;
    } else {
      this.#events[findItemIndexByKey(this.#events, id)] = updatedEvent;
    }

    this.#eventPresenters.get(id).init(updatedEvent);
    //! тут нужно вызать пересчет Info через основного презентора
  };

  #onEventDelete = (eventId) => {
    const index = findItemIndexByKey(this.#events, eventId);
    this.#events.splice(index, 1);
    this.#eventPresenters.get(eventId).destroy();
    //! тут нужно вызать пересчет Info через основного презентора
  };
}
