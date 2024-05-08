import AbstractView from '../framework/view/abstract-view.js';
import { isEmptyArray, getById } from '../utils/utils.js';

export default class AbstractEventView extends AbstractView {
  _event = null;
  _eventTypes = [];
  _destinations = [];
  #typesOffers = [];

  constructor({ event, eventTypes, destinations, typesOffers }) {
    if (new.target === AbstractEventView) {
      throw new Error('Can\'t instantiate AbstractEventView, only concrete one.');
    }

    super();
    this._event = event;
    this._eventTypes = eventTypes;
    this._destinations = destinations;
    this.#typesOffers = typesOffers;
  }

  get _eventTypeOffers() {
    return getById(this.#typesOffers, this._event.type, 'type')?.offers;
  }

  get _destinationNames() {
    return this._destinations.map((destination) => destination.name);
  }

  get _availableEventOffers() {
    //! одинаковый код
    const { type, offers: eventOfferIds } = this._event;
    const currentType = getById(this.#typesOffers, type, 'type');
    const typeOffers = currentType?.offers;

    if (isEmptyArray(typeOffers)) {
      return [];
    }

    if (isEmptyArray(eventOfferIds)) {
      return typeOffers;
    }

    return typeOffers.map((offer) => ({ ...offer, checked: eventOfferIds.includes(offer.id) }));
  }
}
