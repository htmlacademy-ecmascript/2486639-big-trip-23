import { render, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils/utils.js';
import EventItemView from '../view/event-item-view.js';
import EventFormView from '../view/event-form-view.js';

export default class EventPresenter {
  #containerElement = null;
  #eventsModel = null;

  #event = null;

  #itemComponent = null;
  #formComponent = null;

  #onAfterEditClick = null;
  #onAfterFormClose = null;

  constructor({ containerElement, eventsModel, onAfterEditClick, onAfterFormClose }) {
    this.#containerElement = containerElement;
    this.#eventsModel = eventsModel;
    this.#onAfterEditClick = onAfterEditClick; //? просто after?
    this.#onAfterFormClose = onAfterFormClose;
  }

  init(event) {
    this.#event = event; //! если не будет испольщования, то и удалить #event

    // Подготовим недостющие данные для отображения события в списке и при редактировании
    const { destination, type, offers } = event;
    const eventDestination = this.#eventsModel.destinations.get(destination);
    const offer = this.#eventsModel.offers.get(type);
    const typeOffers = (offer) ? offer.offers : [];
    //! попробовать переделать на Map
    const eventOffers = typeOffers.filter((typeOffer) => offers.includes(typeOffer.id));

    this.#formComponent = new EventFormView({
      event,
      destination: eventDestination,
      typeOffers,
      destinations: this.#eventsModel.destinations,
      onSubmit: this.#onFormSubmit,
      onDelete: null, //! заготовка
      onClose: this.#onFormClose
    });

    this.#itemComponent = new EventItemView({
      event,
      destinationName: eventDestination.name,
      eventOffers,
      onFavoriteClick: null, //! временно
      onEditClick: () => {
        //! при отдельном презенторе замкнуть внутри класса
        this.#replaceItemToForm();
        this.#onAfterEditClick(this);
      }
    });

    render(this.#itemComponent, this.#containerElement);
  }

  #replaceItemToForm() {
    replace(this.#formComponent, this.#itemComponent);
    //! тут бы прокрутить страницу немного, если форма отрисовалась ниже видимой области... если не буте мешать автотестам
    document.addEventListener('keydown', this.#onDocumentKeyDown);
  }

  replaceFormToItem() { //! # или close
    replace(this.#itemComponent, this.#formComponent);
    document.removeEventListener('keydown', this.#onDocumentKeyDown);
  }

  #onDocumentKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#onFormClose();
    }
    //! по ТЗ не нужен Enter, но можно добавить, если не будет мешать автотестам
  };

  #onFormSubmit = () => {
    //! добавить сохранение данных
    this.#onFormClose();
  };

  #onFormClose = () => {
    this.replaceFormToItem();
    this.#onAfterFormClose();
  };
}
