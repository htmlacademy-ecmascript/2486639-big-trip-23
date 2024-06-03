import he from 'he';
import { getStringDate } from '../utils/date.js';
import { createElementsTemplate } from '../utils/dom.js';
import { capitalizeFirstLetter, isEmptyArray } from '../utils/common.js';
import { EVENT_TYPES, DateFormat } from '../const.js';
import { getDestinationName } from '../utils/event.js';

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
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="${name}" data-offer-id="${id}" ${(eventOfferIds.has(id)) ? 'checked' : ''}>
  <label class="event__offer-label" for="event-offer-${id}">
    <span class="event__offer-title">${title}</span>
    +€&nbsp;
    <span class="event__offer-price">${price}</span>
  </label>
</div>`;

const createSectionOffersTemplate = (typeOffers, eventOfferIds) => (isEmptyArray(typeOffers)) ? '' : `<section class="event__section  event__section--offers">
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

const getResetButtonCaption = (isAddingNewEvent, isDeleting) => {
  if (isAddingNewEvent) {
    return 'Cancel';
  }

  if (isDeleting) {
    return 'Deleting...';
  }

  return 'Delete';
};

const createEventFormTemplate = (event, destinations, isAddingNewEvent) => {
  const { type, basePrice, dateFrom, dateTo, eventOfferIds, destinationInfo, typeOffers, isSaving, isDeleting } = event;
  const resetButtonCaption = getResetButtonCaption(isAddingNewEvent, isDeleting);

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
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(getDestinationName(destinationInfo))}" list="destination-list-1">
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
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${(basePrice === null) ? '' : basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">${(isSaving) ? 'Saving...' : 'Save'}</button>
      <button class="event__reset-btn" type="reset">${resetButtonCaption}</button>
      ${(isAddingNewEvent) ? '' : '<button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>'}
    </header>
    ${createSectionDetailsTemplate(typeOffers, eventOfferIds, destinationInfo)}
  </form>
<li>`;
};

export { createEventFormTemplate };
