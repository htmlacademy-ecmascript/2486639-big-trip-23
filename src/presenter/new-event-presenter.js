import { render, remove, RenderPosition } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';
import EventFormView from '../view/event-form-view.js';
import { NEW_EVENT, UserAction, UpdateType } from '../const.js';

export default class NewEventPresenter {
  #containerElement = null;

  #destinations = [];
  #offers = null;
  #event = null;

  #formComponent = null;

  #onNewEventFormClose = null;
  #onEventChange = null;

  constructor({ destinations, offers, containerElement, onNewEventFormClose, onEventChange }) {
    this.#destinations = destinations;
    this.#offers = offers;
    this.#containerElement = containerElement;
    this.#onNewEventFormClose = onNewEventFormClose;
    this.#onEventChange = onEventChange;
  }

  destroy() {
    remove(this.#formComponent);
  }

  init() {
    this.#event = NEW_EVENT;

    this.#formComponent = new EventFormView({
      event: this.#event,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#onFormSubmit,
      onFormClose: this.#onFormClose
    });

    render(this.#formComponent, this.#containerElement, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onDocumentKeydown);
  }

  closeNewEventForm() {
    document.removeEventListener('keydown', this.#onDocumentKeydown);
    this.#onNewEventFormClose();
  }

  setSaving() {
    this.#formComponent.updateElement({ isSaving: true });
  }

  setAborting() {
    this.#formComponent.shake(() => {
      this.#formComponent.updateElement({ isSaving: false, isDeleting: false });
    });
  }

  #onFormSubmit = (event) => {
    this.#onEventChange(UserAction.ADD_EVENT, UpdateType.MINOR, event);
  };

  #onFormClose = () => {
    this.closeNewEventForm();
  };

  #onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.closeNewEventForm();
    }
  };
}
