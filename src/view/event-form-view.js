import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { createEventFormTemplate } from '../template/event-form-template.js';
import { isInputElement } from '../utils/utils.js';
import { DEFAULT_FLATPICKR_CONFIG } from '../const.js';

export default class EventFormView extends AbstractStatefulView {
  #event = null;
  #isAddingNewEvent = false;
  #destinations = null;
  #destinationById = null;
  #offers = null;

  #onFormSubmit = null;
  #onResetButtonClick = null;
  #onFormClose = null;

  #dateFrom = null;
  #dateTo = null;

  constructor({ event, destinationsById, destinations, offers, onFormSubmit, onResetButtonClick, onFormClose }) {
    super();

    this.#event = event;
    this._setState(EventFormView.parseEventToState(event, destinationsById, offers));

    this.#isAddingNewEvent = !event.id;

    this.#destinations = destinations;
    this.#destinationById = destinationsById;
    this.#offers = offers;

    this.#onFormSubmit = onFormSubmit;
    this.#onResetButtonClick = onResetButtonClick;
    this.#onFormClose = onFormClose;

    this._restoreHandlers();
  }

  get template() {
    return createEventFormTemplate(this._state, this.#destinations, this.#isAddingNewEvent);
  }

  removeElement() {
    super.removeElement();

    [this.#dateFrom, this.#dateTo].forEach((dateFlatpickr) => {
      dateFlatpickr.destroy();
      dateFlatpickr = null;
    });
  }

  _restoreHandlers() {
    this.element.querySelector('.event__type-list').addEventListener('click', this.#onEventTypeListElementClick);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onEventDestanationInputElementChange);
    this.#setDateFlatpickrs();
    this.element.querySelector('.event__input--price').addEventListener('input', this.#onEventPriceInputElementInput);
    if (this._state.typeOffers.length) { // нет данных и событие не добавляю
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#onEventOffersDivElementChange);
    }
    const eventFormElement = this.element.querySelector('.event--edit');
    eventFormElement.addEventListener('submit', this.#onEventFormElementSubmit);
    eventFormElement.addEventListener('reset', this.#onEventFormElementReset);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onEventResetButtonElementClick);
    if (!this.#isAddingNewEvent) { // кнопка будет скрыта и событие не добавляю
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onEventRollupButtonElementClick);
    }
  }

  resetForm() {
    this.element.firstElementChild.reset();
  }

  #closeForm() {
    this.#onFormClose();
  }

  #setDateFlatpickrs = () => {
    const { dateFrom, dateTo } = this._state;

    this.#dateFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        ...DEFAULT_FLATPICKR_CONFIG,
        defaultDate: dateFrom,
        onChange: this.#onDateFromChange
      });

    this.#dateTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        ...DEFAULT_FLATPICKR_CONFIG,
        defaultDate: dateTo,
        minDate: dateFrom,
        onChange: this.#onDateToChange
      });
  };

  #onEventTypeListElementClick = (evt) => {
    if (!isInputElement(evt.target)) {
      return;
    }

    evt.preventDefault();
    const type = evt.target.value;
    const typeOffers = this.#offers.get(type);
    const eventOfferIds = new Set();

    this.updateElement({ type, typeOffers, eventOfferIds });
  };

  #onEventDestanationInputElementChange = (evt) => {
    if (!isInputElement(evt.target)) {
      return;
    }

    evt.preventDefault();
    const destinationInfo = this.#destinations.get(evt.target.value);
    const destination = destinationInfo?.id;

    this.updateElement({ destination, destinationInfo });
  };

  #onDateFromChange = ([dateFrom]) => {
    this.#dateTo.config.minDate = dateFrom;
    this._setState({ dateFrom });
  };

  #onDateToChange = ([dateTo]) => {
    this._setState({ dateTo });
  };

  #onEventPriceInputElementInput = (evt) => {
    const basePrice = parseInt(evt.target.value, 10);

    this._setState({ basePrice });
  };

  #onEventOffersDivElementChange = (evt) => {
    if (!isInputElement(evt.target)) {
      return;
    }

    const { checked, dataset: { offerId } } = evt.target;
    const { eventOfferIds } = this._state;

    if (checked) {
      eventOfferIds.add(offerId);
    } else {
      eventOfferIds.delete(offerId);
    }

    this._setState({ eventOfferIds });
  };

  #onEventFormElementSubmit = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit(EventFormView.parseStateToEvent(this._state));
  };

  #onEventFormElementReset = (evt) => {
    evt.preventDefault();
    this.updateElement(EventFormView.parseEventToState(this.#event, this.#destinationById, this.#offers));
  };

  #onEventResetButtonElementClick = (evt) => {
    evt.preventDefault();
    if (this.#isAddingNewEvent) {
      this.resetForm();
      this.#closeForm();
    } else {
      this.#onResetButtonClick(this.#event);
    }
  };

  #onEventRollupButtonElementClick = (evt) => {
    evt.preventDefault();
    this.resetForm();
    this.#closeForm();
  };

  static parseEventToState(event, destinationById, offers) {
    const { destination, type, offers: eventOffers } = event;
    const destinationInfo = destinationById.get(destination);
    const eventOfferIds = new Set(eventOffers);
    const typeOffers = offers.get(type);

    return {
      ...event,
      destinationInfo,
      eventOfferIds,
      typeOffers
    };
  }

  static parseStateToEvent(state) {
    const offers = [...state.eventOfferIds];
    const event = { ...state, offers };

    delete event.destinationInfo;
    delete event.eventOfferIds;
    delete event.typeOffers;

    return event;
  }
}
