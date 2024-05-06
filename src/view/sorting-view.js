import { createElement } from '../render.js';
import { createElementsTemplate } from '../utils/dom.js';

const createSortingItemTemplate = ({ name, isEnabled }, activeSorting) => {
  const checked = (name === activeSorting) ? 'checked' : '';
  const disabled = (isEnabled) ? '' : 'disabled';

  return `<div class="trip-sort__item  trip-sort__item--${name}">
  <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${checked} ${disabled}>
  <label class="trip-sort__btn" for="sort-${name}">${name}</label>
</div>`;
};

const createSortingTemplate = (sortings, activeSorting) => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${createElementsTemplate(sortings, createSortingItemTemplate, activeSorting)}
</form>`;

//! очень похожи с FiltersView
export default class SortingView {
  constructor(sortings, activeSorting) {
    this.sortings = sortings;
    this.activeSorting = activeSorting;
  }

  getTemplate() {
    return createSortingTemplate(this.sortings, this.activeSorting);
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
