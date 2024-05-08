import AbstractView from '../framework/view/abstract-view.js';
import { createElementsTemplate } from '../utils/dom.js';

const createTripFilterItemTemplate = (filter, activeFilter) => {
  const checked = (filter === activeFilter) ? 'checked' : '';

  return `<div class="trip-filters__filter">
  <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${checked}>
  <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
</div>`;
};

const createTripFiltersTemplate = (tripFilters, activeTripFilter) => `<form class="trip-filters" action="#" method="get">
  ${createElementsTemplate(tripFilters, createTripFilterItemTemplate, activeTripFilter)}
</form > `;

//! будут похожи с SortingView, когда добавиться isEnabled
export default class TripFiltersView extends AbstractView {
  #tripFilters = [];
  #activeTripFilter = '';

  constructor(tripFilters, activeTripFilter) {
    super();
    this.#tripFilters = tripFilters;
    this.#activeTripFilter = activeTripFilter;
  }

  get template() {
    return createTripFiltersTemplate(this.#tripFilters, this.#activeTripFilter);
  }
}
