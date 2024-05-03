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
    return getById(this.destinations, id); //! проверить
  }

  getOffersByType(type) {
    return getById(this.offers, type, 'type'); //! проверить
  }

  getEvents() {
    return this.events;
  }
}
