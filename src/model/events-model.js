import { getById } from '../utils.js';
import { initMockData, getTypes, getDestinations, getOffers, getEvents } from '../mock/events.js';

export default class EventsModel {
  //!!events = getEvents();
  types = [];
  destinations = [];
  offers = [];
  events = [];

  constructor() {
    //!! временно
    initMockData();
    this.types = getTypes();
    this.destinations = getDestinations();
    this.offers = getOffers();
    this.events = getEvents();
    //
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
}
