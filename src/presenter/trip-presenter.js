import { render, remove } from '../framework/render.js';
import InfoPresenter from './info-presenter.js';
import FilterPresenter from './filter-presenter.js';
import EventsPresenter from './events-presenter.js';
import SortingView from '../view/sorting-view.js';
import ButtonView from '../view/button-view.js';
import MessageView from '../view/message-view.js';
import { filterEmptyMessage, DEFAULT_SORTING_TYPE } from '../const.js';
import { sortEvents } from '../utils/sorting.js';
import { filterEvents } from '../utils/filter.js';

export default class TripPresenter {
  #filterModel = null;
  #eventsModel = null;

  #infoPresenter = null;
  #filterPresenter = null;
  #eventsPresenter = null;

  #tripEventsElement = null;

  #emptyEventsMessageComponent = null;
  #sortingComponent = null;
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

    this.#sortingComponent = new SortingView({ onSortingChange: this.#onSortingChange });
    this.#addEventButtonComponent = new ButtonView({ buttonElement: addEventButtonElement, onClick: this.#onAddEventClick });
  }

  init() {
    this.#events = [...this.#eventsModel.events]; //! временно
    this.#render();
  }

  #render() {
    this.#renderInfo();
    this.#renderFilter();
    this.#renderEvents();
  }

  #renderInfo() {
    //! нужно будет вызывать при изменении данных
    this.#infoPresenter.init();
  }

  #renderFilter() {
    this.#filterPresenter.init();
  }

  #renderEvents() {
    this.#eventsPresenter.clear();

    if (!this.#events.length) {
      this.#renderEmptyEventsMessage();
      return;
    }

    render(this.#sortingComponent, this.#tripEventsElement);

    //! нужно будет вызывать и при изменении фильтра, добавлении нового события, или не так!
    //! и сортировать и фильтровать дабавленное новое событие, или не так!
    const now = Date.now();
    this.#events.filter(({ dateFrom, dateTo }) => filterEvents[this.#filterModel.filterType](dateFrom, dateTo, now));
    this.#events.sort(sortEvents[this.#currentSortingType]);

    this.#eventsPresenter.init(this.#events);
  }

  #renderEmptyEventsMessage() {
    this.#emptyEventsMessageComponent = new MessageView({ message: filterEmptyMessage[this.#filterModel.filterType] });
    render(this.#emptyEventsMessageComponent, this.#tripEventsElement);
  }

  #removeEmptyEventsMessage() {
    remove(this.#emptyEventsMessageComponent);
    this.#emptyEventsMessageComponent = null;
  }

  #onAddNewEventClose = () => {
    this.#addEventButtonComponent.enable();

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
    this.#renderEvents();
  };
}
