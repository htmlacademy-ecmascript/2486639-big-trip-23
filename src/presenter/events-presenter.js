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
    let eventItemComponent = null;
    let eventFormComponent = null;

    // Подготовим недостющие данные для отображения события в списке и при редактировании
    const { destination, type, offers } = event;
    const eventDestination = getById(this.#destinations, destination);
    const offer = getById(this.#offers, type, 'type');
    const typeOffers = (offer) ? offer.offers : [];
    const eventOffers = typeOffers.filter((typeOffer) => offers.includes(typeOffer.id));

    //! название, может и не тужно сразу передать в функцию!
    const eventItem = {
      event,
      destinationName: eventDestination.name,
      eventOffers,
      onFavoriteClick: null, //! временно
      onEditClick: () => {
        this.replaceItemToForm(eventFormComponent, eventItemComponent);
      }
    };

    eventItemComponent = new EventItemView(eventItem);

    //! название, может и не тужно сразу передать в функцию!
    const eventEdit = {
      event,
      destination: eventDestination,
      typeOffers,
      destinations: this.#destinations,
      onSubmit: () => {
        //! сохранить изменения
        this.replaceFormToItem(eventItemComponent, eventFormComponent);
      },
      onClose: () => {
        //console.log(this);
        this.replaceFormToItem(eventItemComponent, eventFormComponent);
      }
    };

    eventFormComponent = new EventFormView(eventEdit);

    render(eventItemComponent, eventsListElement);
  }

  //? по ТЗ нужен Enter?
  onDocumentEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      if (this.hideItem && this.showForm) {
        this.replaceFormToItem(this.hideItem, this.showForm);
      }
    }
  };

  replaceItemToForm = (eventFormComponent, eventItemComponent) => {
    if (this.hideItem && this.showForm) {
      this.replaceFormToItem(this.hideItem, this.showForm);
    }

    this.hideItem = eventItemComponent;
    this.showForm = eventFormComponent;

    replace(eventFormComponent, eventItemComponent);
    document.addEventListener('keydown', this.onDocumentEscKeyDown);
    //? тут прокрутить страницу если форма отрисовалась ниже видимой области?
  };

  replaceFormToItem = (eventItemComponent, eventFormComponent) => {
    this.hideItem = null;
    this.showForm = null;

    replace(eventItemComponent, eventFormComponent);
    document.removeEventListener('keydown', this.onDocumentEscKeyDown);
  };
}
