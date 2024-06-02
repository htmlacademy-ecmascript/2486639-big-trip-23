import AbstractView from '../framework/view/abstract-view.js';
import { createElementsTemplate } from '../utils/dom.js';
import { FilterType } from '../const.js';

const createFilterItemTemplate = (filterType, _, activeFilterType, enabledFilterTypes) => {
  const checked = (filterType === activeFilterType) ? 'checked' : '';
  const disabled = (!enabledFilterTypes.includes(filterType)) ? 'disabled' : '';

  return `<div class="trip-filters__filter">
  <input id="filter-${filterType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType}" ${checked} ${disabled}>
  <label class="trip-filters__filter-label" for="filter-${filterType}">${filterType}</label>
</div>`;
};

const createFiltersTemplate = (activeFilter, enabledFilterTypes) => `<form class="trip-filters" action="#" method="get">
  ${createElementsTemplate(FilterType, createFilterItemTemplate, activeFilter, enabledFilterTypes)}
</form>`;

export default class FiltersView extends AbstractView {
  #currentFilterType = null;
  #enabledFilterTypes = [];
  #onFilterChange = null;

  constructor({ currentFilterType, enabledFilterTypes, onFilterChange }) {
    super();

    this.#currentFilterType = currentFilterType;
    this.#enabledFilterTypes = enabledFilterTypes;
    this.#onFilterChange = onFilterChange;
    this.element.addEventListener('change', this.#onFormElementChange);
  }

  get template() {
    return createFiltersTemplate(this.#currentFilterType, this.#enabledFilterTypes);
  }

  #onFormElementChange = (evt) => {
    this.#onFilterChange(evt.target.value);
  };
}
