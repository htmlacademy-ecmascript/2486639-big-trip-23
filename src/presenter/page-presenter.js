import { render } from '../render.js';
//!!import { render, RenderPosition } from '../render.js';
//
import HeaderView from '../view/header-view.js';
import InfoView from '../view/info-view.js';
import FiltersView from '../view/filters-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
//
import ContentView from '../view/content-view.js';
import SortingView from '../view/sorting-view.js';
import EventsListView from '../view/events-list-view.js';
//
const headerTripSelector = 'div.trip-main';
const tripEventsSectionSelector = 'section.trip-events';
export default class PagePresenter {
  constructor() {
    //
    this.headerComponent = new HeaderView();
    this.headerElement = this.headerComponent.getElement().firstElementChild;
    this.headerTripElement = this.headerElement.querySelector(headerTripSelector);
    //
    this.contentComponent = new ContentView();
    this.contentElement = this.contentComponent.getElement();
    this.tripEventsSectionElement = this.contentElement.querySelector(tripEventsSectionSelector);
    //
  }

  init() {
    const bodyElement = document.body;
    bodyElement.innerHTML = '';
    //
    render(new InfoView(), this.headerTripElement);
    render(new FiltersView(), this.headerTripElement);
    render(new NewEventButtonView(), this.headerTripElement);
    render(this.headerComponent, bodyElement);
    //
    render(new SortingView(), this.tripEventsSectionElement);
    render(new EventsListView(), this.tripEventsSectionElement);
    //for (let i = 0; i < 3; i++) {
    //  render(new TaskView(), this.taskListComponent.getElement());
    //}
    render(this.contentComponent, bodyElement);
  }
}
