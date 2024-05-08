import AbstractView from '../framework/view/abstract-view.js';
import { createElementsTemplate } from '../utils/dom.js';
import { TripFilters } from '../const.js';

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

//!!!!!!!Например, фильтры в «Большом путешествии» зависят от данных косвенно — в случае отсутствия данных по фильтру, он блокируется от выбора.

export default class TripFiltersView extends AbstractView {
  #events = [];
  #tripFilters = [];
  #activeTripFilter = '';

  #tripDatePeriodChecks = {
    [TripFilters.EVERYTHING]: null,
    [TripFilters.FUTURE]: (dateFrom, _, date) => (dateFrom > date),
    [TripFilters.PRESENT]: (dateFrom, dateTo, date) => ((dateFrom <= date) && (dateTo <= date)),
    [TripFilters.PAST]: (_, dateTo, date) => (dateTo < date),
  };

  constructor(events, activeTripFilter) {
    super();
    this.#events = [...events]; //! временно?
    this.#tripFilters = Object.values(TripFilters);
    this.#activeTripFilter = activeTripFilter;
  }

  get template() {
    return createTripFiltersTemplate(this.#tripFilters, this.#activeTripFilter);
  }
}
