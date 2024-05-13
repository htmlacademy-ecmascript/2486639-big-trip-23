import AbstractView from '../framework/view/abstract-view.js';
import { createElementsTemplate } from '../utils/dom.js';

const createSortingItemTemplate = (sorting, activeSorting, tripDisableSortings) => {
  const checked = (sorting === activeSorting) ? ' checked' : '';
  const disabled = (tripDisableSortings.includes(sorting)) ? ' disabled' : '';

  return `<div class="trip-sort__item  trip-sort__item--${sorting}">
  <input id="sort-${sorting}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sorting}"${checked}${disabled}>
  <label class="trip-sort__btn" for="sort-${sorting}">${sorting}</label>
</div>`;
};

const createSortingTemplate = (sortings, activeSorting, tripDisableSortings) => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${createElementsTemplate(sortings, createSortingItemTemplate, activeSorting, tripDisableSortings)}
</form>`;

export default class SortingView extends AbstractView {
  #tripSortings = [];
  #activeSorting = '';
  #tripDisableSortings = [];

  constructor(tripSortings, activeSorting, tripDisableSortings) {
    super();
    this.#tripSortings = tripSortings;
    this.#activeSorting = activeSorting;
    this.#tripDisableSortings = tripDisableSortings;
  }

  get template() {
    return createSortingTemplate(this.#tripSortings, this.#activeSorting, this.#tripDisableSortings);
  }
}
