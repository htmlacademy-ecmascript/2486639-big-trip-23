import { render, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils/utils.js';
import { getById } from '../utils/utils.js';
import EventsListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import EventFormView from '../view/event-form-view.js';
import MessageView from '../view/message-view.js';
import { MessageType } from '../const.js';

export default class EventsPresenter {
  #containerElement = null;
  #tripEventsModel = null;

  #destinations = [];
  #offers = [];
  #events = [];

  #eventsListComponent = new EventsListView();

  #hiddenEventItemComponent = null;
  #openedEventFormComponent = null;

  constructor({ containerElement, tripEventsModel }) {
    this.#containerElement = containerElement;
    this.#tripEventsModel = tripEventsModel;
  }

  init() {
    //! временно
    this.#destinations = [...this.#tripEventsModel.destinations];
    this.#offers = [...this.#tripEventsModel.offers];
    this.#events = [...this.#tripEventsModel.events];

    this.#renderEventsList();
  }

  #renderEventsList() {
    if (this.#events.length) {
      this.#events.forEach((event) => this.#renderEventItem(event, this.#eventsListComponent.element));
      render(this.#eventsListComponent, this.#containerElement);
    } else {
      render(new MessageView(MessageType.NEW_EVENT), this.#containerElement);
    }
  }

  #renderEventItem(event, eventsListElement) {
    // Подготовим недостющие данные для отображения события в списке и при редактировании
    const { destination, type, offers } = event;
    const eventDestination = getById(this.#destinations, destination);
    const offer = getById(this.#offers, type, 'type');
    const typeOffers = (offer) ? offer.offers : [];
    const eventOffers = typeOffers.filter((typeOffer) => offers.includes(typeOffer.id));

    const eventFormComponent = new EventFormView({
      event,
      destination: eventDestination,
      typeOffers,
      destinations: this.#destinations,
      onSubmit: this.onFormSubmit,
      onDelete: null, //! заготовка
      onClose: this.onFormClose
    });

    const eventItemComponent = new EventItemView({
      event,
      destinationName: eventDestination.name,
      eventOffers,
      onFavoriteClick: null, //! временно
      onEditClick: () => {
        //! при отдельном презенторе замкнуть внутри класса
        this.replaceItemToForm(eventItemComponent, eventFormComponent);
      }
    });

    render(eventItemComponent, eventsListElement);
  }

  onDocumentEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.replaceFormToItem();
    }
    //! по ТЗ не нужен Enter, но можно добавить, если не будет мешать автотестам
  };

  replaceFormToItem() {
    replace(this.#hiddenEventItemComponent, this.#openedEventFormComponent);
    document.removeEventListener('keydown', this.onDocumentEscKeyDown);
    this.#hiddenEventItemComponent = null;
    this.#openedEventFormComponent = null;
  }

  replaceItemToForm(eventItemComponent, eventFormComponent) {
    if (this.#hiddenEventItemComponent && this.#openedEventFormComponent) {
      this.replaceFormToItem();
    }

    replace(eventFormComponent, eventItemComponent);
    //! тут бы прокрутить страницу немного, если форма отрисовалась ниже видимой области... если не буте мешать автотестам
    document.addEventListener('keydown', this.onDocumentEscKeyDown);
    this.#hiddenEventItemComponent = eventItemComponent;
    this.#openedEventFormComponent = eventFormComponent;
  }

  onFormSubmit = () => {
    //! добавить сохранение данных
    this.onFormClose();
  };

  onFormClose = () => {
    this.replaceFormToItem();
  };
}
