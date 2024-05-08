import AbstractView from '../framework/view/abstract-view.js';

const createTripMessageTemplate = (text) => `<p class="trip-events__msg">${text}</p>`;

export default class TripMessageView extends AbstractView {
  #message = '';

  constructor(message) {
    super();
    this.#message = message;
  }

  get template() {
    return createTripMessageTemplate(this.#message);
  }
}
