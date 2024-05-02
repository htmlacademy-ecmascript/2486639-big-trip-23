import { render, RenderPosition } from '../render.js';

import InfoView from '../view/info-view.js';

export default class InfoPresenter {
  constructor({ containerElement, eventsModel }) {
    this.containerElement = containerElement;
    this.eventsModel = eventsModel;
  }

  init() {
    const info = this.eventsModel.getInfo(); //! временно

    render(new InfoView(info), this.containerElement, RenderPosition.AFTERBEGIN);
  }
}
