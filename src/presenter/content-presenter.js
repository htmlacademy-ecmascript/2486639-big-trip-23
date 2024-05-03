import { render } from '../render.js';
import EventsListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import EventFormView from '../view/event-form-view.js';
import MessageView from '../view/message-view.js';

export default class ContentPresenter {
  eventsListComponent = new EventsListView();

  constructor({ containerElement, eventsModel }) {
    this.containerElement = containerElement;
    this.eventsModel = eventsModel;
  }

  init() {
    const eventsListElement = this.eventsListComponent.getElement();
    const { eventsModel } = this;

    const types = eventsModel.getTypes();
    const destinationNames = eventsModel.getDestinationNames();

    const events = [...eventsModel.getEvents()];

    this.events = events; //! временно. сохранить то что будет диспользоваться в других методах.

    //! временно выводим форму редактирования и несколько событий
    const event = events[0];
    const destination = eventsModel.getDestinationById(event.destination);
    const offers = eventsModel.getAvailableEventOffers(event);
    render(new EventFormView(event, types, destinationNames, destination, offers), eventsListElement);
    for (let i = 1; i < events.length; i++) {
      render(new EventItemView(events[i]), eventsListElement);
    }

    //! с пустым списком нужно убрать весь блок и вывести сообщение! должен подойти MessageView <p class="trip-events__msg">Click New Event to create your first point</p>
    render(this.eventsListComponent, this.containerElement);

    render(new MessageView(), this.containerElement); //! временно
  }
}
