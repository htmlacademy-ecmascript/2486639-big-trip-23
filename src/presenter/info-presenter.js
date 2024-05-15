import { render, RenderPosition } from '../framework/render.js';
import InfoView from '../view/info-view.js';

export default class InfoPresenter {
  #containerElement = null;
  #eventsModel = null;

  #events = null;

  constructor({ containerElement, eventsModel }) {
    this.#containerElement = containerElement;
    this.#eventsModel = eventsModel;

    this.#events = this.#eventsModel.events;
  }

  init() {
    //! временно, разный текст в зависмости от фильтра, и обработка нажатий
    if (this.#events.size) {
      const { offers, destinations } = this.#eventsModel;
      const destinationData = Array.from(destinations, ([, { name }]) => ({ name }));
      render(new InfoView(this.#events, destinationData, offers), this.#containerElement, RenderPosition.AFTERBEGIN);
    }
  }
}
