import AbstractView from '../framework/view/abstract-view.js';
import { createElementsTemplate } from '../utils/dom.js';

const createFilterItemTemplate = ({ filter, isActive }) => {
  const checked = (isActive) ? 'checked' : '';

  return `<div class="trip-filters__filter">
  <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${checked}>
  <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
</div>`;
};

const createFiltersTemplate = (filters) => `<form class="trip-filters" action="#" method="get">
  ${createElementsTemplate(filters, createFilterItemTemplate)}
</form>`;

//! очень похожи с SortingView
export default class FiltersView extends AbstractView {
  #filters = [];

  constructor(filters, activeFilter) {
    super();
    this.#filters = filters.map((filter) => ({ filter, isActive: (filter === activeFilter) }));
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
