import { render, RenderPosition } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #containerElement = null;
  #tripEventsModel = null;

  constructor({ containerElement, tripEventsModel }) {
    this.#containerElement = containerElement;
    this.#tripEventsModel = tripEventsModel;
  }

  init() {
    const info = this.#tripEventsModel.info; //! временно

    render(new TripInfoView(info), this.#containerElement, RenderPosition.AFTERBEGIN);
  }
}
