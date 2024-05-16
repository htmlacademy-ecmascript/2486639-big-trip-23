import AbstractView from '../framework/view/abstract-view.js';
import { createElementsTemplate } from '../utils/dom.js';
import { FilterType, DEFAULT_FILTER_TYPE, DEFAULT_DISABLE_FILTER_TYPE } from '../const.js';
import { existFilteredEvents } from '../utils/filter.js';

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

//! все еще немного похожи с SortingView, может получиться выделить общего предка?
export default class FiltersView extends AbstractView {
  #events = null;
  #activeFilter = DEFAULT_FILTER_TYPE;

  constructor(events) {
    super();
    this.#events = events;
  }

  get template() {
    const disabledFilters = (this.#events.size) ? this.#getDisabledFilters() : DEFAULT_DISABLE_FILTER_TYPE;

    return createFiltersTemplate(this.#activeFilter, disabledFilters);
  }

  #getDisabledFilters() {
    //! проверить что now, не старое, наверное необходимо перерысовывать при определенных условиях и now переедвать с перезтора
    const now = Date.now();
    const filters = Object.entries(FilterType).map(([, filter]) => filter); //! можно собрать и один раз в конструкторе

    return filters.filter((filter) => !existFilteredEvents(this.#events, filter, now));
  }
}
