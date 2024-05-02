import { createElement } from '../render.js';
import { createElementsTemplate } from '../utils.js';

const createSortingItemTemplate = ({ sorting, isActive }) => {
  const checked = (isActive) ? 'checked' : '';

  return `<div class="trip-sort__item  trip-sort__item--${sorting}">
  <input id="sort-${sorting}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sorting}" ${checked}>
  <label class="trip-sort__btn" for="sort-${sorting}">${sorting}</label>
</div>`;
};

const createSortingTemplate = (sortings) => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${createElementsTemplate(sortings, createSortingItemTemplate)}
</form>`;

//!! очень похожи с FiltersView
export default class SortingView {
  constructor(sortings, activeFilter) {
    this.sortings = sortings.map((sorting) => ({ sorting, isActive: (sorting === activeFilter) }));
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
