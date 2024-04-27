import { render } from '../render.js';
//!!import { render, RenderPosition } from '../render.js';

import ContentView from '../view/content-view.js';
import SortingView from '../view/sorting-view.js';
import EventsListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import EventFormView from '../view/event-form-view.js';
import MessageView from '../view/message-view.js';

const EVENT_ITEM_COUNT = 3;

export default class PagePresenter {
  constructor() {
    this.contentComponent = new ContentView();
    this.eventsListComponent = new EventsListView();
    this.eventsListElement = this.eventsListComponent.getElement();
  }

  init({ containerElement, tripEventsSectionElement }) {
    render(new SortingView(), tripEventsSectionElement);
    render(new EventFormView(), this.eventsListElement);
    for (let i = 0; i < EVENT_ITEM_COUNT; i++) {
      render(new EventItemView(), this.eventsListElement);
    }
    render(this.eventsListComponent, tripEventsSectionElement);
    render(new MessageView(), tripEventsSectionElement);
    render(this.contentComponent, containerElement);
  }
}
