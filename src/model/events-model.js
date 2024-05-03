import { getById } from '../utils.js';
import { initMockData, getMockTypes, getMockDestinations, getMockOffers, getMockEvents, getMockInfo } from '../mock/events.js';

export default class EventsModel {
  constructor() {
    //! временно
    initMockData();
    this.info = getMockInfo();
    this.types = getMockTypes();
    const destinations = getMockDestinations();
    this.destinations = destinations;
    this.destinationNames = destinations.map((destination) => destination.name);
    this.offers = getMockOffers();
    this.events = getMockEvents();
  }

  getInfo() {
    return this.info;
  }

  getTypes() {
    return this.types;
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

    if (!typeOffers || typeOffers.length === 0) {
      return null;
    }

    if (!eventOfferIds || eventOfferIds.length === 0) {
      return typeOffers;
    }

    return typeOffers.map((offer) => ({ ...offer, checked: eventOfferIds.includes(offer.id) }));
  }

  getEvents() {
    return this.events;
  }
}
