import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getStringDate } from '../utils/date.js';
import { createElementsTemplate } from '../utils/dom.js';
import { isEmptyArray, isInputElement, findItemByKey, deleteItem } from '../utils/utils.js';
import { capitalizeFirstLetter } from '../utils/string.js';
import { findTypeOffers, findDestinationByName } from '../utils/event.js';
import { EVENT_TYPES, DateFormat, DEFAULT_FLATPICKR_CONFIG } from '../const.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const createTypeItemTemplate = (type, currentType) => `<div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${(type === currentType) ? 'checked' : ''}>
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
</div>`;

const createTypeListTemplate = (types, currentType) => `<div class="event__type-list">
  <fieldset class="event__type-group">
    <legend class="visually-hidden">Event type</legend>
    ${createElementsTemplate(types, createTypeItemTemplate, currentType)}
  </fieldset>
</div>`;

const createDestinationOptionTemplate = ({ name }) => `<option value="${name}"></option>`;

const createDestinationDatalistTemplate = (destinations) => `<datalist id="destination-list-1">
    ${createElementsTemplate(destinations, createDestinationOptionTemplate)}
</datalist>`;

const createOfferTemplate = ({ id, name, title, price }, eventOfferIds) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="${name}" data-offer-id="${id}" ${(eventOfferIds.includes(id)) ? 'checked' : ''}>
  <label class="event__offer-label" for="event-offer-${id}">
    <span class="event__offer-title">${title}</span>
    +€&nbsp;
    <span class="event__offer-price">${price}</span>
  </label>
</div>`;

const createSectionOffersTemplate = (typeOffers, eventOfferIds) => (isEmptyArray(typeOffers)) ? '' : `<div class="event__offer-selector">
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${createElementsTemplate(typeOffers, createOfferTemplate, eventOfferIds)}
    </div>
</section>`;

const createPhotoTemplate = ({ src, description }) => `<img class="event__photo" src="${src}" alt="${description}">`;

const createPhotosContainerTemplate = (pictures) => (isEmptyArray(pictures)) ? '' : `<div class="event__photos-container">
  <div class="event__photos-tape">
    ${createElementsTemplate(pictures, createPhotoTemplate)}
  </div>
</div>`;

const createSectionDestinationTemplate = ({ description, pictures }) => (description) ? `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${description}</p>
  ${createPhotosContainerTemplate(pictures)}
</section>` : '';

const createSectionDetailsTemplate = (typeOffers, eventOfferIds, destination) => (!isEmptyArray(typeOffers) || (destination?.description)) ? `<section class="event__details">
  ${createSectionOffersTemplate(typeOffers, eventOfferIds)}
  ${(destination) ? createSectionDestinationTemplate(destination) : ''}
</section>` : '';

const createEventFormTemplate = (event, destinations, isAddingNewEvent) => {
  const {
    type,
    destinationInfo,
    typeOffers,
    offers: eventOfferIds,
    dateFrom,
    dateTo,
    basePrice } = event;
  const destinationName = (destinationInfo) ? destinationInfo.name : '';
  const resetButtonCaption = (isAddingNewEvent) ? 'Cancel' : 'Delete';

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          ${createTypeListTemplate(EVENT_TYPES, type)}
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${capitalizeFirstLetter(type)}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
          ${createDestinationDatalistTemplate(destinations)}
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getStringDate(dateFrom, DateFormat.SHORT_DATE_TIME)}">
        —
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getStringDate(dateTo, DateFormat.SHORT_DATE_TIME)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          €
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${resetButtonCaption}</button>
      ${(isAddingNewEvent) ? '' : '<button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>'}
    </header>
    ${createSectionDetailsTemplate(typeOffers, eventOfferIds, destinationInfo)}
  </form>
<li>`;
};

export default class EventFormView extends AbstractStatefulView {
  #savedState = null;//! точно нужно?
  #isAddingNewEvent = false;
  #destinations = [];
  #offers = [];

  #onFormSubmit = null;
  #onDelete = null;
  #onFormClose = null;

  #dateFromFlatpickr = null;
  #dateToFlatpickr = null;

  //! подумать - начальные данные destinationInfo, typeOffers, можно определить по event.destination и event.type при отрисовкке, просто в презенторе эта информация уже найденна и подготовлена для ItemView
  constructor({ event, destinationInfo, typeOffers, destinations, offers, onFormSubmit, onDelete, onFormClose }) {
    super();

    this._setState(EventFormView.parseEventToState(event, destinationInfo, typeOffers));
    this.#savedState = this._state;
    this.#isAddingNewEvent = event.id === null; //! наследорвать для AddNew...

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
    if (isInputElement(evt.target)) {
      evt.preventDefault();
      const type = evt.target.value;
      const typeOffers = findTypeOffers(this.#offers, evt.target.value);
      const offers = [];

      this.updateElement({ type, typeOffers, offers });
    }
  };

  #onEventDestanationInputElementChange = (evt) => {
    if (isInputElement(evt.target)) {
      evt.preventDefault();
      const destinationInfo = findDestinationByName(this.#destinations, evt.target.value);
      console.log(destinationInfo);
      const destination = destinationInfo?.id;
      console.log(destination);

      this.updateElement({ destination, destinationInfo });
    }
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
    if (isInputElement(evt.target)) {
      const { checked, dataset: { offerId } } = evt.target;
      const { offers } = this._state;

      if (checked) {
        offers.push(offerId);
      } else {
        deleteItem(offers, offerId);
      }

      this._setState({ offers });
    }
  };

  #onEventFormElementSubmit = (evt) => {
    evt.preventDefault();
    //! тут добавить проверку, что пункт назначения не выбран
    this.#onFormSubmit(EventFormView.parseStateToEvent(this._state));
  };

  #onEventFormElementReset = (evt) => {
    evt.preventDefault();
    this.updateElement({ ...this.#savedState });
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

  static parseEventToState(event, destinationInfo, typeOffers) {
    return { ...event, destinationInfo, typeOffers };
  }

  static parseStateToEvent(state) {
    const event = { ...state };
    delete event.destinationInfo;
    delete event.typeOffers;

    return event;
  }
}
