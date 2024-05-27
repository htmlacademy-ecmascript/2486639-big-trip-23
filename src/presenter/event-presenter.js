import { render, replace, remove, RenderPosition } from '../framework/render.js';
import { isEscapeKey } from '../utils/utils.js';
import EventItemView from '../view/event-item-view.js';
import EventFormView from '../view/event-form-view.js';

export default class EventPresenter {
  #containerElement = null;

  #destinations = null;
  #offers = null;
  #event = null;

  #itemComponent = null;
  #formComponent = null;

  #onEventFormOpen = null;
  #onEventFormClose = null;
  #onEventChange = null;
  #onEventDelete = null;

  constructor({ destinations, offers, containerElement, onEventFormOpen, onEventFormClose, onEventChange, onEventDelete }) {
    this.#destinations = destinations;
    this.#offers = offers;
    this.#containerElement = containerElement;
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
    const prevFormComponent = this.#formComponent;
    const prevItemComponent = this.#itemComponent;

    this.#makeComponents();

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
      remove(prevFormComponent);
    }
  }

  #makeComponents() {
    //! Предусмотреть вариант с добавлением нового события, будет Item, Form по умолчанию, но форма в режиме добавления,
    //! а при отмене на форме или из главного презетора удалить оба елемента, скорее всего путем полной перерисовки.

    const event = this.#event;

    this.#formComponent = new EventFormView({
      event,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#onFormSubmit,
      onDelete: this.#onDelete,
      onFormClose: this.#onFormClose
    });

    this.#itemComponent = new EventItemView({
      event,
      onFavoriteClick: this.#onFavoriteClick,
      onEditClick: this.#onEditClick
    });
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
