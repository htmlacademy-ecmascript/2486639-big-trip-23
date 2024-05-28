import Observable from '../framework/observable.js';
import { DEFAULT_FILTER_TYPE } from '../const.js';

export default class FilterModel extends Observable {
  #filterType = DEFAULT_FILTER_TYPE;
  #updateType = null;

  constructor({ updateType }) {
    super();

    this.#updateType = updateType;
  }

  get filterType() {
    return this.#filterType;
  }

  set filterType(newFilterType) {
    this.#filterType = newFilterType;

    this._notify(this.#updateType, newFilterType); //! нужно сбросить сортировку DEFAULT_SORTING_TYPE
  }
}
