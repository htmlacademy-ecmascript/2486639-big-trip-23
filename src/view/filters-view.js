import AbstractView from '../framework/view/abstract-view.js';
import { createElementsTemplate } from '../utils/dom.js';
import { FilterType, DEFAULT_ENABLED_FILTERS } from '../const.js';
import { existFilteredEvents } from '../utils/filter.js';

const createFilterItemTemplate = (filter, activeFilter, enabledFilters) => {
  const checked = (filter === activeFilter) ? 'checked' : '';
  const disabled = (!enabledFilters.includes(filter)) ? 'disabled' : '';

  return `<div class="trip-filters__filter">
  <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${checked} ${disabled}>
  <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
</div>`;
};

const createFiltersTemplate = (filters, activeFilter, enabledFilters) => `<form class="trip-filters" action="#" method="get">
  ${createElementsTemplate(filters, createFilterItemTemplate, activeFilter, enabledFilters)}
</form > `;

//! все еще немного похожи с SortingView, может получиться выделить общего предка?
export default class FiltersView extends AbstractView {
  #events = [];
  #filters = Object.entries(FilterType).map(([, filter]) => filter); //! сделать функцию в utils
  #activeFilter = FilterType.EVERYTHING;

  constructor(events) {
    super();
    this.#events = events;
  }

  get template() {
    const enabledFilters = (!this.#events.length) ? DEFAULT_ENABLED_FILTERS : this.#getEnabledFilters();

    return createFiltersTemplate(this.#filters, this.#activeFilter, enabledFilters);
  }

  #getEnabledFilters() {
    //! проверить что now, не старое, наверное необходимо перерысовывать при определенных условиях и now переедвать с перезтора
    const now = Date.now();

    return this.#filters.filter((filter) => existFilteredEvents(this.#events, filter, now));
  }
}
