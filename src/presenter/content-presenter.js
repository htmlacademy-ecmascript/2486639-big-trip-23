import { render } from '../render.js';

import SortingView from '../view/sorting-view.js';
import EventsListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import EventFormView from '../view/event-form-view.js';
import MessageView from '../view/message-view.js';

const EVENT_ITEM_COUNT = 3;

export default class PagePresenter {
  eventsListComponent = new EventsListView();

  init({ eventsSectionElement }) {
    const eventsListElement = this.eventsListComponent.getElement();

    render(new SortingView(), eventsSectionElement);
    render(new EventFormView(), eventsListElement);
    for (let i = 0; i < EVENT_ITEM_COUNT; i++) {
      render(new EventItemView(), eventsListElement);
    }
    render(this.eventsListComponent, eventsSectionElement);
    render(new MessageView(), eventsSectionElement);
  }
}
