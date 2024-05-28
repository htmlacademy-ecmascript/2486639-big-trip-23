import { render, replace, remove, RenderPosition } from '../framework/render.js';
import { isEscapeKey } from '../utils/utils.js';
import EventItemView from '../view/event-item-view.js';
import EventFormView from '../view/event-form-view.js';
import { UserAction, UpdateType } from '../const.js';

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

  constructor({ destinations, offers, containerElement, onEventFormOpen, onEventFormClose, onEventChange }) {
    this.#destinations = destinations;
    this.#offers = offers;
    this.#containerElement = containerElement;
    this.#onEventFormOpen = onEventFormOpen;
    this.#onEventFormClose = onEventFormClose;
    this.#onEventChange = onEventChange;
  }

  destroy() {
    remove(this.#itemComponent);
    remove(this.#formComponent);
  }

  init(event) {
    this.#event = event;
    const storedFormComponent = this.#formComponent;
    const storedItemComponent = this.#itemComponent;

    this.#makeComponents();

    if (!storedItemComponent || !storedFormComponent) {
      const isAddingNewEvent = !event.id;
      const place = (isAddingNewEvent) ? RenderPosition.AFTERBEGIN : undefined;
      render(this.#itemComponent, this.#containerElement, place);
      if (isAddingNewEvent) {
        this.#openForm();
      }
    } else {
      replace(this.#itemComponent, storedItemComponent);

      remove(storedItemComponent);
      remove(storedFormComponent);
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
    this.#onEventChange(UserAction.UPDATE_EVENT, UpdateType.PATCH, { ...this.#event, isFavorite });
  };

  #onFormSubmit = (event) => {
    this.#onEventChange(UserAction.UPDATE_EVENT, UpdateType.MINOR, event);

    //! навеное не нужно, буде перерисовка при изменениях
    this.#replaceFormToItem();
    this.#onEventFormClose(); //!
  };

  #onDelete = (event) => {
    this.#onEventChange(UserAction.DELETE_EVENT, UpdateType.MINOR, event);

    //! выше есть такие же две строки... //! тоже скорее всего не нужно
    this.#replaceFormToItem();
    this.#onEventFormClose();
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
