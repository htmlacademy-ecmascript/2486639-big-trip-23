import AbstractView from '../framework/view/abstract-view.js';
import { isEmptyArray, getById } from '../utils/utils.js';

export default class AbstractEventView extends AbstractView {
  _event = null;
  _eventTypes = [];
  _destinations = [];
  _typeOffers = [];

  constructor({ event, eventTypes, destinations, typeOffers }) {
    if (new.target === AbstractEventView) {
      throw new Error('Can\'t instantiate AbstractEventView, only concrete one.');
    }

    super();
    this._event = event;
    this._eventTypes = eventTypes;
    this._destinations = destinations;
    this._typeOffers = typeOffers;
  }

  get _eventOffers() {
    //! почти одинаковый код с _availableEventOffers
    const { type, offers: eventOfferIds } = this._event;
    const currentType = getById(this._typeOffers, type, 'type');
    const typeOffers = currentType?.offers;

    if (isEmptyArray(typeOffers)) {
      return [];
    }

    if (isEmptyArray(eventOfferIds)) {
      return typeOffers;
    }

    return typeOffers.filter((offer) => eventOfferIds.includes(offer.id));
  }

  get _destinationNames() {
    return this._destinations.map((destination) => destination.name);
  }

  get _availableEventOffers() {
    const { type, offers: eventOfferIds } = this._event;
    const currentType = getById(this._typeOffers, type, 'type');
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
