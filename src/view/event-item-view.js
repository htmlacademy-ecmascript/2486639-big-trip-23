import AbstractView from '../framework/view/abstract-view.js';
import { DateFormat, getDurationString, getStringDate } from '../utils/date.js';
import { createElementsTemplate } from '../utils/dom.js';
import { capitalizeFirstLetter } from '../utils/string.js';

const createOfferTemplate = ({ title, price }) => `<li class="event__offer">
  <span class="event__offer-title">${title}</span>
  +€&nbsp;
  <span class="event__offer-price">${price}</span>
</li>`;

const createOffersTemplate = (offers) => `<h4 class="visually-hidden">Offers:</h4>
<ul class="event__selected-offers">
    ${createElementsTemplate(offers, createOfferTemplate)}
</ul>`;

const createEventItemTemplate = (event, destinationName, eventOffers) => {
  const
    { type,
      basePrice, //! почитать в ТЗ как считать сумму!
      dateFrom,
      dateTo,
      isFavorite } = event;

  const eventDateValue = getStringDate(dateFrom, DateFormat.DATE);
  const eventDate = getStringDate(dateFrom, DateFormat.MONTH_DAY);

  const eventDateFromValue = getStringDate(dateFrom, DateFormat.DATE_TIME);
  const eventDateFrom = getStringDate(dateFrom, DateFormat.TIME);
  const eventDateToValue = getStringDate(dateTo, DateFormat.DATE_TIME);
  const eventDateTo = getStringDate(dateTo, DateFormat.TIME);

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${eventDateValue}">${eventDate}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${capitalizeFirstLetter(type)} ${destinationName}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${eventDateFromValue}">${eventDateFrom}</time>
        —
        <time class="event__end-time" datetime="${eventDateToValue}">${eventDateTo}</time>
      </p>
      <p class="event__duration">${getDurationString(dateFrom, dateTo)}</p>
    </div>
    <p class="event__price">
      €&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    ${createOffersTemplate(eventOffers)}
    <button class="event__favorite-btn${(isFavorite) ? ' event__favorite-btn--active' : ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
    </div>
</li>`;
};

export default class EventItemView extends AbstractView {
  #event = null;
  #destinationName = null;
  #eventOffers = [];

  #onFavoriteClick = null;
  #onEditClick = null;

  constructor({ event, destinationName, eventOffers, onFavoriteClick, onEditClick }) {
    super();

    this.#event = event;
    this.#destinationName = destinationName;
    this.#eventOffers = eventOffers;
    this.#onFavoriteClick = onFavoriteClick;
    this.#onEditClick = onEditClick;

    this.element.querySelector('button.event__favorite-btn').addEventListener('click', this.#onFavoriteButtonClick);
    this.element.querySelector('button.event__rollup-btn').addEventListener('click', this.#onEditButtonClick);
  }

  get template() {
    return createEventItemTemplate(this.#event, this.#destinationName, this.#eventOffers);
  }

  #onFavoriteButtonClick = () => {
    this.#onFavoriteClick?.();
  };

  #onEditButtonClick = () => {
    this.#onEditClick?.(); //? лишняя проверка '?.'?
  };
}
