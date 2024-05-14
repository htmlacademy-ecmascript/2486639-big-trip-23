import { render, RenderPosition } from '../framework/render.js';
import InfoView from '../view/info-view.js';

export default class InfoPresenter {
  #containerElement = null;
  #tripEventsModel = null;

  #events = [];

  constructor({ containerElement, tripEventsModel }) {
    this.#containerElement = containerElement;
    this.#tripEventsModel = tripEventsModel;

    this.#events = this.#tripEventsModel.events;
  }

  init() {
    //! временно, разный текст в зависмости от фильтра, и обработка нажатий
    if (this.#events.length) {
      const { offers, destinations } = this.#tripEventsModel;
      const destinationData = Array.from(destinations, ([, { name }]) => ({ name }));
      render(new InfoView(this.#events, destinationData, offers), this.#containerElement, RenderPosition.AFTERBEGIN);
    }
  }
}
