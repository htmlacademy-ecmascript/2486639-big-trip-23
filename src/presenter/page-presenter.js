import { render } from '../render.js';
//!!import { render, RenderPosition } from '../render.js';
//
import HeaderView from '../view/header-view.js';
import InfoView from '../view/info-view.js';
import FiltersView from '../view/filters-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
//
import ContentView from '../view/content-view.js';
//
const headerMainSelector = 'div.trip-main';

export default class PagePresenter {
  constructor() {
    //
    this.headerComponent = new HeaderView();
    this.headerElement = this.headerComponent.getElement();
    //!! this.headerMainSectionElement понадобится в других методах?
    this.headerMainSectionElement = this.headerElement.querySelector(headerMainSelector);
    //
    this.contentComponent = new ContentView();
    //!! this.contentElement понадобится в других методах?
    this.contentElement = this.contentComponent.getElement();
  }

  init() {
    const bodyElement = document.body;
    bodyElement.innerHTML = '';

    render(new InfoView(), this.headerMainSectionElement);
    render(new FiltersView(), this.headerMainSectionElement);
    render(new NewEventButtonView(), this.headerMainSectionElement);

    render(this.headerComponent, bodyElement);
    render(this.contentComponent, bodyElement);

    //for (let i = 0; i < 3; i++) {
    //  render(new TaskView(), this.taskListComponent.getElement());
    //}
  }
}
