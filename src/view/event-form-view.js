import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getStringDate, DateFormat } from '../utils/date.js';
import { createElementsTemplate } from '../utils/dom.js';
import { deleteItem, isEmptyArray, isInputElement } from '../utils/utils.js';
import { capitalizeFirstLetter } from '../utils/string.js';
import { EVENT_TYPES } from '../const.js';

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

const createEventFormTemplate = (event, destinations) => {
  const {
    /*id,*/ //! пока не используется, при добавлении нет=null?, при редактировании подставить
    type,
    destination,
    typeOffers,
    offers: eventOfferIds,
    dateFrom,
    dateTo,
    basePrice } = event;
  const destinationName = (destination) ? destination.name : '';
  const isEditing = true; //! временно - при добавление, нет кнопки ^, при редактировании она есть и кнопки разные, но еще по ТЗ будет меняться текст при работе с сервером
  const resetButtonCaption = (isEditing) ? 'Delete' : 'Cancel';

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
      ${(isEditing) ? '<button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>' : ''}
    </header>
    ${createSectionDetailsTemplate(typeOffers, eventOfferIds, destination)}
  </form>
<li>`;
};

export default class EventFormView extends AbstractStatefulView {
  #destinations = null;

  #onGetTypeOffers = null;
  #onGetDestinationByName = null;
  #onFormSubmit = null;
  #onDelete = null;
  #onFormClose = null;

  constructor({ event, destinations, onGetTypeOffers, onGetDestinationByName, onFormSubmit, onDelete, onFormClose }) {
    super();
    this._setState({ ...event }); //! пока не стал делать static parseEventToState(event)

    this.#destinations = destinations; //! при измении пунтка назначения, можно заменить информацию, если по ТЗ не нужно обновлять destinations с сервера

    this.#onGetTypeOffers = onGetTypeOffers;
    this.#onGetDestinationByName = onGetDestinationByName;
    this.#onFormSubmit = onFormSubmit;
    this.#onDelete = onDelete;
    this.#onFormClose = onFormClose;

    this._restoreHandlers();
  }

  get template() {
    return createEventFormTemplate(this._state, this.#destinations);
  }

  _restoreHandlers() {
    this.element.querySelector('.event__type-list').addEventListener('click', this.#onEventTypeListElementClick);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onEventDestanationInputElementChange);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#onEventPriceInputElementInput);
    if (this._state.offers.length) {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#onEventOffersDivElementChange);
    }
    this.element.querySelector('.event--edit').addEventListener('submit', this.#onEventFormElementSubmit);
    //! или reset, но потом будет ясно...
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onEventResetButtonElementClick);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onEventRollupButtonElementClick);
  }

  resetForm() {
    this.element.firstElementChild.reset();
  }

  #onEventTypeListElementClick = (evt) => {
    if (isInputElement(evt.target)) {
      evt.preventDefault();
      const type = evt.target.value;
      const typeOffers = this.#onGetTypeOffers(evt.target.value);
      const offers = [];

      this.updateElement({ type, typeOffers, offers });
    }
  };

  #onEventDestanationInputElementChange = (evt) => {
    if (isInputElement(evt.target)) {
      evt.preventDefault();
      const destination = this.#onGetDestinationByName(evt.target.value);

      this.updateElement({ destination });
    }
  };

  #onEventPriceInputElementInput = (evt) => {
    const basePrice = evt.target.value;

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

  #onEventResetButtonElementClick = (evt) => {
    evt.preventDefault();
    this.#onDelete(this._state.id);
  };

  #onEventRollupButtonElementClick = (evt) => {
    evt.preventDefault();
    this.resetForm();
    this.#onFormClose();
  };

  static parseStateToEvent(state) {
    const event = { ...state };
    event.destination = state.destination.id;
    delete event.typeOffers;

    return event;
  }
}
