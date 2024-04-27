import { render, RenderPosition } from '../render.js';

import InfoView from '../view/info-view.js';
import FiltersView from '../view/filters-view.js';

export default class PagePresenter {
  constructor({ headerMainElement, headerFiltersElement }) {
    this.headerMainElement = headerMainElement;
    this.headerFiltersElement = headerFiltersElement;
  }

  init() {
    render(new InfoView(), this.headerMainElement, RenderPosition.AFTERBEGIN);
    render(new FiltersView(), this.headerFiltersElement);
  }
}
