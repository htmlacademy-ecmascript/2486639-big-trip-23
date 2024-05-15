import { render, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils/utils.js';
import EventItemView from '../view/event-item-view.js';
import EventFormView from '../view/event-form-view.js';

export default class EventPresenter {
  #containerElement = null;
  #eventsModel = null;

  #event = null;

  /*
    #hiddenEventItemComponent = null;
    #openedEventFormComponent = null;
  */

  constructor({ containerElement, eventsModel }) {
    this.#containerElement = containerElement;
    this.#eventsModel = eventsModel;
  }

  init(event) {
    this.#event = event;

    // Подготовим недостющие данные для отображения события в списке и при редактировании
    const { destination, type, offers } = event;
    const eventDestination = this.#eventsModel.destinations.get(destination);
    const offer = this.#eventsModel.offers.get(type);
    const typeOffers = (offer) ? offer.offers : [];
    //! попробовать переделать на Map
    const eventOffers = typeOffers.filter((typeOffer) => offers.includes(typeOffer.id));

    const eventFormComponent = new EventFormView({
      event,
      destination: eventDestination,
      typeOffers,
      destinations: this.#eventsModel.destinations,
      onSubmit: this.#onEventFormSubmit,
      onDelete: null, //! заготовка
      onClose: this.#onEventFormClose
    });

    const eventItemComponent = new EventItemView({
      event,
      destinationName: eventDestination.name,
      eventOffers,
      onFavoriteClick: null, //! временно
      onEditClick: () => {
        //! при отдельном презенторе замкнуть внутри класса
        this.#replaceItemToForm(eventItemComponent, eventFormComponent);
      }
    });

    render(eventItemComponent, this.#containerElement);
  }

  #replaceItemToForm(eventItemComponent, eventFormComponent) {
    /*
    if (this.#hiddenEventItemComponent && this.#openedEventFormComponent) {
      this.#replaceFormToItem();
    }
    */

    replace(eventFormComponent, eventItemComponent);
    //! тут бы прокрутить страницу немного, если форма отрисовалась ниже видимой области... если не буте мешать автотестам
    document.addEventListener('keydown', this.#onDocumentKeyDown);
    /*
    this.#hiddenEventItemComponent = eventItemComponent;
    this.#openedEventFormComponent = eventFormComponent;
    */
  }

  #replaceFormToItem() {
    /*
    replace(this.#hiddenEventItemComponent, this.#openedEventFormComponent);
    */
    document.removeEventListener('keydown', this.#onDocumentKeyDown);
    /*
    this.#hiddenEventItemComponent = null;
    this.#openedEventFormComponent = null;
    */
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
}
