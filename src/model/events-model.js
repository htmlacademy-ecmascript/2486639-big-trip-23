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

  getDestination(id) {
    return getById(this.destinations, id);
  }

  getEvents() {
    return this.events;
  }
}
