import { render } from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import EventFormView from '../view/event-form-view.js';
import MessageView from '../view/message-view.js';
import { EVENT_TYPES } from '../const.js';

export default class ContentPresenter {
  eventsListComponent = new EventsListView();

  constructor({ containerElement, eventsModel }) {
    this.containerElement = containerElement;
    this.eventsModel = eventsModel;
  }

  init() {
    const eventsListElement = this.eventsListComponent.element;
    const { eventsModel } = this;

    const destinationNames = eventsModel.getDestinationNames();

    const events = [...eventsModel.getEvents()];

    this.events = events; //! временно. сохранить то что будет диспользоваться в других методах.

    //! временно выводим форму редактирования
    const event = events[0];
    const destination = eventsModel.getDestinationById(event.destination); //? где же правильней собирать данные? может во View?
    const offers = eventsModel.getAvailableEventOffers(event);
    render(new EventFormView(event, EVENT_TYPES, destinationNames, destination, offers), eventsListElement);
    //! временно выводим несколько событий
    for (let i = 1; i < events.length; i++) {
      const currentEvent = events[i];
      const { name: destinationName } = eventsModel.getDestinationById(currentEvent.destination);
      const eventOffers = eventsModel.getEventOffers(currentEvent);
      render(new EventItemView(currentEvent, destinationName, eventOffers), eventsListElement);
    }

    //! с пустым списком нужно убрать весь блок и вывести сообщение! должен подойти MessageView <p class="trip-events__msg">Click New Event to create your first point</p>
    render(this.eventsListComponent, this.containerElement);

    render(new MessageView(), this.containerElement); //! временно
  }
}
