import AbstractView from '../framework/view/abstract-view.js';
import { createEventItemTemplate } from '../template/event-item-template.js';

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

    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#onFavoriteButtonElementClick);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onEditButtonElementClick);
  }

  get template() {
    return createEventItemTemplate(this.#event, this.#destinationName, this.#eventOffers);
  }

  #onFavoriteButtonElementClick = () => {
    this.#onFavoriteClick();
  };

  #onEditButtonElementClick = () => {
    this.#onEditClick();
  };
}
