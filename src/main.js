import { render } from './render.js';
import FiltersView from './view/filters-view.js';
import InfoPresenter from './presenter/info-presenter.js';
import ContentPresenter from './presenter/content-presenter.js';
import EventsModel from './model/events-model.js';

const bodyElement = document.body;

const headerContainerElement = bodyElement.querySelector('div.page-body__container.page-header__container');
const headerMainElement = headerContainerElement.querySelector('div.trip-main');
const headerFiltersElement = headerContainerElement.querySelector('div.trip-controls__filters');
const contentElement = bodyElement.querySelector('section.trip-events');

const eventsModel = new EventsModel();

const infoPresenter = new InfoPresenter({ containerElement: headerMainElement, eventsModel }); //? может нужна отдельная модель?
const contentPresenter = new ContentPresenter({ containerElement: contentElement, eventsModel });

render(new FiltersView(), headerFiltersElement);

infoPresenter.init();
contentPresenter.init();
