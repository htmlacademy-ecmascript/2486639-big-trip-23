import { remove, render } from '../framework/render.js';
import { deleteItemByKey, findItemIndexByKey } from '../utils/utils.js';
import EventPresenter from './event-presenter.js';
import EventsListView from '../view/events-list-view.js';
import MessageView from '../view/message-view.js';
import { DEFAULT_NEW_EVENT, MessageType } from '../const.js';

export default class EventsPresenter {
  #containerElement = null;
  #eventsModel = null;

  #events = [];
  #isOpenNewEvent = false; //! сделать наследование презенторов и формы редактирования

  #eventPresenters = new Map();
  #activeEventPresenter = null;

  #emptyEventsMessageComponent = new MessageView(MessageType.NEW_EVENT);
  #eventsListComponent = new EventsListView();

  #onAddNewEventClose = null;

  constructor({ containerElement, eventsModel, onAddNewEventClose }) {
    this.#containerElement = containerElement;
    this.#eventsModel = eventsModel;
    this.#onAddNewEventClose = onAddNewEventClose;
  }

  init(events) {
    this.#events = events;

    this.#clearEventsList();
    this.#renderEventsList();
  }

  addEvent() {
    this.#isOpenNewEvent = true;

    if (!this.#events.length) {
      remove(this.#emptyEventsMessageComponent);
      render(this.#eventsListComponent, this.#containerElement);
    }

    //! будет отдельный презентер
    this.#renderEventItem(DEFAULT_NEW_EVENT);
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.destroy());
    this.#eventPresenters.clear();
  }

  #renderEventsList() {
    if (this.#events.length) {
      this.#events.forEach((event) => this.#renderEventItem(event));
      render(this.#eventsListComponent, this.#containerElement);
    } else {
      render(this.#emptyEventsMessageComponent, this.#containerElement);
    }
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
      if (!this.#events.length) { //! похожий вызов отрисовки сообщения, может сделать функцию
        render(this.#emptyEventsMessageComponent, this.#containerElement);
      }
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
      this.#events[findItemIndexByKey(this.#events, id)] = updatedEvent;
      //! в модели не забыть изменить
    }

    this.#eventPresenters.get(id).init(updatedEvent);
    //! тут нужно вызать пересчет Info через основного презентора
  };

  #onEventDelete = (eventId) => {
    deleteItemByKey(this.#events, eventId);
    //! в модели не забыть удалить
    this.#eventPresenters.get(eventId).destroy();
    if (!this.#events.length) { //! похожий вызов отрисовки сообщения, может сделать функцию
      render(this.#emptyEventsMessageComponent, this.#containerElement);
    }
    //! тут нужно вызать пересчет Info через основного презентора
  };
}
