import AbstractView from '../framework/view/abstract-view.js';
import { createElementsTemplate } from '../utils/dom.js';

const createTripSortingItemTemplate = (sorting, activeSorting, tripDisableSortings) => {
  const checked = (sorting === activeSorting) ? ' checked' : '';
  const disabled = (tripDisableSortings.includes(sorting)) ? ' disabled' : '';

  return `<div class="trip-sort__item  trip-sort__item--${sorting}">
  <input id="sort-${sorting}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sorting}"${checked}${disabled}>
  <label class="trip-sort__btn" for="sort-${sorting}">${sorting}</label>
</div>`;
};

const createTripSortingTemplate = (sortings, activeSorting, tripDisableSortings) => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${createElementsTemplate(sortings, createTripSortingItemTemplate, activeSorting, tripDisableSortings)}
</form>`;

export default class TripSortingView extends AbstractView {
  #tripSortings = [];
  #activeTripSorting = '';
  #tripDisableSortings = [];

  constructor(tripSortings, activeTripSorting, tripDisableSortings) {
    super();
    this.#tripSortings = tripSortings;
    this.#activeTripSorting = activeTripSorting;
    this.#tripDisableSortings = tripDisableSortings;
  }

  get template() {
    return createTripSortingTemplate(this.#tripSortings, this.#activeTripSorting, this.#tripDisableSortings);
  }
}
