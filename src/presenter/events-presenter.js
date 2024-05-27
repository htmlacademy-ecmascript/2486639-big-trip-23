import { render } from '../framework/render.js';
import { deleteItemByKey } from '../utils/utils.js';
import EventPresenter from './event-presenter.js';
import EventsListView from '../view/events-list-view.js';
import { DEFAULT_NEW_EVENT } from '../const.js';

export default class EventsPresenter {
  #containerElement = null;

  #destinations = null;
  #offers = null;
  #events = [];

  #isOpenNewEvent = false; //! сделать наследование презенторов и формы редактирования

  #eventPresenters = new Map();
  #activeEventPresenter = null;

  #eventsListComponent = new EventsListView();

  #onAddNewEventClose = null;

  constructor({ destinations, offers, containerElement, onAddNewEventClose }) {
    this.#destinations = destinations;
    this.#offers = offers;
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
    const eventPresenter = new EventPresenter({
      destinations: this.#destinations,
      offers: this.#offers,
      containerElement: this.#eventsListComponent.element,
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
  };

  #onEventFormOpen = (eventPresenter) => {
    //! ошибка при окрытом редактировании и добавлнении нового, проверить и наоборот, и только на редактируемых
    this.#closeEventForm();
    this.#activeEventPresenter = eventPresenter;
  };

  #onEventFormClose = () => {
    this.#activeEventPresenter = null;
    if (this.#isOpenNewEvent) {
      this.#isOpenNewEvent = false;
      this.#eventPresenters.get(DEFAULT_NEW_EVENT.id).destroy(); //! еще варианты по замене null из DEFAULT_NEW_EVENT.id
      this.#eventPresenters.delete(DEFAULT_NEW_EVENT.id);
      this.#onAddNewEventClose();
    }
  };

  #onEventChange = (updatedEvent) => {
    //! временно новый id
    const id = (this.#isOpenNewEvent) ? this.#events.length + 1 : updatedEvent.id;

    //! для нового сделать отдельный обработчик onNewEvent
    if (this.#isOpenNewEvent) {
      //! скорее всего будет полная отрисовка заново и придеться все удалить
      //! применить фильтр и сортировку, или сбросить все и применить сортировку по дням
      //! возможно перенести логику сортировки и фильтрации сюда...
      this.#isOpenNewEvent = false;
      const eventPresenter = this.#eventPresenters.get(DEFAULT_NEW_EVENT.id);//! после отдельно onNewEvent определение id переделать!
      this.#eventPresenters.delete(DEFAULT_NEW_EVENT.id);
      updatedEvent.id = id;
      //! если не было событий, то нужно отрисовать сортировку, но она в другом презенторе и скорее всего будет полная отрисовка
      this.#events.push(updatedEvent);
      //! в модели не забыть добавить
      this.#eventPresenters.set(id, eventPresenter);
      this.#onAddNewEventClose();
    } else {
      //!! передать основному презентеру
      //this.#eventsModel.updateEvent(updatedEvent);
      //this.#events = this.#eventsModel.events;
      //! тут нужно вызать пересчет Info через основного презентора
      //! оповестить презентер фильтров и применить сортировку
    }

    this.#eventPresenters.get(id).init(updatedEvent);
  };

  #onEventDelete = (eventId) => {
    deleteItemByKey(this.#events, eventId);
    //! в модели не забыть удалить и общему презентору сособщить
    this.#eventPresenters.get(eventId).destroy();
    //! тут нужно вызать пересчет Info через основного презентора
  };
}
