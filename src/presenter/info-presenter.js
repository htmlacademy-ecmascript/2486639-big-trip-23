import { render, RenderPosition } from '../framework/render.js';
import { getTripInfo } from '../utils/event.js';
import InfoView from '../view/info-view.js';

export default class InfoPresenter {
  #containerElement = null;
  #eventsModel = null;

  constructor({ containerElement, eventsModel }) {
    this.#containerElement = containerElement;
    this.#eventsModel = eventsModel;
  }

  init() {
    const { events } = this.#eventsModel;
    if (events.length) {
      render(new InfoView(getTripInfo(events)), this.#containerElement, RenderPosition.AFTERBEGIN);
    }
  }
}
