import AbstractView from '../framework/view/abstract-view.js';
import { createElementsTemplate } from '../utils/dom.js';
import { FilterType, DEFAULT_FILTER_TYPE } from '../const.js';
import { getDisabledFilters } from '../utils/filter.js';

const createFilterItemTemplate = (filter, _, activeFilter, disabledFilters) => {
  const checked = (filter === activeFilter) ? 'checked' : '';
  const disabled = (disabledFilters.includes(filter)) ? 'disabled' : '';

  return `<div class="trip-filters__filter">
  <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${checked} ${disabled}>
  <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
</div>`;
};

const createFiltersTemplate = (activeFilter, disabledFilters) => `<form class="trip-filters" action="#" method="get">
  ${createElementsTemplate(FilterType, createFilterItemTemplate, activeFilter, disabledFilters)}
</form>`;

export default class FiltersView extends AbstractView {
  #currentFilterType = null;
  #events = [];
  #onFilterChange = null;

  constructor({ currentFilterType = DEFAULT_FILTER_TYPE, events, onFilterChange }) {
    super();

    this.#currentFilterType = currentFilterType;
    this.#events = events;
    this.#onFilterChange = onFilterChange;
    this.element.addEventListener('change', this.#onFormElementChange);
  }

  get template() {
    return createFiltersTemplate(this.#currentFilterType, getDisabledFilters(this.#events));
  }

  #onFormElementChange = (evt) => {
    this.#onFilterChange(evt.target.value);
  };
}
