import { render } from '../framework/render.js';
import InfoPresenter from './info-presenter.js';
import EventsPresenter from './events-presenter.js';
import FiltersView from '../view/filters-view.js';
import SortingView from '../view/sorting-view.js';
import MessageView from '../view/message-view.js';
import { DEFAULT_SORTING_TYPE, MessageType } from '../const.js';
import { sortEvents } from '../utils/sorting.js';

export default class TripPresenter {
  #containerElement = null; //! удалить, если не будет использоваться нигде кроме конструктора
  #eventsModel = null;

  #infoPresenter = null;
  #eventsPresenter = null;

  #headerTripFiltersElement = null;
  #tripEventsElement = null;

  #filtersComponent = null;
  #sortingComponent = null;

  #events = [];

  #currentSortingType = DEFAULT_SORTING_TYPE;

  constructor({ containerElement, eventsModel }) {
    //! Одинаково у всех презенторов, можно выделить в абстарктный презентор
    this.#containerElement = containerElement;
    this.#eventsModel = eventsModel;

    const headerContainerElement = containerElement.querySelector('div.page-body__container.page-header__container');//! оставить один селектор, и других местах проверить
    const headerTripMainElement = headerContainerElement.querySelector('div.trip-main');
    this.#headerTripFiltersElement = headerContainerElement.querySelector('div.trip-controls__filters');
    this.#tripEventsElement = containerElement.querySelector('section.trip-events');

    this.#infoPresenter = new InfoPresenter({ containerElement: headerTripMainElement, eventsModel });
    this.#eventsPresenter = new EventsPresenter({ containerElement: this.#tripEventsElement, eventsModel });

    this.#filtersComponent = new FiltersView(eventsModel.events);
    this.#sortingComponent = new SortingView(this.#onSortingChange);
  }

  init() {
    this.#events = this.#eventsModel.events;
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
    //! после добавления нового события пересчитать фильтры и отрисовать заново, если не все фильтры были активны
    render(this.#filtersComponent, this.#headerTripFiltersElement);
  }

  #renderEvents() {
    //! нужно будет вызывать и при изменении фильтра, добавлении нового события
    //! и сортировать и фильтровать новое событие
    if (this.#events.length) {
      render(this.#sortingComponent, this.#tripEventsElement);

      this.#events.filter(() => true); //! временно, как будет готова фильтрация, то отфильтровать this.#events.filter(filterEvents(this.#currentFilterType))
      this.#events.sort(sortEvents[this.#currentSortingType]);

      this.#eventsPresenter.init(this.#events);
    } else {
      render(new MessageView(MessageType.NEW_EVENT), this.#tripEventsElement);
    }
  }

  #onSortingChange = (sortingType) => {
    this.#currentSortingType = sortingType;
    this.#renderEvents();
  };
}
