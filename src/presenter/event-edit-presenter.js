import { remove } from '../framework/render.js';
import EventFormView from '../view/event-form-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class EventEditPresenter {
  #destinations = null;
  #offers = null;

  #formComponent = null;

  #onFormClose = null;
  #onEventChange = null;

  constructor({ destinations, offers, onFormClose, onEventChange }) {
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onFormClose = onFormClose;
    this.#onEventChange = onEventChange;
  }

  get component() {
    return this.#formComponent;
  }

  destroy() {
    remove(this.#formComponent); //! нужно ли?
  }

  init(event) {
    this.#formComponent = new EventFormView({
      event,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#onFormSubmit,
      onDelete: this.#onDelete,
      onFormClose: this.#onFormClose
    });
  }

  resetForm() {
    this.#formComponent.resetForm();
  }

  #onFormSubmit = (event) => {
    //! не все изменения UpdateType.MINOR, может быть и PATCH, только сумма изменена, может доавбить ключ...
    this.#onEventChange(UserAction.UPDATE_EVENT, UpdateType.MINOR, event);
  };

  #onDelete = (event) => {
    this.#onEventChange(UserAction.DELETE_EVENT, UpdateType.MINOR, event);
  };
}
