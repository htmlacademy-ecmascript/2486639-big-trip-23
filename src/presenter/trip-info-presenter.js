import { render, RenderPosition } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #containerElement = null;
  #tripEventsModel = null;

  #destinations = [];
  #typesOffers = [];
  #events = [];

  constructor({ containerElement, tripEventsModel }) {
    this.#containerElement = containerElement;
    this.#tripEventsModel = tripEventsModel;

    //! временно. сохранить то что будет использоваться в других методах.
    //! дубль кода с презентором событий, сделать наследование
    this.#destinations = [...this.#tripEventsModel.destinations];
    this.#typesOffers = [...this.#tripEventsModel.typesOffers];
    this.#events = [...this.#tripEventsModel.events];
  }

  init() {
    if (this.#events.length) {
      render(new TripInfoView(this.#events, this.#destinations, this.#typesOffers), this.#containerElement, RenderPosition.AFTERBEGIN);
    }
  }
}
