import { render } from '../render.js';
//!!import { render, RenderPosition } from '../render.js';

import ContentView from '../view/content-view.js';
import SortingView from '../view/sorting-view.js';
import EventsListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import EventFormView from '../view/event-form-view.js';
import MessageView from '../view/message-view.js';

const tripEventsSectionSelector = 'section.trip-events';
const EVENT_ITEM_COUNT = 3;

export default class PagePresenter {
  constructor() {

    this.contentComponent = new ContentView();
    this.contentElement = this.contentComponent.getElement();
    this.tripEventsSectionElement = this.contentElement.querySelector(tripEventsSectionSelector);
    this.eventsListComponent = new EventsListView();
    this.eventsListElement = this.eventsListComponent.getElement();
  }

  init({ containerElement }) {
    render(new SortingView(), this.tripEventsSectionElement);
    render(new EventFormView(), this.eventsListElement);
    for (let i = 0; i < EVENT_ITEM_COUNT; i++) {
      render(new EventItemView(), this.eventsListElement);
    }
    render(this.eventsListComponent, this.tripEventsSectionElement);
    render(new MessageView(), this.tripEventsSectionElement);
    render(this.contentComponent, containerElement);
  }
}
