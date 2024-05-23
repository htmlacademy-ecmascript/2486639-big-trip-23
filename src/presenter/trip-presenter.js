import { render } from '../framework/render.js';
import InfoPresenter from './info-presenter.js';
import EventsPresenter from './events-presenter.js';
import FiltersView from '../view/filters-view.js';
import SortingView from '../view/sorting-view.js';
import { DEFAULT_SORTING_TYPE } from '../const.js';
import { sortEvents } from '../utils/sorting.js';

export default class TripPresenter {
  #containerElement = null; //! удалить, если не будет использоваться нигде кроме конструктора
  #eventsModel = null;

  #infoPresenter = null;
  #eventsPresenter = null;

  #headerTripFiltersElement = null;
  #tripEventsElement = null;
  #addEventButtonElement = null;

  #filtersComponent = null;
  #sortingComponent = null;

  #events = [];

  #currentSortingType = DEFAULT_SORTING_TYPE;

  constructor({ containerElement, eventsModel }) {
    //! Одинаково у всех презенторов, можно выделить в абстарктный презентор
    this.#containerElement = containerElement;
    this.#eventsModel = eventsModel;

    const headerContainerElement = containerElement.querySelector('.page-header__container');
    const headerTripMainElement = headerContainerElement.querySelector('.trip-main');
    this.#headerTripFiltersElement = headerContainerElement.querySelector('.trip-controls__filters');
    this.#tripEventsElement = containerElement.querySelector('.trip-events');

    this.#infoPresenter = new InfoPresenter({ containerElement: headerTripMainElement, eventsModel });
    this.#eventsPresenter = new EventsPresenter({
      containerElement: this.#tripEventsElement,
      eventsModel,
      onAddNewEventClose: this.#onAddNewEventClose
    });

    this.#filtersComponent = new FiltersView(eventsModel.events);
    this.#sortingComponent = new SortingView(this.#onSortingChange);

    this.#addEventButtonElement = headerContainerElement.querySelector('.trip-main__event-add-btn'); //! убрать либо в main, либо отдельный компонет
    this.#addEventButtonElement.addEventListener('click', this.#onAddEventButtonElementClick);
  }

  init() {
    this.#events = [...this.#eventsModel.events];
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
    //! и сортировать и фильтровать дабавленное новое событие
    if (this.#events.length) {
      render(this.#sortingComponent, this.#tripEventsElement);

      this.#events.filter(() => true); //! временно, как будет готова фильтрация, то отфильтровать this.#events.filter(filterEvents(this.#currentFilterType))
      this.#events.sort(sortEvents[this.#currentSortingType]);
    }

    this.#eventsPresenter.init(this.#events);
  }

  #onAddNewEventClose = () => {
    this.#addEventButtonElement.disabled = false;
  };

  #onAddEventButtonElementClick = (evt) => {
    evt.preventDefault();
    this.#addEventButtonElement.disabled = true;
    //! посмотреть в ТЗ, если собитий, то нет компонета сортировки. но наверное нет смысла его рисовать, т.к. можно отменить добавление
    this.#eventsPresenter.addEvent();
  };

  #onSortingChange = (sortingType) => {
    this.#currentSortingType = sortingType;
    this.#renderEvents();
  };
}
