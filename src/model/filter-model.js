import Observable from '../framework/observable.js';
import { DEFAULT_FILTER_TYPE, UpdateType } from '../const.js';

export default class FilterModel extends Observable {
  #filterType = DEFAULT_FILTER_TYPE;

  get filterType() {
    return this.#filterType;
  }

  set filterType(newFilterType) {
    if (this.#filterType === newFilterType) { //! возможно будет мешать автотестам
      return;
    }

    this.#filterType = newFilterType;

    this._notify(UpdateType.MAJOR, newFilterType);
  }
}
