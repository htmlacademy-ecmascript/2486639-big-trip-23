import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import he from 'he';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { createEventFormTemplate } from '../template/event-form-template.js';
import { isInputElement, getNumber } from '../utils/utils.js';
import { DEFAULT_FLATPICKR_CONFIG } from '../const.js';
import { getDestinationById, getDestinationByName, getDestinationNames } from '../utils/event.js';
import { getISOString } from '../utils/date.js';

export default class EventFormView extends AbstractStatefulView {
  #isAddingNewEvent = false;
  #destinations = null;
  #offers = null;

  #destinationNames = null;
  #storedDestinationInputValue = '';

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

    this.#destinationNames = getDestinationNames(destinations);
    this.#storedDestinationInputValue = this._state.destinationInfo?.name;

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
    const destanationInputElement = this.element.querySelector('.event__input--destination');
    destanationInputElement.addEventListener('change', this.#onDestanationInputElementChange);
    destanationInputElement.addEventListener('input', this.#onDestanationInputElementInput);
    this.#prepareDates();
    this.element.querySelector('.event__input--price').addEventListener('input', this.#onPriceInputElementInput);
    if (this._state.typeOffers.length) { // нет данных и событие не добавляю
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#onOffersDivElementChange);
    }
    this.element.querySelector('.event--edit').addEventListener('submit', this.#onFormElementSubmit);
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

  #onDestanationInputElementChange = (evt) => {
    if (!isInputElement(evt.target)) {
      return;
    }

    evt.preventDefault();
    const destinationInfo = getDestinationByName(this.#destinations, evt.target.value);
    const destination = destinationInfo?.id;

    this.updateElement({ destination, destinationInfo });
  };

  #onDestanationInputElementInput = (evt) => {
    const inputValue = he.encode(evt.target.value.trim().toLowerCase());

    //! возможно будут ошибки на автотестах
    if (!inputValue) {
      this.#storedDestinationInputValue = '';
      evt.target.value = ' '; // ' ' чтоб отобразился полный список городов
      return;
    }

    if (this.#destinationNames.some((value) => value.includes(inputValue))) {
      this.#storedDestinationInputValue = inputValue;
    } else {
      evt.target.value = this.#storedDestinationInputValue;
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
    //! возможно будут ошибки на автотестах
    const basePrice = getNumber(he.encode(evt.target.value));
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
    };
  }

  static parseStateToEvent(state) {
    const { dateFrom, dateTo, eventOfferIds } = state;
    const event = {
      ...state,
      offers: [...eventOfferIds],
      // по описанию API нужен ISO, но без преобразования сервер не выдает ошибки и обновление проходит успешно
      dateFrom: getISOString(dateFrom),
      dateTo: getISOString(dateTo)
    };

    delete event.destinationInfo;
    delete event.eventOfferIds;
    delete event.typeOffers;

    return event;
  }
}
