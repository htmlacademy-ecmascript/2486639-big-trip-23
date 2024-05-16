import { render } from '../framework/render.js';
import InfoPresenter from './info-presenter.js';
import EventsPresenter from './events-presenter.js';
import FiltersView from '../view/filters-view.js';
import SortingView from '../view/sorting-view.js';

export default class TripPresenter {
  #containerElement = null;
  #eventsModel = null;

  #infoPresenter = null;
  #eventsPresenter = null;

  #headerTripFiltersElement = null;
  #tripEventsElement = null;

  #filtersComponent = null;
  #sortingComponent = null;

  #events = null;

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
    this.#sortingComponent = new SortingView();//! будет передача обработчиков
  }

  init() {
    this.#events = this.#eventsModel.events;
    this.#render();
  }

  #render() {
    this.#renderInfo();
    this.#renderFilter();
    this.#renderSorting();
    this.#renderEvents();
  }

  #renderInfo() {
    this.#infoPresenter.init();
  }

  #renderFilter() {
    //! возможно стоит отрисовать в конструкторе или init и не заводить #headerTripFiltersElement
    render(this.#filtersComponent, this.#headerTripFiltersElement);
  }

  #renderSorting() {
    if (this.#events.size) {
      render(this.#sortingComponent, this.#tripEventsElement);
    }
  }

  #renderEvents() {
    this.#eventsPresenter.init(this.#events); //! тут стоит передать фильтрованные и отсортированные
  }
}
