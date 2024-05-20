import { render, replace, remove } from '../framework/render.js';
import { isEscapeKey, findItemByKey } from '../utils/utils.js';
import EventItemView from '../view/event-item-view.js';
import EventFormView from '../view/event-form-view.js';

export default class EventPresenter {
  #containerElement = null;
  #eventsModel = null;

  #event = null;

  #itemComponent = null;
  #formComponent = null;

  #onEventFormOpen = null;
  #onEventFormClose = null;
  #onEventChange = null;
  #onEventDelete = null;

  constructor({ containerElement, eventsModel, onEventFormOpen, onEventFormClose, onEventChange, onEventDelete }) {
    this.#containerElement = containerElement;
    this.#eventsModel = eventsModel;
    this.#onEventFormOpen = onEventFormOpen;
    this.#onEventFormClose = onEventFormClose;
    this.#onEventChange = onEventChange;
    this.#onEventDelete = onEventDelete;
  }

  destroy() {
    remove(this.#itemComponent);
    remove(this.#formComponent);
  }

  init(event) {
    this.#event = event;

    // Подготовим недостющие данные для отображения события в списке и при редактировании
    const { destinations } = this.#eventsModel;
    const { type, offers: eventOfferIds } = event;
    const destination = findItemByKey(destinations, event.destination);
    const typeOffers = this.#eventsModel.getTypeOffers(type); //! можно вызвать this.#onGetTypeOffers(type) как будет определено название

    //! Предусмотреть вариант с добавлением нового события, будет Item, Form по умолчанию, но форм в режиме добавления,
    //! а при отмене на форме или из главного презетора удалить оба елемента, скорее всего путем полной перерисовки.

    //! const prevFormComponent = this.#formComponent; //! скорее всего форму нужно пересоздать после сохранения, но сначала посомтреть может все данные уже будут в форме
    if (!this.#formComponent) {
      this.#formComponent = new EventFormView({
        event: { ...event, destination, typeOffers },
        destinations,
        onGetTypeOffers: this.#onGetTypeOffers, //? getTypeOffer? как же правильно оформить получение уточняющих данных с презентора?, все действия с презентора передаем обработчиками
        onGetDestinationByName: this.#onGetDestinationByName, //? тоже
        onFormSubmit: this.#onFormSubmit,
        onDelete: this.#onDelete,
        onFormClose: this.#onFormClose
      });
    }

    const prevItemComponent = this.#itemComponent;
    this.#itemComponent = new EventItemView({
      event,
      destinationName: destination.name,
      eventOffers: typeOffers.filter((typeOffer) => eventOfferIds.includes(typeOffer.id)),
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
    document.addEventListener('keydown', this.#onDocumentKeyDown);
    this.#onEventFormOpen(this);
  }

  resetEventForm = () => {
    this.#formComponent.resetForm();
  };

  closeEventForm = () => {
    this.#replaceFormToItem();
    this.#onEventFormClose();
  };

  #replaceFormToItem = () => {
    replace(this.#itemComponent, this.#formComponent);
    document.removeEventListener('keydown', this.#onDocumentKeyDown);
  };

  #onEditClick = () => {
    this.#openForm();
  };

  #onFavoriteClick = () => {
    const isFavorite = !this.#event.isFavorite;
    this.#onEventChange({ ...this.#event, isFavorite });
  };

  #onGetTypeOffers = (type) => this.#eventsModel.getTypeOffers(type);

  #onGetDestinationByName = (name) => findItemByKey(this.#eventsModel.destinations, name, 'name');

  #onFormSubmit = (event) => {
    this.#replaceFormToItem();
    this.#onEventFormClose();

    this.#onEventChange({ ...event });
  };

  #onDelete = (eventId) => {
    //! выше есть такие же две строки...
    this.#replaceFormToItem();
    this.#onEventFormClose();

    this.#onEventDelete(eventId);
  };

  #onFormClose = () => {
    this.closeEventForm();
  };

  #onDocumentKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.resetEventForm();
      this.closeEventForm();
    }
  };
}
