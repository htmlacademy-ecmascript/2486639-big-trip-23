import { render, remove } from '../framework/render.js';
import FiltersView from '../view/filters-view.js';
import { UpdateType } from '../const.js';

export default class FilterPresenter {
  #containerElement = null;
  #filterModel = null;
  #eventsModel = null;
  #filterComponent = null;
  #now = Date.now();

  constructor({ containerElement, filterModel, eventsModel }) {
    this.#containerElement = containerElement;
    this.#filterModel = filterModel;
    this.#eventsModel = eventsModel;

    eventsModel.addObserver(this.#onEventsModelChange);
  }

  get now() {
    return this.#now;
  }

  init({ isAllFiltersDisabled } = { isAllFiltersDisabled: false }) {
    this.#now = Date.now();
    remove(this.#filterComponent);

    this.#filterComponent = new FiltersView({
      currentFilterType: this.#filterModel.filterType,
      isAllFiltersDisabled,
      events: this.#eventsModel.events,
      now: this.#now,
      onFilterChange: this.#onFilterChange
    });

    render(this.#filterComponent, this.#containerElement);
  }

  #onEventsModelChange = (updateType) => {
    if ([UpdateType.PATCH, UpdateType.INIT_ERROR].includes(updateType)) {
      return;
    }

    this.init();
  };

  #onFilterChange = (filterType) => {
    this.#filterModel.filterType = filterType;
  };
}
