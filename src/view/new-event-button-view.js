import AbstractView from '../framework/view/abstract-view.js';

export default class NewEventButtonView extends AbstractView {
  #onClick = null;

  constructor({ onClick }) {
    super();

    this.#onClick = onClick;

    this.element.addEventListener('click', this.#onButtonElementClick);
  }

  get template() {
    return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
  }

  enable() {
    this.element.disabled = false;
  }

  disable() {
    this.element.disabled = true;
  }

  #onButtonElementClick = (evt) => {
    evt.preventDefault();
    this.disable();

    this.#onClick();
  };
}
