import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { createEventFormTemplate } from '../template/event-form-template.js';
import { isInputElement, getNumber } from '../utils/utils.js';
import { DEFAULT_FLATPICKR_CONFIG } from '../const.js';
import { getDestinationById, getDestinationNames } from '../utils/event.js';

export default class EventFormView extends AbstractStatefulView {
  #event = null;
  #isAddingNewEvent = false;
  #destinations = null;
  #destinationNames = null;
  #offers = null;

  #onFormSubmit = null;
  #onResetButtonClick = null;
  #onFormClose = null;

  #dateFrom = null;
  #dateTo = null;

  constructor({ event, destinations, offers, onFormSubmit, onResetButtonClick, onFormClose }) {
    super();

    this.#event = event;
    this._setState(EventFormView.parseEventToState(event, destinations, offers));

    this.#isAddingNewEvent = !event.id;

    this.#destinations = destinations;
    this.#destinationNames = getDestinationNames(destinations);
    this.#offers = offers;

    this.#onFormSubmit = onFormSubmit;
    this.#onResetButtonClick = onResetButtonClick;
    this.#onFormClose = onFormClose;

    this._restoreHandlers();
  }

  get template() {
    return createEventFormTemplate(this._state, this.#destinationNames, this.#isAddingNewEvent);
  }

  removeElement() {
    super.removeElement();

    [this.#dateFrom, this.#dateTo].forEach((dateFlatpickr) => {
      dateFlatpickr.destroy();
      dateFlatpickr = null;
    });
  }

  _restoreHandlers() {
    this.element.querySelector('.event__type-list').addEventListener('click', this.#onTypeListElementClick);
    const destanationInputElement = this.element.querySelector('.event__input--destination');
    destanationInputElement.addEventListener('change', this.#onDestanationInputElementChange);
    destanationInputElement.addEventListener('input', this.#onDestanationInputElementInput);
    this.#prepareDates();
    this.element.querySelector('.event__input--price').addEventListener('input', this.#onPriceInputElementInput);
    if (this._state.typeOffers.length) { // нет данных и событие не добавляю
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#onOffersDivElementChange);
    }
    const eventFormElement = this.element.querySelector('.event--edit');
    eventFormElement.addEventListener('submit', this.#onFormElementSubmit);
    eventFormElement.addEventListener('reset', this.#onFormElementReset);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onResetButtonElementClick);
    if (!this.#isAddingNewEvent) { // кнопка будет скрыта и событие не добавляю
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onRollupButtonElementClick);
    }
  }

  resetForm() {
    this.element.firstElementChild.reset();
  }

  #closeForm() {
    this.#onFormClose();
  }

  #prepareDates() {
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
  }

  #onTypeListElementClick = (evt) => {
    if (!isInputElement(evt.target)) {
      return;
    }

    evt.preventDefault();
    const type = evt.target.value;
    const typeOffers = this.#offers.get(type);
    const eventOfferIds = new Set();

    this.updateElement({ type, typeOffers, eventOfferIds });
  };

  #onDestanationInputElementChange = (evt) => {
    if (!isInputElement(evt.target)) {
      return;
    }

    evt.preventDefault();
    const destinationInfo = this.#destinations.get(evt.target.value);
    const destination = destinationInfo?.id;

    this.updateElement({ destination, destinationInfo });
  };

  #onDestanationInputElementInput = (evt) => {
    //!!
    evt.target.value = evt.target.value.trim();
    //console.log(evt.target.value);

    //console.log(this.#destinationNames.some((value) => value.includes(evt.target.value.trim()))); //! lowerCase
  };

  #onDateFromChange = ([dateFrom]) => {
    this.#dateTo.config.minDate = dateFrom;
    this._setState({ dateFrom });
  };

  #onDateToChange = ([dateTo]) => {
    this._setState({ dateTo });
  };

  #onPriceInputElementInput = (evt) => {
    const basePrice = getNumber(evt.target.value);
    evt.target.value = basePrice;

    this._setState({ basePrice });
  };

  #onOffersDivElementChange = (evt) => {
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

  #onFormElementSubmit = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit(EventFormView.parseStateToEvent(this._state));
  };

  #onFormElementReset = (evt) => {
    evt.preventDefault();
    this.updateElement(EventFormView.parseEventToState(this.#event, this.#destinations, this.#offers));
  };

  #onResetButtonElementClick = (evt) => {
    evt.preventDefault();
    if (this.#isAddingNewEvent) {
      this.resetForm();
      this.#closeForm();
    } else {
      this.#onResetButtonClick(this.#event);
    }
  };

  #onRollupButtonElementClick = (evt) => {
    evt.preventDefault();
    this.resetForm();
    this.#closeForm();
  };

  static parseEventToState(event, destinations, offers) {
    const { destination, type, offers: eventOffers } = event;
    const destinationInfo = getDestinationById(destinations, destination);
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
    const basePrice = state.basePrice || 0;
    const offers = [...state.eventOfferIds];
    const event = { ...state, basePrice, offers };

    delete event.destinationInfo;
    delete event.eventOfferIds;
    delete event.typeOffers;

    return event;
  }
}
