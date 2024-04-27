import { getEvents as getMockEvents } from '../mock/events.js';

export default class EventsModel {
  events = getMockEvents();

  getEvents() {
    return this.events;
  }
}
