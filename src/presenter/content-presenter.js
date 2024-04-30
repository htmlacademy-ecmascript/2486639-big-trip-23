import { render } from '../render.js';

import SortingView from '../view/sorting-view.js';
import EventsListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import EventFormView from '../view/event-form-view.js';
import MessageView from '../view/message-view.js';

export default class ContentPresenter {
  constructor({ containerElement, eventsModel }) {
    this.eventsListComponent = new EventsListView();
    this.containerElement = containerElement;
    this.eventsModel = eventsModel;
  }

  init() {
    const eventsListElement = this.eventsListComponent.getElement();

    const events = [...this.eventsModel.getEvents()];

    this.events = events; //!! временно

    render(new SortingView(), this.containerElement);

    //!! временно
    render(new EventFormView(events[0]), eventsListElement);
    for (let i = 1; i < events.length; i++) {
      render(new EventItemView(events[i]), eventsListElement);
    }
    //!! с пустым списком нужно убрать весь блок и вывести сообщение!! должен подойти MessageView <p class="trip-events__msg">Click New Event to create your first point</p>
    render(this.eventsListComponent, this.containerElement);
    //

    render(new MessageView(), this.containerElement); //!! временно
  }
}
