import { getById } from '../utils.js';
import { initMockData, getMockTypes, getMockDestinations, getMockOffers, getMockEvents, getMockInfo } from '../mock/events.js';

export default class EventsModel {
  //!!events = getEvents();
  types = [];
  destinations = [];
  offers = [];
  events = [];
  info = {}; //!! может делать ли отдельную модель для info?

  constructor() {
    //!! временно
    initMockData();
    this.types = getMockTypes();
    this.destinations = getMockDestinations();
    this.offers = getMockOffers();
    this.events = getMockEvents();
    this.info = getMockInfo();
  }

  getTypes() {
    return this.types;
  }

  getOffers() {
    return this.offers;
  }

  getOffersByType(type) {
    //!! проверить
    return getById(this.offers, type, 'type');
  }

  getDestinations() {
    return this.destinations;
  }

  getEvents() {
    return this.events;
  }

  getInfo() {
    return this.info;
  }
}
