import { render, remove, RenderPosition } from '../framework/render.js';
import InfoPresenter from './info-presenter.js';
import FilterPresenter from './filter-presenter.js';
import EventsPresenter from './events-presenter.js';
import SortingView from '../view/sorting-view.js';
import AddNewEventButtonView from '../view/add-new-event-button-view.js';
import MessageView from '../view/message-view.js';
import { sortEvents } from '../utils/sorting.js';
import { filterEmptyMessage, DEFAULT_SORTING_TYPE, UpdateType, DEFAULT_FILTER_TYPE, MessageType } from '../const.js';

export default class TripPresenter {
  #filterModel = null;

  #infoPresenter = null;
  #filterPresenter = null;
  #eventsPresenter = null;

  #headerTripMainElement = null;
  #tripEventsElement = null;

  #isLoading = true;

  #loadingComponent = null;
  #sortingComponent = null;
  #emptyEventsMessageComponent = null;
  #addEventButtonComponent = null;

  #events = [];

  #currentSortingType = DEFAULT_SORTING_TYPE;

  constructor({ headerTripMainElement, headerTripFiltersElement, tripEventsElement, eventsModel, filterModel }) {
    this.#filterModel = filterModel;
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
      onNewEventClose: this.#onNewEventClose
    });
    this.#loadingComponent = new MessageView({ message: MessageType.LOADING });

    this.#addEventButtonComponent = new AddNewEventButtonView({ onClick: this.#onAddEventClick });

    eventsModel.addObserver(this.#onEventsModelChange);
    filterModel.addObserver(this.#onFilterModelChange);
  }

  init() {
    this.#filterPresenter.init();
    render(this.#addEventButtonComponent, this.#headerTripMainElement, RenderPosition.BEFOREEND); // отрисовать один раз

    this.#render();
  }

  renderFailedMessage() {
    this.#removeLoading();
    render(new MessageView({ message: MessageType.FAILED }), this.#tripEventsElement); // удаление и #isFailedLoading нет т.к. возможно только нажать обновить страницу
  }

  #clear() {
    this.#removeSorting();
    this.#removeLoading();
    this.#removeEmptyEventsMessage();
    this.#removeEvents();
  }

  #render() {
    this.#infoPresenter.init();

    if (this.#isLoading) {
      this.#addEventButtonComponent.disable();
      this.#renderLoading();
      return;
    }

    this.#addEventButtonComponent.enable();

    this.#events = this.#filterPresenter.filteredEvents;

    if (!this.#events.length) {
      this.#renderEmptyEventsMessage();
      return;
    }

    this.#renderSorting();

    this.#events = sortEvents(this.#events, this.#currentSortingType);
    this.#renderEvents();
  }

  #removeLoading() {
    remove(this.#loadingComponent);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#tripEventsElement);
  }

  #removeSorting() {
    remove(this.#sortingComponent);
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
    remove(this.#emptyEventsMessageComponent);
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
      case UpdateType.INIT:
        this.#isLoading = false;
        this.#removeLoading();
        this.#render();
        break;
    }
  };

  #onEventsModelChange = (updateType, data) => {
    this.#onModelsChange(updateType, data);
  };

  #onFilterModelChange = (updateType, data) => {
    this.#onModelsChange(updateType, data);
  };

  #onNewEventClose = () => {
    this.#addEventButtonComponent.enable();

    if (!this.#events.length) {
      this.#removeSorting();
      this.#renderEmptyEventsMessage();
    }
  };

  #onAddEventClick = () => {
    this.#filterModel.filterType = DEFAULT_FILTER_TYPE; //! там проверка на незменность фильтра и не сработатывает UpdateType.MAJOR
    if (!this.#events.length) {
      this.#removeEmptyEventsMessage();
      this.#renderSorting();
    }
    this.#eventsPresenter.addEvent();
  };

  #onSortingChange = (sortingType) => {
    this.#currentSortingType = sortingType;
    this.#clear();
    this.#render();
    //! были сломаны сортировка и фильтр, возможно применение сортировки и фитрации перенести.... и не перерисовывать шапку и не фильтровать... только отсортировать и отобразить
    //this.#removeEvents();
    //this.#renderEvents();
  };
}
