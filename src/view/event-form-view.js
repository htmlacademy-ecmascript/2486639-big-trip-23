import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { isInputElement } from '../utils/utils.js';
import { DEFAULT_FLATPICKR_CONFIG, DEFAULT_NEW_EVENT } from '../const.js';
import { getEventOffers } from '../utils/event.js';
import { createEventFormTemplate } from '../template/event-form-template.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

export default class EventFormView extends AbstractStatefulView {
  #event = null;
  #isAddingNewEvent = false;
  #destinations = [];
  #offers = null;

  #onFormSubmit = null;
  #onDelete = null;
  #onFormClose = null;

  #dateFromFlatpickr = null;
  #dateToFlatpickr = null;

  constructor({ event, destinations, offers, onFormSubmit, onDelete, onFormClose }) {
    super();

    this.#event = event;
    this._setState({ ...event });
    this.#isAddingNewEvent = event.id === DEFAULT_NEW_EVENT.id;

    this.#destinations = destinations;
    this.#offers = offers;

    this.#onFormSubmit = onFormSubmit;
    this.#onDelete = onDelete;
    this.#onFormClose = onFormClose;

    this._restoreHandlers();
  }

  get template() {
    return createEventFormTemplate(this._state, this.#destinations, this.#isAddingNewEvent);
  }

  removeElement() {
    super.removeElement();

    [this.#dateFromFlatpickr, this.#dateToFlatpickr].forEach((dateFlatpickr) => {
      dateFlatpickr.destroy();
      dateFlatpickr = null;
    });
  }

  _restoreHandlers() {
    this.element.querySelector('.event__type-list').addEventListener('click', this.#onEventTypeListElementClick);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onEventDestanationInputElementChange);
    this.#setDateFlatpickrs();
    this.element.querySelector('.event__input--price').addEventListener('input', this.#onEventPriceInputElementInput);
    if (this._state.typeOffers.length) {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#onEventOffersDivElementChange);
    }
    const eventFormElement = this.element.querySelector('.event--edit');
    eventFormElement.addEventListener('submit', this.#onEventFormElementSubmit);
    eventFormElement.addEventListener('reset', this.#onEventFormElementReset);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onEventResetButtonElementClick);
    if (!this.#isAddingNewEvent) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onEventRollupButtonElementClick);
    }
  }

  resetForm() {
    this.element.firstElementChild.reset();
  }

  #setDateFlatpickrs = () => {
    const { dateFrom, dateTo } = this._state;

    this.#dateFromFlatpickr = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        ...DEFAULT_FLATPICKR_CONFIG,
        defaultDate: dateFrom,
        onChange: this.#onDateFromDatepickerElementChange
      });

    this.#dateToFlatpickr = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        ...DEFAULT_FLATPICKR_CONFIG,
        defaultDate: dateFrom,
        minDate: dateTo,
        onChange: this.#onDateToDatepickerElementChange
      });
  };

  #onEventTypeListElementClick = (evt) => {
    if (!isInputElement(evt.target)) {
      return;
    }

    evt.preventDefault();
    const type = evt.target.value;
    const typeOffers = this.#offers.get(type);
    const offers = new Set();

    this.updateElement({ type, typeOffers, offers });
  };

  #onEventDestanationInputElementChange = (evt) => {
    if (!isInputElement(evt.target)) {
      return;
    }

    evt.preventDefault();
    const destinationInfo = this.#destinations.get(evt.target.value);
    const destination = destinationInfo?.id; // так как destinationInfo может быть пусто, поле ощищено //! может другому обработать...

    this.updateElement({ destination, destinationInfo });
  };

  #onDateFromDatepickerElementChange = ([dateFrom]) => {
    this.#dateToFlatpickr.config.minDate = dateFrom;
    // обработка сброса даты во втором flatpickr, если текущая дата меньше новой minDate, то дата сбрасывается
    //! когда новое событие, то можно оставить как есть...
    if (!this.#dateToFlatpickr.selectedDates.length) {
      this.#dateToFlatpickr.setDate(dateFrom);
    }
    this._setState({ dateFrom });
  };

  #onDateToDatepickerElementChange = ([dateTo]) => {
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
    const { offers } = this._state;

    if (checked) {
      offers.add(offerId);
    } else {
      offers.delete(offerId);
    }

    this._setState({ offers });
  };

  #onEventFormElementSubmit = (evt) => {
    evt.preventDefault();
    //! тут добавить проверку, что пункт назначения не выбран, потрясти формой
    this.#onFormSubmit(EventFormView.parseStateToEvent(this._state));
  };

  #onEventFormElementReset = (evt) => {
    evt.preventDefault();
    this.updateElement({ ...this.#event });
  };

  #onEventResetButtonElementClick = (evt) => {
    evt.preventDefault();
    if (this.#isAddingNewEvent) {
      this.resetForm();
      this.#onFormClose();
    } else {
      this.#onDelete(this._state.id);
    }
  };

  #onEventRollupButtonElementClick = (evt) => {
    evt.preventDefault();
    this.resetForm();
    this.#onFormClose();
  };

  static parseStateToEvent(state) {
    // дополняем информацию о typeOffers, т.к. при изменениях изменялисть только offers
    const { typeOffers, offers } = state;
    const eventOffers = getEventOffers(typeOffers, offers);
    const event = { ...state, eventOffers };

    return event;
  }
}
