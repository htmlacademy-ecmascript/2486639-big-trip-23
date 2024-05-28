import { render, remove, RenderPosition } from '../framework/render.js';
import { getTripInfo } from '../utils/event.js';
import InfoView from '../view/info-view.js';

export default class InfoPresenter {
  #containerElement = null;
  #eventsModel = null;
  #infoComponent = null;

  constructor({ containerElement, eventsModel }) {
    this.#containerElement = containerElement;
    this.#eventsModel = eventsModel;
  }

  init() {
    const prevInfoComponent = this.#infoComponent;
    const { events } = this.#eventsModel;

    this.#infoComponent = (events.length) ? new InfoView({ tripInfo: getTripInfo(events) }) : null;

    if (prevInfoComponent) {
      remove(prevInfoComponent);
    }

    if (this.#infoComponent) {
      render(this.#infoComponent, this.#containerElement, RenderPosition.AFTERBEGIN);
    }
  }
}
