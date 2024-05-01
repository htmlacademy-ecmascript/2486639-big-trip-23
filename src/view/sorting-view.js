import { createElement } from '../render.js';
import { createElementsTemplate } from '../utils.js';
import { SORTING_TYPES } from './const.js';

const createSortingItemTemplate = (type) => `<div class="trip-sort__item  trip-sort__item--${type}">
  <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" checked="">
  <label class="trip-sort__btn" for="sort-${type}">${type}</label>
</div>`;

const createSortingTemplate = () => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${createElementsTemplate(SORTING_TYPES, createSortingItemTemplate)}
</form>`;

export default class SortingView {
  getTemplate() {
    return createSortingTemplate();
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
