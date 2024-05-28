import AbstractView from '../framework/view/abstract-view.js';
import { createElementsTemplate } from '../utils/dom.js';
import { SortingType, sortingTypeLabelText, DEFAULT_SORTING_TYPE, DISABLE_SORTING_TYPES } from '../const.js';

const createSortingItemTemplate = (sortingType, _, activeSortingType, disableSortingTypes) => {
  const checked = (sortingType === activeSortingType) ? 'checked' : '';
  const disabled = (disableSortingTypes.includes(sortingType)) ? 'disabled' : '';

  return `<div class="trip-sort__item  trip-sort__item--${sortingType}">
  <input id="sort-${sortingType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortingType}" ${checked} ${disabled} data-sorting-type="${sortingType}">
  <label class="trip-sort__btn" for="sort-${sortingType}">${sortingTypeLabelText[sortingType]}</label>
</div>`;
};

const createSortingTemplate = (activeSorting, tripDisableSortings) => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${createElementsTemplate(SortingType, createSortingItemTemplate, activeSorting, tripDisableSortings)}
</form>`;

export default class SortingView extends AbstractView {
  #onSortingChange = null;

  constructor({ onSortingChange }) {
    super();

    this.#onSortingChange = onSortingChange;
    this.element.addEventListener('change', this.#onFormElementChange);
  }

  get template() {
    return createSortingTemplate(DEFAULT_SORTING_TYPE, DISABLE_SORTING_TYPES);
  }

  #onFormElementChange = (evt) => {
    this.#onSortingChange(evt.target.dataset.sortingType);
  };
}
