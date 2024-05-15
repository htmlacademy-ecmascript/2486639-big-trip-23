import { render/*, replace*/ } from '../framework/render.js';
/*
import { isEscapeKey } from '../utils/utils.js';
*/
import EventPresenter from './event-presenter.js';
import EventsListView from '../view/events-list-view.js';
import MessageView from '../view/message-view.js';
import { MessageType } from '../const.js';

export default class EventsPresenter {
  #containerElement = null;
  #eventsModel = null;

  #events = [];

  #evenPresenters = new Map();

  #eventsListComponent = new EventsListView();
  /*
  #hiddenEventItemComponent = null;
  #openedEventFormComponent = null;
  */

  constructor({ containerElement, eventsModel }) {
    this.#containerElement = containerElement;
    this.#eventsModel = eventsModel;
  }

  //? а деструкторы нужны? TaskPresenter ->destroy() { remove(this.#taskComponent); remove(this.#taskEditComponent); }

  init(events) {
    //! временно
    this.#events = events;

    this.#renderEventsList();
  }

  #renderEventsList() {
    if (this.#events.length) {
      this.#events.forEach((event) => this.#renderEventItem(event,));
      render(this.#eventsListComponent, this.#containerElement);
    } else {
      render(new MessageView(MessageType.NEW_EVENT), this.#containerElement);
    }
  }

  #renderEventItem(event) {
    const eventPresenter = new EventPresenter({
      containerElement: this.#eventsListComponent.element,
      eventsModel: this.#eventsModel
    });
    eventPresenter.init(event);
    this.#evenPresenters.set(event.id, eventPresenter);
  }

  /*
  #replaceItemToForm(eventItemComponent, eventFormComponent) {
    if (this.#hiddenEventItemComponent && this.#openedEventFormComponent) {
      this.#replaceFormToItem();
    }

    replace(eventFormComponent, eventItemComponent);
    //! тут бы прокрутить страницу немного, если форма отрисовалась ниже видимой области... если не буте мешать автотестам
    document.addEventListener('keydown', this.#onDocumentKeyDown);
    this.#hiddenEventItemComponent = eventItemComponent;
    this.#openedEventFormComponent = eventFormComponent;
  }

  #replaceFormToItem() {
    replace(this.#hiddenEventItemComponent, this.#openedEventFormComponent);
    document.removeEventListener('keydown', this.#onDocumentKeyDown);
    this.#hiddenEventItemComponent = null;
    this.#openedEventFormComponent = null;
  }

  #onDocumentKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#onEventFormClose();
    }
    //! по ТЗ не нужен Enter, но можно добавить, если не будет мешать автотестам
  };

  #onEventFormSubmit = () => {
    //! добавить сохранение данных
    this.#onEventFormClose();
  };

  #onEventFormClose = () => {
    this.#replaceFormToItem();
  };
  */
}
