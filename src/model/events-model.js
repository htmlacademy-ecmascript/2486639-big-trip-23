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
    console.log(this.events);//!!
    //
  }

  getEvents() {
    return this.events;
  }
}
