import AbstractView from '../framework/view/abstract-view.js';
import { createElementsTemplate } from '../utils/dom.js';
import { getDisabledFilters } from '../utils/filter.js';
import { FilterType, filterTypes } from '../const.js';

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
  #isAllFiltersDisabled = true;
  #events = [];
  #onFilterChange = null;

  constructor({ currentFilterType, isAllFiltersDisabled, events, onFilterChange }) {
    super();

    this.#currentFilterType = currentFilterType;
    this.#isAllFiltersDisabled = isAllFiltersDisabled;
    this.#events = events;
    this.#onFilterChange = onFilterChange;
    this.element.addEventListener('change', this.#onFormElementChange);
  }

  get template() {
    const disabledFilters = (this.#isAllFiltersDisabled) ? filterTypes : getDisabledFilters(this.#events);
    return createFiltersTemplate(this.#currentFilterType, disabledFilters);
  }

  #onFormElementChange = (evt) => {
    this.#onFilterChange(evt.target.value);
  };
}
