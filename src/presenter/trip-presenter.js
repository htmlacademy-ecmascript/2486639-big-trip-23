import { render } from '../framework/render.js';
import InfoPresenter from './info-presenter.js';
import EventsPresenter from './events-presenter.js';
import SortingView from '../view/sorting-view.js';
import ButtonView from '../view/button-view.js';
import { DEFAULT_SORTING_TYPE } from '../const.js';
import { sortEvents } from '../utils/sorting.js';

export default class TripPresenter {
  #eventsModel = null;

  #infoPresenter = null;
  #eventsPresenter = null;

  #tripEventsElement = null;

  #sortingComponent = null;
  #addEventButtonComponent = null;

  #events = [];

  #currentSortingType = DEFAULT_SORTING_TYPE;

  constructor({ headerTripMainElement, tripEventsElement, addEventButtonElement, eventsModel }) {
    this.#eventsModel = eventsModel;
    this.#tripEventsElement = tripEventsElement;

    this.#infoPresenter = new InfoPresenter({
      containerElement: headerTripMainElement,
      eventsModel
    });
    this.#eventsPresenter = new EventsPresenter({
      containerElement: tripEventsElement,
      eventsModel,
      onAddNewEventClose: this.#onAddNewEventClose
    });

    this.#sortingComponent = new SortingView(this.#onSortingChange);
    this.#addEventButtonComponent = new ButtonView(addEventButtonElement, this.#onAddEventClick);
  }

  init() {
    this.#events = [...this.#eventsModel.events]; //! временно
    this.#render();
  }

  #render() {
    this.#renderInfo();
    this.#renderEvents();
  }

  #renderInfo() {
    //! нужно будет вызывать при изменении данных
    this.#infoPresenter.init();
  }

  #renderEvents() {
    //! нужно будет вызывать и при изменении фильтра, добавлении нового события, или не так!
    //! и сортировать и фильтровать дабавленное новое событие, или не так!
    if (this.#events.length) {
      render(this.#sortingComponent, this.#tripEventsElement);

      this.#events.filter(() => true); //! временно, как будет готова фильтрация, то отфильтровать this.#events.filter(filterEvents(this.#currentFilterType))
      this.#events.sort(sortEvents[this.#currentSortingType]);
    }

    this.#eventsPresenter.init(this.#events);
  }

  #onAddNewEventClose = () => {
    this.#addEventButtonComponent.enable();
  };

  #onAddEventClick = () => {
    //! посмотреть в ТЗ
    //! 1. Если событий, то нет компонета сортировки. но наверное нет смысла его рисовать, т.к. можно отменить добавление
    //! 2. Сбросить фильтр и сортировку при добавлении нового
    this.#eventsPresenter.addEvent();
  };

  #onSortingChange = (sortingType) => {
    this.#currentSortingType = sortingType;
    this.#renderEvents();
  };
}
