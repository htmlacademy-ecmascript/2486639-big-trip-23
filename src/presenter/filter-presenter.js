import { render, replace, remove } from '../framework/render.js';
import FiltersView from '../view/filters-view.js';

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
  }

  init() {
    //! похожий похдход у нескольких классов, попробовать выделить код
    //! или сделать в util какую то функцию...
    const storedFilterComponent = this.#filterComponent;
    this.#filterComponent = new FiltersView({
      currentFilterType: this.#filterModel.filterType,
      events: this.#eventsModel.events,
      onFilterChange: this.#onFilterChange
    });

    if (!storedFilterComponent) {
      render(this.#filterComponent, this.#containerElement);
    } else {
      replace(this.#filterComponent, storedFilterComponent);
      remove(storedFilterComponent);
    }
  }

  #onFilterChange = (filterType) => {
    this.#filterModel.filterType = filterType;
  };
}
