import { render, remove } from '../framework/render.js';
import FiltersView from '../view/filters-view.js';
import { UpdateType } from '../const.js';

export default class FilterPresenter {
  #containerElement = null;
  #filterModel = null;
  #eventsModel = null;
  #filterComponent = null;
  #now = Date.now(); //! может в модель перенести?

  constructor({ containerElement, filterModel, eventsModel }) {
    this.#containerElement = containerElement;
    this.#filterModel = filterModel;
    this.#eventsModel = eventsModel;

    eventsModel.addObserver(this.#onEventsModelChange);
  }

  get now() {
    return this.#now;
  }

  init() {
    this.#now = Date.now();

    remove(this.#filterComponent);

    this.#filterComponent = new FiltersView({
      currentFilterType: this.#filterModel.filterType,
      events: this.#eventsModel.events,
      now: this.#now,
      onFilterChange: this.#onFilterChange
    });

    render(this.#filterComponent, this.#containerElement);
  }

  #onEventsModelChange = (updateType) => {
    if (updateType === UpdateType.PATCH) {
      return;
    }

    this.init();
  };

  #onFilterChange = (filterType) => {
    this.#filterModel.filterType = filterType;
  };
}
