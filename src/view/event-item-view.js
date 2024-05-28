import AbstractView from '../framework/view/abstract-view.js';
import { createEventItemTemplate } from '../template/event-item-template.js';

export default class EventItemView extends AbstractView {
  #event = null;

  #onFavoriteClick = null;
  #onEditClick = null;

  constructor({ event, onFavoriteClick, onEditClick }) {
    super();

    this.#event = event;
    this.#onFavoriteClick = onFavoriteClick;
    this.#onEditClick = onEditClick;

    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#onFavoriteButtonElementClick);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onEditButtonElementClick);
  }

  get template() {
    return createEventItemTemplate(this.#event);
  }

  #onFavoriteButtonElementClick = (evt) => {
    evt.preventDefault(); //! мигает при нажатии, но можно убрать
    this.#onFavoriteClick();
  };

  #onEditButtonElementClick = () => {
    this.#onEditClick();
  };
}
