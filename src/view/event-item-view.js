import AbstractView from '../framework/view/abstract-view.js';
import { createEventItemTemplate } from '../template/event-item-template.js';
import { getDestinationById, getEventOffers } from '../utils/event.js';

export default class EventItemView extends AbstractView {
  #event = null;
  #destinationName = null;
  #eventOffers = [];

  #onFavoriteClick = null;
  #onEditClick = null;

  constructor({ event, destinations, offers, onFavoriteClick, onEditClick }) {
    super();

    this.#event = event;
    this.#destinationName = getDestinationById(destinations, event.destination).name;
    this.#eventOffers = getEventOffers(event, offers);

    this.#onFavoriteClick = onFavoriteClick;
    this.#onEditClick = onEditClick;

    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#onFavoriteButtonElementClick);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onRollupButtonElementClick);
  }

  get template() {
    return createEventItemTemplate(this.#event, this.#destinationName, this.#eventOffers);
  }

  #onFavoriteButtonElementClick = () => {
    this.#onFavoriteClick();
  };

  #onRollupButtonElementClick = () => {
    this.#onEditClick();
  };
}
