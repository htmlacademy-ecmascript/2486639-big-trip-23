import { remove } from '../framework/render.js';
import EventFormView from '../view/event-form-view.js';
import { isEscapeKey } from '../utils/utils.js';
import { UserAction, UpdateType } from '../const.js';

export default class EventEditPresenter {
  #destinations = null;
  #offers = null;
  #event = null;

  #formComponent = null;

  #onEventFormOpen = null;
  #onEventFormClose = null;
  #onEventChange = null;

  constructor({ destinations, offers, onEventFormOpen, onEventFormClose, onEventChange }) {
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onEventFormOpen = onEventFormOpen;
    this.#onEventFormClose = onEventFormClose;
    this.#onEventChange = onEventChange;
  }

  get component() {
    return this.#formComponent;
  }

  destroy() {
    remove(this.#formComponent); //! нужно ли?
  }

  init(event) {
    this.#event = event;

    this.#formComponent = new EventFormView({
      event,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#onFormSubmit,
      onDelete: this.#onDelete,
      onFormClose: this.#onFormClose
    });
  }

  resetEventForm = () => {
    this.#formComponent.resetForm();
  };

  closeEventForm = () => {
    this.#replaceFormToItem();
    this.#onEventFormClose();
  };

  #replaceFormToItem = () => {
    //!replace(this.#itemComponent, this.#formComponent);
    document.removeEventListener('keydown', this.#onDocumentKeyDown);
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
