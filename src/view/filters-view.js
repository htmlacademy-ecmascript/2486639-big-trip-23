import AbstractView from '../framework/view/abstract-view.js';
import { createElementsTemplate } from '../utils/dom.js';
import { FilterType } from '../const.js';

const createFilterItemTemplate = ({ filter, isEnabled }, activeFilter) => {
  const checked = (filter === activeFilter) ? ' checked' : '';
  const disabled = (isEnabled) ? '' : ' disabled';

  return `<div class="trip-filters__filter">
  <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}"${checked}${disabled}>
  <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
</div>`;
};

const createFiltersTemplate = (filters, activeFilter) => `<form class="trip-filters" action="#" method="get">
  ${createElementsTemplate(filters, createFilterItemTemplate, activeFilter)}
</form > `;

//! все еще немного похожи с SortingView, может получиться выделить общего предка?
export default class FiltersView extends AbstractView {
  #events = [];
  #activeFilter = '';

  #tripDatePeriodChecks = {
    [FilterType.FUTURE]: (dateFrom, _, date) => (dateFrom > date),
    [FilterType.PRESENT]: (dateFrom, dateTo, date) => ((dateFrom <= date) && (dateTo >= date)),
    [FilterType.PAST]: (_, dateTo, date) => (dateTo < date),
  };

  constructor(events, activeFilter) {
    super();
    this.#events = [...events]; //! временно
    this.#activeFilter = activeFilter;
  }

  get template() {
    const filters = Object.entries(FilterType).map(([, filter]) => {
      if (!this.#events.length) {
        return {
          filter,
          isEnabled: [FilterType.EVERYTHING, FilterType.PRESENT].includes(filter)
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

    return createFiltersTemplate(filters, this.#activeFilter);
  }
}
