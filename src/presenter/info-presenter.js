import { render, RenderPosition } from '../framework/render.js';
import InfoView from '../view/info-view.js';

export default class InfoPresenter {
  #containerElement = null;
  #eventsModel = null;

  constructor({ containerElement, eventsModel }) {
    this.#containerElement = containerElement;
    this.#eventsModel = eventsModel;
  }

  init() {
    const info = this.#eventsModel.info; //! временно

    render(new InfoView(info), this.#containerElement, RenderPosition.AFTERBEGIN);
  }
}
