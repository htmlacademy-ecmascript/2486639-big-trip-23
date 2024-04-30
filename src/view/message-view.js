import { createElement } from '../render.js';

const createMessageTemplate = (text) => `<p class="trip-events__msg">${text}</p>`;

export default class MessageView {
  getTemplate() {
    return createMessageTemplate('Loading...'); //Loading... //Failed to load latest route information //Click New Event to create your first point
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
