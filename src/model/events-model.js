import { getEvents as getMockEvents } from '../mock/events.js';

export default class EventsModel {
  events = getMockEvents();

  getEvents() {
    console.log(this.events);//!!
    return this.events;
  }
}
