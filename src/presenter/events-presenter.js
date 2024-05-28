import { render } from '../framework/render.js';
import EventPresenter from './event-presenter.js';
import EventsListView from '../view/events-list-view.js';
import { DEFAULT_NEW_EVENT, UserAction } from '../const.js';

export default class EventsPresenter {
  #containerElement = null;
  #eventsModel;

  #events = [];

  #isOpenNewEvent = false; //! сделать наследование презенторов и формы редактирования

  #eventPresenters = new Map();
  #activeEventPresenter = null;

  #eventsListComponent = new EventsListView();

  #onAddNewEventClose = null;

  constructor({ eventsModel, containerElement, onAddNewEventClose }) {
    this.#eventsModel = eventsModel;
    this.#containerElement = containerElement;
    this.#onAddNewEventClose = onAddNewEventClose;
  }

  clear() {
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.destroy());
    this.#eventPresenters.clear();
  }

  init(events) {
    this.#events = events;

    this.#renderEventsList();
  }

  updateEvent(updatedEvent) { //! будет в своем презенторе или общем
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
    //! посмотреть вызовы в других функциях
  }

  addEvent() { //! будет в свое презенторе или общем
    this.#isOpenNewEvent = true;

    if (!this.#events.length) {
      render(this.#eventsListComponent, this.#containerElement);
    }

    //! будет отдельный презентер
    this.#renderEventItem(DEFAULT_NEW_EVENT);
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
      //! как то спраятать все #activeEventPresenter.destroy(); #activeEventPresenter.resetEventForm(); #activeEventPresenter.closeEventForm();
      //! и больше логики передать EventPresenter
      if (this.#isOpenNewEvent) {
        this.#activeEventPresenter.destroy();
      } else {
        this.#activeEventPresenter.resetEventForm();
        this.#activeEventPresenter.closeEventForm();
      }
      this.#onEventFormClose();
    }
  }

  #onEventFormOpen = (eventPresenter) => {
    //! ошибка при окрытом редактировании и добавлнении нового, проверить и наоборот, и только на редактируемых
    this.#closeEventForm();
    this.#activeEventPresenter = eventPresenter;
  };

  #onEventFormClose = () => {
    //! навеное не нужно, буде перерисовка при изменениях
    this.#activeEventPresenter = null;
    if (this.#isOpenNewEvent) {
      this.#isOpenNewEvent = false;
      this.#eventPresenters.get(DEFAULT_NEW_EVENT.id).destroy(); //! еще варианты по замене null из DEFAULT_NEW_EVENT.id
      this.#eventPresenters.delete(DEFAULT_NEW_EVENT.id);
      this.#onAddNewEventClose();
    }
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
