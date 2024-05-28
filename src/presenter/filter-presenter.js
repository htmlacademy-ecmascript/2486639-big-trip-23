import { renderOrReplace } from '../utils/dom.js';
import FiltersView from '../view/filters-view.js';
import { UpdateType } from '../const.js';

export default class FilterPresenter {
  //! похоже у нескольких презенторов, вынести в базовый класс + конструктор
  #containerElement = null;
  #filterModel = null;
  #eventsModel = null;
  #filterComponent = null;

  constructor({ containerElement, filterModel, eventsModel }) {
    this.#containerElement = containerElement;
    this.#filterModel = filterModel;
    this.#eventsModel = eventsModel;

    eventsModel.addObserver(this.#onEventsModelChange);
  }

  init() {
    const storedFilterComponent = this.#filterComponent;
    this.#filterComponent = new FiltersView({
      currentFilterType: this.#filterModel.filterType,
      events: this.#eventsModel.events,
      onFilterChange: this.#onFilterChange
    });

    renderOrReplace(this.#filterComponent, storedFilterComponent, this.#containerElement);
  }

  #onEventsModelChange = (updateType) => {
    if (updateType !== UpdateType.PATCH) {
      this.init();
    }
  };

  #onFilterChange = (filterType) => {
    this.#filterModel.filterType = filterType;
  };
}
