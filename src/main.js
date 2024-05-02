import { render } from './render.js';
import FiltersView from './view/filters-view.js';
import HeaderMainPresenter from './presenter/header-main-presenter.js';
import ContentPresenter from './presenter/content-presenter.js';
import EventsModel from './model/events-model.js';

const bodyElement = document.body;

const headerContainerElement = bodyElement.querySelector('div.page-body__container.page-header__container');
const headerMainElement = headerContainerElement.querySelector('div.trip-main');
const headerFiltersElement = headerContainerElement.querySelector('div.trip-controls__filters');
const contentElement = bodyElement.querySelector('section.trip-events');

const eventsModel = new EventsModel();

const headerMainPresenter = new HeaderMainPresenter({ containerElement: headerMainElement }); //!! переименовать в InfoPresenter
const contentPresenter = new ContentPresenter({ containerElement: contentElement, eventsModel });

render(new FiltersView(), headerFiltersElement);

headerMainPresenter.init();
//headerFiltersPresenter.init();
contentPresenter.init();
