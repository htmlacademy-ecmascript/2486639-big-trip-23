import AbstractView from '../framework/view/abstract-view.js';
import { createElementsTemplate } from '../utils/dom.js';
import { TripFilters } from '../const.js';

const createTripFilterItemTemplate = ({ filter, isEnabled }, activeFilter) => {
  const checked = (filter === activeFilter) ? ' checked' : '';
  const disabled = (isEnabled) ? '' : ' disabled';

  return `<div class="trip-filters__filter">
  <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}"${checked}${disabled}>
  <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
</div>`;
};

const createTripFiltersTemplate = (tripFilters, activeTripFilter) => `<form class="trip-filters" action="#" method="get">
  ${createElementsTemplate(tripFilters, createTripFilterItemTemplate, activeTripFilter)}
</form > `;

//! все еще немного похожи с TripSortingView, может получиться выделить общего предка?
export default class TripFiltersView extends AbstractView {
  #events = [];
  #activeTripFilter = '';

  #tripDatePeriodChecks = {
    [TripFilters.FUTURE]: (dateFrom, _, date) => (dateFrom > date),
    [TripFilters.PRESENT]: (dateFrom, dateTo, date) => ((dateFrom <= date) && (dateTo >= date)),
    [TripFilters.PAST]: (_, dateTo, date) => (dateTo < date),
  };

  constructor(events, activeTripFilter) {
    super();
    this.#events = [...events]; //! временно
    this.#activeTripFilter = activeTripFilter;
  }

  get template() {
    const tripFilters = Object.entries(TripFilters).map(([, filter]) => {
      if (!this.#events.length) {
        return {
          filter,
          isEnabled: [TripFilters.EVERYTHING, TripFilters.PRESENT].includes(filter)
        };
      }

      const tripDatePeriodCheck = this.#tripDatePeriodChecks[filter];
      const isEnabled = (!tripDatePeriodCheck) ? true : this.#events.some((event) => {
        const now = new Date();
        const { dateFrom, dateTo } = event;

        return tripDatePeriodCheck(dateFrom, dateTo, now);
      });

      return {
        filter,
        isEnabled
      };
    });

    return createTripFiltersTemplate(tripFilters, this.#activeTripFilter);
  }
}
