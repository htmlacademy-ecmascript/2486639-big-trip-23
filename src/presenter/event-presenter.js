import { render, replace, remove } from '../framework/render.js';
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
  #onEventChange = null;

  constructor({ containerElement, eventsModel, onAfterEditClick, onAfterFormClose, onEventChange }) {
    this.#containerElement = containerElement;
    this.#eventsModel = eventsModel;
    this.#onAfterEditClick = onAfterEditClick; //? просто after?
    this.#onAfterFormClose = onAfterFormClose;
    this.#onEventChange = onEventChange;
  }

  //? а деструкторы нужны? TaskPresenter ->destroy() { remove(this.#taskComponent); remove(this.#taskEditComponent); }
  //! наверное понадобятся при удалении событий

  init(event) {
    this.#event = event;

    // Подготовим недостющие данные для отображения события в списке и при редактировании
    const { destination, type, offers } = event;
    const eventDestination = this.#eventsModel.destinations.get(destination);
    const offer = this.#eventsModel.offers.get(type);
    const typeOffers = (offer) ? offer.offers : [];
    //! попробовать переделать на Map
    const eventOffers = typeOffers.filter((typeOffer) => offers.includes(typeOffer.id));

    //! если при после сохранения редактирование не будет закрываться, то нужно определять редактируем или просматриваем, а еще будет добавление, когда нет Item
    //! const prevFormComponent = this.#formComponent;
    if (!this.#formComponent) {
      this.#formComponent = new EventFormView({
        event,
        destination: eventDestination,
        typeOffers,
        destinations: this.#eventsModel.destinations,
        onSubmit: this.#onFormSubmit,
        onDelete: null, //! заготовка
        onCancel: this.closeForm
      });
    }

    const prevItemComponent = this.#itemComponent;
    this.#itemComponent = new EventItemView({
      event,
      destinationName: eventDestination.name,
      eventOffers,
      onFavoriteClick: this.#onFavoriteClick,
      onEditClick: this.#onEditClick
    });

    //! if (!prevItemComponent || !prevFormComponent) {
    if (!prevItemComponent) {
      render(this.#itemComponent, this.#containerElement);
    } else {
      replace(this.#itemComponent, prevItemComponent);
      //! replace(this.#taskEditComponent, prevTaskEditComponent);

      remove(prevItemComponent);
      //! remove(prevFormComponent);
    }
  }

  #openForm() {
    replace(this.#formComponent, this.#itemComponent);
    //! тут бы прокрутить страницу немного вниз, если форма отрисовалась ниже видимой области... если не буте мешать автотестам
    document.addEventListener('keydown', this.#onDocumentKeyDown);
  }

  closeForm = () => {
    replace(this.#itemComponent, this.#formComponent);
    document.removeEventListener('keydown', this.#onDocumentKeyDown);
    this.#onAfterFormClose();
  };

  #onEditClick = () => {
    this.#openForm();
    this.#onAfterEditClick(this);
  };

  #onFavoriteClick = () => {
    const isFavorite = !this.#event.isFavorite;
    this.#onEventChange({ ...this.#event, isFavorite });
  };

  #onFormSubmit = () => {
    //! добавить сохранение данных? а потом закрыть
    this.closeForm();
  };

  #onDocumentKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#formComponent.resetForm();
      this.closeForm();
    }
    //! по ТЗ не нужен Enter, но можно добавить, если не будет мешать автотестам
  };
}
