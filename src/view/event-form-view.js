import AbstractView from '../framework/view/abstract-view.js';
import { getStringDate, DateFormat } from '../utils/date.js';
import { createElementsTemplate } from '../utils/dom.js';
import { isEmptyArray } from '../utils/utils.js';
import { capitalizeFirstLetter } from '../utils/string.js';
import { EVENT_TYPES } from '../const.js';

const createTypeItemTemplate = (type) => `<div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
</div>`;

const createTypeListTemplate = (types) => `<div class="event__type-list">
  <fieldset class="event__type-group">
    <legend class="visually-hidden">Event type</legend>
    ${createElementsTemplate(types, createTypeItemTemplate)}
  </fieldset>
</div>`;

const createDestinationOptionTemplate = ({ name }) => `<option value="${name}"></option>`;

const createDestinationDatalistTemplate = (destinations) => `<datalist id="destination-list-1">
    ${createElementsTemplate(destinations, createDestinationOptionTemplate)}
</datalist>`;

const createOfferTemplate = ({ id, name, title, price }, eventOffers) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="${id}" type="checkbox" name="${name}" ${(eventOffers.includes(id)) ? 'checked' : ''}>
  <label class="event__offer-label" for="${id}">
    <span class="event__offer-title">${title}</span>
    +€&nbsp;
    <span class="event__offer-price">${price}</span>
  </label>
</div>`;

const createSectionOffersTemplate = (typeOffers, eventOffers) => (isEmptyArray(typeOffers)) ? '' : `<div class="event__offer-selector">
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${createElementsTemplate(typeOffers, createOfferTemplate, eventOffers)}
    </div>
</section>`;

const createPhotoTemplate = ({ src, description }) => `<img class="event__photo" src="${src}" alt="${description}">`;

const createPhotosContainerTemplate = (pictures) => (isEmptyArray(pictures)) ? '' : `<div class="event__photos-container">
  <div class="event__photos-tape">
    ${createElementsTemplate(pictures, createPhotoTemplate)}
  </div>
</div>`;

const createSectionDestinationTemplate = ({ description, pictures }) => (!description) ? '' : `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${description}</p>
  ${createPhotosContainerTemplate(pictures)}
</section>`;

const createSectionDetailsTemplate = (typeOffers, eventOffers, destination) => (isEmptyArray(typeOffers) && !destination.description) ? '' : `<section class="event__details">
  ${createSectionOffersTemplate(typeOffers, eventOffers)}
  ${createSectionDestinationTemplate(destination)}
</section>`;

const createEventFormTemplate = (event, destination, destinations, typeOffers, eventOffers) => {
  //!Посомтреть в ТЗ нужно ли сортировать destinations и offers по алфивиту для отображения?

  const {
    /*id, //! пока не используется, при добавлении нет=null?, при редактировании подставить*/
    type,
    dateFrom,
    dateTo,
    basePrice } = event;
  const destinationName = destination.name;
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

          ${createTypeListTemplate(EVENT_TYPES)}
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
    ${createSectionDetailsTemplate(typeOffers, eventOffers, destination)}
  </form>
<li>`;
};

export default class EventFormView extends AbstractView {
  #event = null;
  #destination = null;
  #destinations = [];
  #typeOffers = [];

  #onSubmit = null;
  #onClose = null;

  constructor({ event, destination, typeOffers, destinations, onSubmit, onClose }) {
    super();

    this.#event = event;
    this.#destination = destination;
    this.#typeOffers = typeOffers; //! если передать все offers, то можно обработать изменения типа, если по ТЗ не нужно обновлять offers с сервера
    this.#destinations = destinations; //! при измении пунтка назначения, можно заменить информацию, если по ТЗ не нужно обновлять destinations с сервера

    this.#onSubmit = onSubmit;
    this.#onClose = onClose;

    this.element.querySelector('form.event.event--edit').addEventListener('submit', this.#onFormSubmit);
    this.element.querySelector('button.event__rollup-btn').addEventListener('click', this.#onEventRollupButtonClick);
  }

  get template() {
    //! Поиск вынести в отдельную функцию и забрать с events-presenter.js const eventOffers = typeOffers.filter((offer) => offers.includes(offer.id));
    //! в createOfferTemplate offers.includes...
    return createEventFormTemplate(this.#event, this.#destination, this.#destinations, this.#typeOffers, this.#event.offers);
  }

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    this.#onSubmit?.();
  };

  #onEventRollupButtonClick = (evt) => {
    evt.preventDefault();
    this.#onClose?.();
  };
}
