import { createElement } from '../render.js';

const FILTER_TYPES = ['everything', 'future', 'present', 'past'];

const createFilterItemTemplate = (type) => `<div class="trip-filters__filter">
  <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" checked="">
  <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
</div>`;

const createFiltersTemplate = () => `<div class="trip-main__trip-controls  trip-controls">
<div class="trip-controls__filters">
  <h2 class="visually-hidden">Filter events</h2>
  <form class="trip-filters" action="#" method="get">

${FILTER_TYPES.map((type) => createFilterItemTemplate(type)).join(' ')}
<div class="trip-filters__filter">
</form>
</div>
</div>`;

export default class FiltersView {
  getTemplate() {
    return createFiltersTemplate();
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
