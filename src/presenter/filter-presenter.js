import { render, remove } from '../framework/render.js';
import FiltersView from '../view/filters-view.js';
import { getEnabledFilterTypes, filterEvents } from '../utils/filter.js';
import { UpdateType } from '../const.js';

export default class FilterPresenter {
  #containerElement = null;
  #filterModel = null;
  #eventsModel = null;
  #filterComponent = null;
  #enabledFilterTypes = [];
  #filteredEvents = [];

  constructor({ containerElement, filterModel, eventsModel }) {
    this.#containerElement = containerElement;
    this.#filterModel = filterModel;
    this.#eventsModel = eventsModel;

    eventsModel.addObserver(this.#onEventsModelChange);
    filterModel.addObserver(this.#onFilterModelChange);
  }

  get filteredEvents() {
    return this.#filteredEvents;
  }

  init() {
    remove(this.#filterComponent);

    this.#filterComponent = new FiltersView({
      currentFilterType: this.#filterModel.filterType,
      enabledFilterTypes: this.#enabledFilterTypes,
      onFilterChange: this.#onFilterChange
    });

    render(this.#filterComponent, this.#containerElement);
  }

  #onModelsChange(updateType) {
    if (updateType === UpdateType.PATCH) {
      return;
    }

    const now = Date.now();
    this.#enabledFilterTypes = getEnabledFilterTypes(this.#eventsModel.events, now);
    // фильтруем события один раз при изменении моделей (MAJOR и MINOR) в #filteredEvents, это позволяет избежать повторных ненужных фильтраций.
    // Фильтрация событий и доступные фильтры определяются на одну и ту же дату - now, это позволяет избежать некоректную фильтрацию -
    // когда доступные фильтры получены на одну дату, а фильтрация будет происходить на другую дату
    this.#filteredEvents = filterEvents(this.#eventsModel.events, this.#filterModel.filterType, now);

    this.init();
  }

  #onEventsModelChange = (updateType) => {
    this.#onModelsChange(updateType);
  };

  #onFilterModelChange = (updateType) => {
    this.#onModelsChange(updateType);
  };

  #onFilterChange = (filterType) => {
    this.#filterModel.filterType = filterType;
  };
}
