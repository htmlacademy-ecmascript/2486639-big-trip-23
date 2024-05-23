import { render, replace, remove, RenderPosition } from '../framework/render.js';
import { isEscapeKey, findItemByKey } from '../utils/utils.js';
import EventItemView from '../view/event-item-view.js';
import EventFormView from '../view/event-form-view.js';
import { findTypeOffers } from '../utils/event.js';

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
    const { destinations, offers } = this.#eventsModel;
    const { type, offers: eventOfferIds } = event;
    const destinationInfo = findItemByKey(destinations, event.destination);
    const typeOffers = findTypeOffers(offers, type);
    //! Предусмотреть вариант с добавлением нового события, будет Item, Form по умолчанию, но форм в режиме добавления,
    //! а при отмене на форме или из главного презетора удалить оба елемента, скорее всего путем полной перерисовки.

    const prevFormComponent = this.#formComponent;
    this.#formComponent = new EventFormView({
      event,
      destinationInfo,
      typeOffers,
      destinations,
      offers,
      onFormSubmit: this.#onFormSubmit,
      onDelete: this.#onDelete,
      onFormClose: this.#onFormClose
    });

    const prevItemComponent = this.#itemComponent;
    this.#itemComponent = new EventItemView({
      event,
      destinationName: destinationInfo?.name, //! '?.' как то покрасивее обойти при добавлении DEFAULT_EVENT.destination === null
      eventOffers: typeOffers.filter((typeOffer) => eventOfferIds.has(typeOffer.id)),
      onFavoriteClick: this.#onFavoriteClick,
      onEditClick: this.#onEditClick
    });

    if (!prevItemComponent || !prevFormComponent) {
      const isAddingNewEvent = !event.id;
      const place = (isAddingNewEvent) ? RenderPosition.AFTERBEGIN : undefined;
      render(this.#itemComponent, this.#containerElement, place);
      if (isAddingNewEvent) {
        this.#openForm();
      }
    } else {
      replace(this.#itemComponent, prevItemComponent);

      remove(prevItemComponent);
      remove(prevFormComponent); //! удалить если будет ли использоваться
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

  #onFormSubmit = (event) => {
    this.#replaceFormToItem();
    this.#onEventChange({ ...event });
    this.#onEventFormClose();
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
