import { render, RenderPosition } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #containerElement = null;
  #tripEventsModel = null;

  #destinations = [];
  #offers = [];
  #events = [];

  constructor({ containerElement, tripEventsModel }) {
    this.#containerElement = containerElement;
    this.#tripEventsModel = tripEventsModel;

    //! временно
    //! дубль кода с презентором событий, сделать наследование
    this.#destinations = [...this.#tripEventsModel.destinations];
    this.#offers = [...this.#tripEventsModel.offers];
    this.#events = [...this.#tripEventsModel.events];
  }

  init() {
    //! разный текст в зависмости от фильтра, и обработка нажатий
    if (this.#events.length) {
      render(new TripInfoView(this.#events, this.#destinations, this.#offers), this.#containerElement, RenderPosition.AFTERBEGIN);
    }
  }
}
