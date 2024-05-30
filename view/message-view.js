import AbstractView from '../framework/view/abstract-view.js';

const createMessageTemplate = (text) => `<p class="trip-events__msg">${text}</p>`;

export default class MessageView extends AbstractView {
  #message = '';

  constructor({ message }) {
    super();
    this.#message = message;
  }

  get template() {
    return createMessageTemplate(this.#message);
  }
}
