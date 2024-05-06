import { isEmptyArray, getById } from '../utils.js';
import { EVENT_TYPES } from '../const.js';
import { initMockData, getMockDestinations, getMockOffers, getMockEvents, getMockInfo } from '../mock/events.js';

export default class EventsModel {
  constructor() {
    //! временно
    initMockData(EVENT_TYPES);
    this.info = getMockInfo();
    const destinations = getMockDestinations();
    this.destinations = destinations;
    this.destinationNames = destinations.map((destination) => destination.name);
    this.offers = getMockOffers();
    this.events = getMockEvents();
  }

  getInfo() {
    return this.info;
  }

  getDestinationNames() {
    return this.destinationNames;
  }

  getDestinationById(id) {
    return getById(this.destinations, id);
  }

  getAvailableEventOffers(event) {
    const { type, offers: eventOfferIds } = event;
    const currentType = getById(this.offers, type, 'type');
    const typeOffers = currentType?.offers;

    if (isEmptyArray(typeOffers)) {
      return [];
    }

    if (isEmptyArray(eventOfferIds)) {
      return typeOffers;
    }

    return typeOffers.map((offer) => ({ ...offer, checked: eventOfferIds.includes(offer.id) }));
  }

  getEventOffers(event) {
    const { type, offers: eventOfferIds } = event;
    const currentType = getById(this.offers, type, 'type');
    const typeOffers = currentType?.offers;

    if (isEmptyArray(typeOffers)) {
      return [];
    }

    if (isEmptyArray(eventOfferIds)) {
      return typeOffers;
    }

    return typeOffers.filter((offer) => eventOfferIds.includes(offer.id));
  }

  getEvents() {
    return this.events;
  }
}
