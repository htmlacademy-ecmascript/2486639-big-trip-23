import { replace } from '../framework/render.js';
import EventItemPresenter from './event-item-presenter.js';
import EventEditPresenter from './event-edit-presenter.js';
import { isEscapeKey } from '../utils/utils.js';
import { UserAction, UpdateType } from '../const.js';

export default class EventPresenter {
  #destinations = null;
  #offers = null;
  #event = null;

  #eventItemPresenter = null;
  #eventEditPresenter = null;

  #onEventFormOpen = null;
  #onEventFormClose = null;
  #onEventChange = null;

  constructor({ destinations, offers, containerElement, onEventFormOpen, onEventFormClose, onEventChange }) {
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onEventFormOpen = onEventFormOpen;
    this.#onEventFormClose = onEventFormClose;
    this.#onEventChange = onEventChange;

    this.#eventItemPresenter = new EventItemPresenter({
      containerElement,
      onEditClick: this.#onEditClick,
      onEventChange: this.#onFavoriteClick
    });
    this.#eventEditPresenter = new EventEditPresenter({
      destinations: this.#destinations,
      offers: this.#offers,
      onEventFormOpen: this.#onEventFormOpen,
      onEventFormClose: this.#onEventFormClose,
      onEventChange: this.#onEventChange
    });
  }

  destroy() {
    this.#eventItemPresenter.destroy();
    this.#eventEditPresenter.destroy();
  }

  init(event) {
    this.#event = event;
    this.#eventItemPresenter.init(event);
  }

  #openForm() {
    this.#eventEditPresenter.init(this.#event);
    replace(this.#eventEditPresenter.component, this.#eventItemPresenter.component);
    document.addEventListener('keydown', this.#onDocumentKeyDown);
    this.#onEventFormOpen(this);
  }

  resetEventForm = () => {
    //!this.#formComponent.resetForm();
  };

  closeEventForm = () => {
    this.#replaceFormToItem();
    this.#onEventFormClose();
  };

  #replaceFormToItem = () => {
    replace(this.#eventItemPresenter.component, this.#eventEditPresenter.component);
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
    //! не все изменения UpdateType.MINOR, может быть и PATCH, только сумма изменена, может доавбить ключ...
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
