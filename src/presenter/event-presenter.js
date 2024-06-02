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

  #isEditingMode = false;

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
      if (!this.#isEditingMode) {
        replace(this.#itemComponent, storedItemComponent);
      } else {
        replace(this.#formComponent, storedFormComponent);
        this.#isEditingMode = false;
      }

      remove(storedItemComponent);
      remove(storedFormComponent);
    }
  }

  closeEventForm() {
    if (this.#isEditingMode) {
      this.#formComponent.resetForm(this.#event);
      this.#replaceFormToItem();
      this.#onEventFormClose();
    }
  }

  setSaving() {
    if (this.#isEditingMode) {
      this.#formComponent.updateElement({ isSaving: true });
    }
  }

  setDeleting() {
    if (this.#isEditingMode) {
      this.#formComponent.updateElement({ isDeleting: true });
    }
  }

  setAborting() {
    if (!this.#isEditingMode) {
      this.#itemComponent.shake();
      return;
    }

    this.#formComponent.shake(() => {
      if (this.#isEditingMode) { // без условия не работал feedback / Если запрос не удалось выполнить, форма остаётся открытой, но если убрать условие if (this.#filterType === newFilterType) то то же тест проходит
        this.#formComponent.updateElement({ isSaving: false, isDeleting: false, });
      }
    });
  }

  #openForm() {
    this.#replaceItemToForm();
    this.#onEventFormOpen(this);
  }

  #replaceItemToForm() {
    replace(this.#formComponent, this.#itemComponent);
    document.addEventListener('keydown', this.#onDocumentKeyDown);
    this.#isEditingMode = true;
  }

  #replaceFormToItem() {
    replace(this.#itemComponent, this.#formComponent);
    document.removeEventListener('keydown', this.#onDocumentKeyDown);
    this.#isEditingMode = false;
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
