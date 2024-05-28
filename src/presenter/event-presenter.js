import { replace } from '../framework/render.js';
import EventItemPresenter from './event-item-presenter.js';
import EventEditPresenter from './event-edit-presenter.js';
import { isEscapeKey } from '../utils/utils.js';

export default class EventPresenter {
  #event = null;
  #destinations = null;
  #offers = null;

  #eventItemPresenter = null;
  #eventEditPresenter = null;

  #onEventFormOpen = null;
  #onEventFormClose = null;

  constructor({ destinations, offers, containerElement, onEventFormOpen, onEventFormClose, onEventChange }) {
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onEventFormOpen = onEventFormOpen;
    this.#onEventFormClose = onEventFormClose;

    this.#eventItemPresenter = new EventItemPresenter({
      containerElement,
      onEditClick: this.#onEditClick,
      onEventChange: onEventChange
    });
    this.#eventEditPresenter = new EventEditPresenter({
      destinations: this.#destinations,
      offers: this.#offers,
      onFormClose: this.#onFormClose,
      onEventChange: onEventChange
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

  resetEventForm() {
    this.#eventEditPresenter.resetForm();
  }

  closeEventForm() {
    this.#replaceFormToItem();
    this.#onEventFormClose();
  }

  #openForm() {
    this.#eventEditPresenter.init(this.#event);
    this.#replaceItemToForm();
    this.#onEventFormOpen(this);
  }

  #replaceItemToForm() {
    replace(this.#eventEditPresenter.component, this.#eventItemPresenter.component);
    document.addEventListener('keydown', this.#onDocumentKeyDown);
  }

  #replaceFormToItem() {
    replace(this.#eventItemPresenter.component, this.#eventEditPresenter.component);
    document.removeEventListener('keydown', this.#onDocumentKeyDown);
  }

  #onEditClick = () => {
    this.#openForm();
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
