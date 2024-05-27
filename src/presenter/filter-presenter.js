import { render } from '../framework/render.js';
import FiltersView from '../view/filters-view.js';

export default class FilterPresenter {
  //! похоже у нескольких презенторов, вынести в базовый класс + конструктор
  #containerElement = null;
  #eventsModel = null;

  constructor({ containerElement, eventsModel }) {
    this.#containerElement = containerElement;
    this.#eventsModel = eventsModel;
  }

  init() {
    //! после добавления нового события пересчитать фильтры и отрисовать заново, если не все фильтры были активны, или не так!
    render(new FiltersView(this.#eventsModel.events), this.#containerElement);
  }
}
