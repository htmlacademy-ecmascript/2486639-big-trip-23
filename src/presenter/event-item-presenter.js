import { remove } from '../framework/render.js';
import EventItemView from '../view/event-item-view.js';
import { UserAction, UpdateType } from '../const.js';
import { renderOrReplace } from '../utils/dom.js';

export default class EventItemPresenter {
  #containerElement = null;
  #event = null;
  #itemComponent = null;

  #onEditClick = null;
  #onEventChange = null;

  constructor({ containerElement, onEditClick, onEventChange }) {
    this.#containerElement = containerElement;
    this.#onEditClick = onEditClick;
    this.#onEventChange = onEventChange;
  }

  get component() {
    return this.#itemComponent;
  }

  destroy() {
    remove(this.#itemComponent); //! нужно ли?
  }

  init(event) {
    this.#event = event;
    const storedItemComponent = this.#itemComponent;

    this.#itemComponent = new EventItemView({
      event,
      onFavoriteClick: this.#onFavoriteClick,
      onEditClick: this.#onEditClick
    });

    renderOrReplace(this.#itemComponent, storedItemComponent, this.#containerElement);
  }

  #onFavoriteClick = () => {
    const isFavorite = !this.#event.isFavorite;
    this.#onEventChange(UserAction.UPDATE_EVENT, UpdateType.PATCH, { ...this.#event, isFavorite });
  };
}
