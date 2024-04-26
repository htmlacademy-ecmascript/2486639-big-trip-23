import { render } from '../render.js';
//!!import { render, RenderPosition } from '../render.js';
import HeaderView from '../view/header-view.js';
import ContentView from '../view/content-view.js';

const pageHeaderContainerElement = document.querySelector('.page-body');

export default class PagePresenter {
  headerComponent = new HeaderView();
  contentComponent = new ContentView();

  init() {
    pageHeaderContainerElement.innerHTML = '';
    render(this.headerComponent, pageHeaderContainerElement);
    render(this.contentComponent, pageHeaderContainerElement);

    //render(new SortView(), this.boardComponent.getElement());
    //render(this.taskListComponent, this.boardComponent.getElement());
    //render(new TaskEditView(), this.taskListComponent.getElement());

    //for (let i = 0; i < 3; i++) {
    //  render(new TaskView(), this.taskListComponent.getElement());
    //}

    //render(new LoadMoreButtonView(), this.boardComponent.getElement());
  }
}
