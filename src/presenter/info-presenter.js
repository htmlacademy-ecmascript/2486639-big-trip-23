import { render, RenderPosition } from '../framework/render.js';
import { getMockTripInfo } from '../mock/events.js'; //! временно
import InfoView from '../view/info-view.js';

export default class InfoPresenter {
  #containerElement = null;
  #eventsModel = null;

  constructor({ containerElement, eventsModel }) {
    this.#containerElement = containerElement;
    this.#eventsModel = eventsModel;
  }

  init() {
    //! временно, разный текст в зависмости от фильтра, и обработка нажатий
    const { events, destinations } = this.#eventsModel; //! считать либо тут - взять все данные или в модели
    if (events.length) {
      const destinationData = Array.from(destinations, ([, { name }]) => ({ name }));
      render(new InfoView(getMockTripInfo(destinationData)), this.#containerElement, RenderPosition.AFTERBEGIN);
    }
  }
}
