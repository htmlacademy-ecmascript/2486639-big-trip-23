import AbstractView from '../framework/view/abstract-view.js';
import { getById } from '../utils/utils.js';

export default class AbstractEventView extends AbstractView {
  _event = null;
  _eventTypes = [];
  _destinations = [];
  #typesOffers = [];

  constructor(event, eventTypes, destinations, typesOffers) {
    if (new.target === AbstractEventView) {
      throw new Error('Can\'t instantiate AbstractEventView, only concrete one.');
    }

    super();
    this._event = event;
    this._eventTypes = eventTypes;
    this._destinations = destinations;
    this.#typesOffers = typesOffers;
  }

  get _eventDestination() {
    return getById(this._destinations, this._event.destination);
  }

  get _eventTypeOffers() {
    return getById(this.#typesOffers, this._event.type, 'type')?.offers;
  }
}
