import { render, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils/utils.js';
import { getById } from '../utils/utils.js';
import EventsListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import EventFormView from '../view/event-form-view.js';
import TripMessageView from '../view/trip-message-view.js';
import { TripMessage } from '../const.js';

export default class TripEventsPresenter {
  #containerElement = null;
  #tripEventsModel = null;

  #destinations = [];
  #offers = [];
  #events = [];

  #eventsListComponent = new EventsListView();

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
      render(new TripMessageView(TripMessage.NEW_EVENT), this.#containerElement);
    }
  }

  #renderEventItem(event, eventsListElement) {
    //? по ТЗ нужен Enter?
    const onEscKeyDown = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceFormToItem();
      }
    };

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
        replaceItemToForm();
      }
    };

    const eventItemComponent = new EventItemView(eventItem);

    //! название, может и не тужно сразу передать в функцию!
    const eventEdit = {
      event,
      destination: eventDestination,
      typeOffers,
      destinations: this.#destinations,
      onSubmit: () => {
        //! сохранить изменения
        replaceFormToItem();
      },
      onClose: () => {
        replaceFormToItem();
      }
    };

    const eventFormComponent = new EventFormView(eventEdit);

    function replaceItemToForm() {
      replace(eventFormComponent, eventItemComponent);
      document.addEventListener('keydown', onEscKeyDown);
      //? тут прокрутить страницу если форма отрисовалась ниже видимой области?
    }

    function replaceFormToItem() {
      replace(eventItemComponent, eventFormComponent);
      document.removeEventListener('keydown', onEscKeyDown);
    }

    render(eventItemComponent, eventsListElement);
  }
}
