import AbstractView from '../framework/view/abstract-view.js';

const createMessageTemplate = (text) => `<p class="trip-events__msg">${text}</p>`;

export default class MessageView extends AbstractView {
  get template() {
    return createMessageTemplate('Loading...'); //Loading... //Failed to load latest route information //Click New Event to create your first point
  }
}
