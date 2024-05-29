import { render, remove, RenderPosition } from '../framework/render.js';
import InfoPresenter from './info-presenter.js';
import FilterPresenter from './filter-presenter.js';
import EventsPresenter from './events-presenter.js';
import SortingView from '../view/sorting-view.js';
import AddNewEventButtonView from '../view/add-new-event-button-view.js';
import MessageView from '../view/message-view.js';
import { sortEvents } from '../utils/sorting.js';
import { filterEvents } from '../utils/filter.js';
import { filterEmptyMessage, DEFAULT_SORTING_TYPE, UpdateType, DEFAULT_FILTER_TYPE } from '../const.js';

export default class TripPresenter {
  #filterModel = null;
  #eventsModel = null;

  #infoPresenter = null;
  #filterPresenter = null;
  #eventsPresenter = null;

  #headerTripMainElement = null;
  #tripEventsElement = null;

  #sortingComponent = null;
  #emptyEventsMessageComponent = null;
  #addEventButtonComponent = null;

  #events = [];

  #currentSortingType = DEFAULT_SORTING_TYPE;

  constructor({ headerTripMainElement, headerTripFiltersElement, tripEventsElement, eventsModel, filterModel }) {
    this.#filterModel = filterModel;
    this.#eventsModel = eventsModel;
    this.#headerTripMainElement = headerTripMainElement;
    this.#tripEventsElement = tripEventsElement;

    this.#infoPresenter = new InfoPresenter({
      containerElement: headerTripMainElement,
      eventsModel
    });
    this.#filterPresenter = new FilterPresenter({
      containerElement: headerTripFiltersElement,
      filterModel,
      eventsModel
    });
    this.#eventsPresenter = new EventsPresenter({
      containerElement: tripEventsElement,
      eventsModel,
      onAddNewEventClose: this.#onAddNewEventClose
    });

    this.#addEventButtonComponent = new AddNewEventButtonView({ onClick: this.#onAddEventClick });

    eventsModel.addObserver(this.#onModelsChange);
    filterModel.addObserver(this.#onModelsChange);
  }

  init() {
    this.#filterPresenter.init(); // отрисовать один раз //! скорее всего при получении данных с сервера будет первый init при обработке изменений модели
    render(this.#addEventButtonComponent, this.#headerTripMainElement, RenderPosition.BEFOREEND); // отрисовать один раз

    this.#render();
  }

  #clear() {
    this.#removeSorting();
    this.#removeEmptyEventsMessage();
    this.#removeEvents();
  }

  #render() {
    this.#infoPresenter.init();

    this.#events = filterEvents(this.#eventsModel.events, this.#filterModel.filterType, Date.now());

    if (!this.#events.length) {
      this.#renderEmptyEventsMessage();
      return;
    }

    this.#renderSorting();

    this.#events.sort(sortEvents[this.#currentSortingType]);
    this.#renderEvents();
  }

  #removeSorting() {
    if (this.#sortingComponent) {
      remove(this.#sortingComponent);
      this.#sortingComponent = null;
    }
  }

  #renderSorting() {
    this.#sortingComponent = new SortingView({ currentSortingType: this.#currentSortingType, onSortingChange: this.#onSortingChange });
    render(this.#sortingComponent, this.#tripEventsElement);
  }

  #removeEvents() {
    this.#eventsPresenter.clear();
  }

  #renderEvents() {
    this.#eventsPresenter.init(this.#events);
  }

  #renderEmptyEventsMessage() {
    this.#emptyEventsMessageComponent = new MessageView({ message: filterEmptyMessage[this.#filterModel.filterType] });
    render(this.#emptyEventsMessageComponent, this.#tripEventsElement);
  }

  #removeEmptyEventsMessage() {
    if (this.#emptyEventsMessageComponent) {
      remove(this.#emptyEventsMessageComponent);
      this.#emptyEventsMessageComponent = null;
    }
  }

  #onModelsChange = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventsPresenter.updateEvent(data);
        break;
      case UpdateType.MINOR:
        this.#clear();
        this.#render();
        break;
      case UpdateType.MAJOR:
        this.#currentSortingType = DEFAULT_SORTING_TYPE;
        this.#clear();
        this.#render();
        break;
    }
  };

  #onAddNewEventClose = () => {
    this.#addEventButtonComponent.enable();

    if (!this.#events.length) {
      this.#renderEmptyEventsMessage();
    }
  };

  #onAddEventClick = () => {
    this.#filterModel.filterType = DEFAULT_FILTER_TYPE;
    this.#removeEmptyEventsMessage();
    this.#eventsPresenter.addEvent();
  };

  #onSortingChange = (sortingType) => {
    this.#currentSortingType = sortingType;
    this.#removeEvents();
    this.#renderEvents();
  };
}
