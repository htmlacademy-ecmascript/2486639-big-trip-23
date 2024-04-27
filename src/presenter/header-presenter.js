import { render, RenderPosition } from '../render.js';

import InfoView from '../view/info-view.js';
import FiltersView from '../view/filters-view.js';

export default class PagePresenter {
  init({ mainElement, filtersElement }) {
    render(new InfoView(), mainElement, RenderPosition.AFTERBEGIN);
    render(new FiltersView(), filtersElement);
  }
}
