import AbstractView from '../framework/view/abstract-view.js';
import { createElementsTemplate } from '../utils/dom.js';

const createTripSortingItemTemplate = ({ name, isEnabled }, activeSorting) => {
  const checked = (name === activeSorting) ? ' checked' : '';
  const disabled = (isEnabled) ? '' : ' disabled';

  return `<div class="trip-sort__item  trip-sort__item--${name}">
  <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}"${checked}${disabled}>
  <label class="trip-sort__btn" for="sort-${name}">${name}</label>
</div>`;
};

const createTripSortingTemplate = (sortings, activeSorting) => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${createElementsTemplate(sortings, createTripSortingItemTemplate, activeSorting)}
</form>`;

export default class TripSortingView extends AbstractView {
  #tripSortings = [];
  #activeTripSorting = '';

  constructor(tripSortings, activeTripSorting) {
    super();
    this.#tripSortings = tripSortings;
    this.#activeTripSorting = activeTripSorting;
  }

  get template() {
    return createTripSortingTemplate(this.#tripSortings, this.#activeTripSorting);
  }
}
