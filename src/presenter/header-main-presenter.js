import { render, RenderPosition } from '../render.js';

import InfoView from '../view/info-view.js';

export default class PagePresenter {
  constructor({ containerElement }) {
    this.containerElement = containerElement;
  }

  init() {
    render(new InfoView(), this.containerElement, RenderPosition.AFTERBEGIN);
  }
}
