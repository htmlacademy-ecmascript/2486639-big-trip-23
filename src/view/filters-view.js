import AbstractView from '../framework/view/abstract-view.js';
import { createElementsTemplate } from '../utils/dom.js';
import { getEnabledFilters } from '../utils/filter.js';
import { DEFAULT_ENABLED_FILTER_TYPES, FilterType } from '../const.js';

const createFilterItemTemplate = (filter, _, activeFilter, enabledFilters) => {
  const checked = (filter === activeFilter) ? 'checked' : '';
  const disabled = (!enabledFilters.includes(filter)) ? 'disabled' : '';

  return `<div class="trip-filters__filter">
  <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${checked} ${disabled}>
  <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
</div>`;
};

const createFiltersTemplate = (activeFilter, enabledFilters) => `<form class="trip-filters" action="#" method="get">
  ${createElementsTemplate(FilterType, createFilterItemTemplate, activeFilter, enabledFilters)}
</form>`;

export default class FiltersView extends AbstractView {
  #currentFilterType = null;
  #isAllFiltersDisabled = true;
  #events = [];
  #now;
  #onFilterChange = null;

  constructor({ currentFilterType, isAllFiltersDisabled, events, now, onFilterChange }) {
    super();

    this.#currentFilterType = currentFilterType;
    this.#isAllFiltersDisabled = isAllFiltersDisabled;
    this.#events = events;
    this.#now = now;
    this.#onFilterChange = onFilterChange;
    this.element.addEventListener('change', this.#onFormElementChange);
  }

  get template() {
    return createFiltersTemplate(this.#currentFilterType, this.#getEnabledFilters());
  }

  #getEnabledFilters() {
    if (this.#isAllFiltersDisabled) {
      return [];
    }

    if (!this.#events.length) {
      return DEFAULT_ENABLED_FILTER_TYPES;
    }

    return getEnabledFilters(this.#events, this.#now);
  }

  #onFormElementChange = (evt) => {
    this.#onFilterChange(evt.target.value);
  };
}
