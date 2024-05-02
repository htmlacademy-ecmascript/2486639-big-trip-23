import { createElement } from '../render.js';
import { createElementsTemplate } from '../utils.js';

const createSortingItemTemplate = ({ sorting, isActive, isDisabled }) => {
  const checked = (isActive) ? 'checked' : '';
  const disabled = (isDisabled) ? 'disabled' : '';

  return `<div class="trip-sort__item  trip-sort__item--${sorting}">
  <input id="sort-${sorting}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sorting}" ${checked} ${disabled}>
  <label class="trip-sort__btn" for="sort-${sorting}">${sorting}</label>
</div>`;
};

const createSortingTemplate = (sortings) => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${createElementsTemplate(sortings, createSortingItemTemplate)}
</form>`;

//! очень похожи с FiltersView
export default class SortingView {
  constructor(sortings, activeSorting, disabledSortings = []) {
    this.sortings = sortings.map((sorting) => ({
      sorting,
      isActive: (sorting === activeSorting),
      isDisabled: disabledSortings.includes(sorting)
    }));
  }

  getTemplate() {
    return createSortingTemplate(this.sortings);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
