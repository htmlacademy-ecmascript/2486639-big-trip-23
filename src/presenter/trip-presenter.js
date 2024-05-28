import { render, remove } from '../framework/render.js';
import InfoPresenter from './info-presenter.js';
import FilterPresenter from './filter-presenter.js';
import EventsPresenter from './events-presenter.js';
import SortingView from '../view/sorting-view.js';
import ButtonView from '../view/button-view.js';
import MessageView from '../view/message-view.js';
import { sortEvents } from '../utils/sorting.js';
import { filterEvents } from '../utils/filter.js';
import { filterEmptyMessage, DEFAULT_SORTING_TYPE, UpdateType } from '../const.js';
import { updateItemByKey } from '../utils/utils.js';

export default class TripPresenter {
  #filterModel = null;
  #eventsModel = null;

  #infoPresenter = null;
  #filterPresenter = null;
  #eventsPresenter = null;

  #tripEventsElement = null;

  #sortingComponent = null;
  #emptyEventsMessageComponent = null;
  #addEventButtonComponent = null;

  #events = [];

  #currentSortingType = DEFAULT_SORTING_TYPE;

  constructor({ headerTripMainElement, headerTripFiltersElement, tripEventsElement, addEventButtonElement, eventsModel, filterModel }) {
    this.#filterModel = filterModel;
    this.#eventsModel = eventsModel;
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

    this.#addEventButtonComponent = new ButtonView({ buttonElement: addEventButtonElement, onClick: this.#onAddEventClick });

    eventsModel.addObserver(this.#onModelsChange);
    filterModel.addObserver(this.#onModelsChange);
  }

  init() {
    this.#filterPresenter.init();//! скорее всего при плучении данных с сервера будет первый init
    this.#render();
  }

  #clear({ isResetSortingType } = { isResetSortingType: false }) {
    remove(this.#sortingComponent);

    if (isResetSortingType) {
      this.#currentSortingType = DEFAULT_SORTING_TYPE;
    }

    if (this.#emptyEventsMessageComponent) {
      remove(this.#emptyEventsMessageComponent);
    }
  }

  #render() {
    this.#infoPresenter.init();
    this.#renderEvents();
  }

  #renderSorting() {
    this.#sortingComponent = new SortingView({ currentSortingType: this.#currentSortingType, onSortingChange: this.#onSortingChange });
    render(this.#sortingComponent, this.#tripEventsElement);
  }

  #renderEvents({ isRenderSorting, isApplyFilter } = { isRenderSorting: true, isApplyFilter: true }) {
    const now = Date.now();

    //! нужно будет проверить вызов при добавлении нового события, или не так!
    //! и сортировать и фильтровать дабавленное новое событие, или не так!
    //! при сортировке заново фильтруеться... попробовать убрать лишний вызов или параметром или свойством
    const filteredEvents = (!isApplyFilter) ? this.#events : this.#eventsModel.events.filter(({ dateFrom, dateTo }) => filterEvents[this.#filterModel.filterType](dateFrom, dateTo, now));

    this.#eventsPresenter.clear();

    if (!filteredEvents.length) {
      this.#renderEmptyEventsMessage();
      return;
    }

    if (isRenderSorting) {
      this.#renderSorting();
    }

    filteredEvents.sort(sortEvents[this.#currentSortingType]);

    //! а нужно ли...
    this.#events = filteredEvents;
    this.#eventsPresenter.init(filteredEvents);
  }

  #renderEmptyEventsMessage() {
    this.#emptyEventsMessageComponent = new MessageView({ message: filterEmptyMessage[this.#filterModel.filterType] });
    render(this.#emptyEventsMessageComponent, this.#tripEventsElement);
  }

  #removeEmptyEventsMessage() {
    remove(this.#emptyEventsMessageComponent);
    this.#emptyEventsMessageComponent = null;
  }

  #onModelsChange = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventsPresenter.updateEvent(data); //! проверить
        updateItemByKey(this.#events, data); //! т.к. нет фильтрации при сортировке
        break;
      case UpdateType.MINOR:
        this.#clear();
        this.#render();
        break;
      case UpdateType.MAJOR:
        this.#clear({ isResetSortingType: true });
        this.#render();
        break;
    }
  };

  #onAddNewEventClose = () => {
    this.#addEventButtonComponent.enable();

    //! может сразу this.#renderEvents(); или через событие
    if (!this.#events.length) {
      this.#renderEmptyEventsMessage();
    }
  };

  #onAddEventClick = () => {
    //! посмотреть в ТЗ
    //! 1. Если событий, то нет компонета сортировки. но наверное нет смысла его рисовать, т.к. можно отменить добавление
    //! 2. Сбросить фильтр и сортировку при добавлении нового
    if (!this.#events.length) {
      this.#removeEmptyEventsMessage();
    }
    this.#eventsPresenter.addEvent();
  };

  #onSortingChange = (sortingType) => {
    this.#currentSortingType = sortingType;
    this.#renderEvents({ isRenderSorting: false, isApplyFilter: false });
  };
}
