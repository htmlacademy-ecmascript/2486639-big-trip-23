import { render, remove, RenderPosition } from '../framework/render.js';
import InfoView from '../view/info-view.js';
import { getTripInfo } from '../utils/event.js';

export default class InfoPresenter {
  #containerElement = null;
  #eventsModel = null;
  #infoComponent = null;

  constructor({ containerElement, eventsModel }) {
    this.#containerElement = containerElement;
    this.#eventsModel = eventsModel;
  }

  init() {
    if (this.#infoComponent) {
      remove(this.#infoComponent);
    }

    const { events } = this.#eventsModel;

    if (events.length) {
      this.#infoComponent = new InfoView({ tripInfo: getTripInfo(events) });
      render(this.#infoComponent, this.#containerElement, RenderPosition.AFTERBEGIN);
    }
  }
}
