import AbstractView from '../framework/view/abstract-view.js';
import { createEventItemTemplate } from '../template/event-item-template.js';

export default class EventItemView extends AbstractView {
  #event = null;
  #destinationName = null;
  #typeOffers = [];

  #onFavoriteClick = null;
  #onEditClick = null;

  constructor({ event, destinationsById, offers, onFavoriteClick, onEditClick }) {
    super();

    const { destination, type } = event;
    this.#event = event;
    this.#destinationName = destinationsById.get(destination).name;
    this.#typeOffers = offers.get(type);

    this.#onFavoriteClick = onFavoriteClick;
    this.#onEditClick = onEditClick;

    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#onFavoriteButtonElementClick);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onEditButtonElementClick);
  }

  get template() {
    return createEventItemTemplate(this.#event, this.#destinationName, this.#typeOffers);
  }

  #onFavoriteButtonElementClick = (evt) => {
    evt.preventDefault(); //! мигает при нажатии, но можно убрать
    this.#onFavoriteClick();
  };

  #onEditButtonElementClick = () => {
    this.#onEditClick();
  };
}
