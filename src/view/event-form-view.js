import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { createEventFormTemplate } from '../template/event-form-template.js';
import { isInputElement, getPositiveNumber } from '../utils/common.js';
import { DEFAULT_FLATPICKR_CONFIG } from '../const.js';
import { getDestinationById, getDestinationByName, getDestinationName } from '../utils/event.js';
import { getISOString } from '../utils/date.js';

export default class EventFormView extends AbstractStatefulView {
  #isAddingNewEvent = false;
  #destinations = null;
  #offers = null;

  #onFormSubmit = null;
  #onResetButtonClick = null;
  #onFormClose = null;

  #dateFrom = null;
  #dateTo = null;

  constructor({ event, destinations, offers, onFormSubmit, onResetButtonClick, onFormClose }) {
    super();

    this._setState(EventFormView.parseEventToState(event, destinations, offers));

    this.#isAddingNewEvent = !event.id;

    this.#destinations = destinations;
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
    this.element.querySelector('.event__type-list').addEventListener('click', this.#onTypeListElementClick);
    const destinationInputElement = this.element.querySelector('.event__input--destination');
    destinationInputElement.addEventListener('input', this.#onDestinationInputElementInput);
    destinationInputElement.addEventListener('change', this.#onDestinationInputElementChange);
    this.#prepareDates();
    this.element.querySelector('.event__input--price').addEventListener('input', this.#onPriceInputElementInput);
    if (this._state.typeOffers.length) { // нет данных и событие не добавляю
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#onAvailableOffersDivElementChange);
    }
    this.element.querySelector('.event--edit').addEventListener('submit', this.#onEditFormElementSubmit);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onResetButtonElementClick);
    if (!this.#isAddingNewEvent) { // кнопка будет скрыта и событие не добавляю
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onRollupButtonElementClick);
    }
  }

  resetForm(event) {
    this.updateElement(EventFormView.parseEventToState(event, this.#destinations, this.#offers));
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

  #onDestinationInputElementChange = (evt) => {
    const inputValue = evt.target.value.trim();
    if (!inputValue) {
      evt.target.value = getDestinationName(this._state.destinationInfo);
    }
  };

  #onDestinationInputElementInput = (evt) => {
    const inputValue = evt.target.value.trim();

    if (!inputValue) {
      evt.target.value = ' '; // пробел нужен для отображения всего списока городов
      return;
    }

    const destinationInfo = getDestinationByName(this.#destinations, inputValue);
    if (destinationInfo) {
      const destination = destinationInfo.id;
      this.updateElement({ destination, destinationInfo });
      return;
    }

    if (!this.#destinations.find(({ name }) => name.toLowerCase().includes(inputValue.toLowerCase()))) {
      evt.target.value = getDestinationName(this._state.destinationInfo);
    }
  };

  #onDateFromChange = ([dateFrom]) => {
    this.#dateTo.config.minDate = dateFrom;
    this._setState({ dateFrom });
  };

  #onDateToChange = ([dateTo]) => {
    this._setState({ dateTo });
  };

  #onPriceInputElementInput = (evt) => {
    const basePrice = getPositiveNumber(evt.target.value);
    evt.target.value = basePrice;

    this._setState({ basePrice });
  };

  #onAvailableOffersDivElementChange = (evt) => {
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

  #onEditFormElementSubmit = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit(EventFormView.parseStateToEvent(this._state));
  };

  #onResetButtonElementClick = (evt) => {
    evt.preventDefault();
    if (this.#isAddingNewEvent) {
      this.#closeForm();
    } else {
      this.#onResetButtonClick(EventFormView.parseStateToEvent(this._state));
    }
  };

  #onRollupButtonElementClick = (evt) => {
    evt.preventDefault();
    this.#closeForm();
  };

  static parseEventToState(event, destinations, offers) {
    const { type, destination, offers: eventOffers } = event;

    return {
      ...event,
      destinationInfo: getDestinationById(destinations, destination),
      eventOfferIds: new Set(eventOffers),
      typeOffers: offers.get(type),
      isSaving: false,
      isDeleting: false
    };
  }

  static parseStateToEvent(state) {
    const { dateFrom, dateTo, eventOfferIds } = state;
    const event = {
      ...state,
      offers: [...eventOfferIds],
      // по описанию API нужен ISO, но без преобразования даты сервер не выдает ошибки и обновление проходит успешно
      dateFrom: getISOString(dateFrom),
      dateTo: getISOString(dateTo)
    };

    delete event.destinationInfo;
    delete event.eventOfferIds;
    delete event.typeOffers;
    delete event.isSaving;
    delete event.isDeleting;

    return event;
  }
}
