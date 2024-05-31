import { render, replace, remove } from '../framework/render.js';
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
    const storedItemComponent = this.#itemComponent;
    const storedFormComponent = this.#formComponent;

    this.#itemComponent = new EventItemView({
      event,
      destinations: this.#destinations,
      offers: this.#offers,
      onFavoriteClick: this.#onFavoriteClick,
      onEditClick: this.#onEditClick
    });

    this.#formComponent = new EventFormView({
      event,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#onFormSubmit,
      onResetButtonClick: this.#onDelete,
      onFormClose: this.#onFormClose
    });

    if (!storedItemComponent || !storedFormComponent) {
      render(this.#itemComponent, this.#containerElement);
    } else {
      replace(this.#itemComponent, storedItemComponent);

      remove(storedItemComponent);
      remove(storedFormComponent);
    }
  }

  closeEventForm() {
    this.#formComponent.resetForm(this.#event);
    this.#replaceFormToItem();
    this.#onEventFormClose();
  }

  setSaving() {
    this.#formComponent.updateElement({ isSaving: true });
  }

  setDeleting() {
    this.#formComponent.updateElement({ isDeleting: true });
  }

  #openForm() {
    this.#replaceItemToForm();
    this.#onEventFormOpen(this);
  }

  #replaceItemToForm() {
    replace(this.#formComponent, this.#itemComponent);
    document.addEventListener('keydown', this.#onDocumentKeyDown);
  }

  #replaceFormToItem() {
    replace(this.#itemComponent, this.#formComponent);
    document.removeEventListener('keydown', this.#onDocumentKeyDown);
  }

  #onEditClick = () => {
    this.#openForm();
  };

  #onFavoriteClick = () => {
    const isFavorite = !this.#event.isFavorite;
    this.#onEventChange(UserAction.UPDATE_EVENT, UpdateType.PATCH, { ...this.#event, isFavorite });
  };

  #onFormSubmit = (event) => {
    this.#onEventChange(UserAction.UPDATE_EVENT, UpdateType.MINOR, event);
  };

  #onDelete = (event) => {
    this.#onEventChange(UserAction.DELETE_EVENT, UpdateType.MINOR, event);
  };

  #onFormClose = () => {
    this.closeEventForm();
  };

  #onDocumentKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.closeEventForm();
    }
  };
}
