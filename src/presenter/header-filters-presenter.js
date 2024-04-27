import { render } from '../render.js';

import FiltersView from '../view/filters-view.js';

export default class PagePresenter {
  constructor({ containerElement }) {
    this.containerElement = containerElement;
  }

  init() {
    render(new FiltersView(), this.containerElement);
  }
}
