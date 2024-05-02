import { render } from './render.js';
import FiltersView from './view/filters-view.js';
import SortingView from './view/sorting-view.js';
import InfoPresenter from './presenter/info-presenter.js';
import ContentPresenter from './presenter/content-presenter.js';
import EventsModel from './model/events-model.js';
import { getRandomArrayElement } from './utils.js';
import { FILTERS, SORTINGS, DISABLED_SORTINGS } from './const.js';

const bodyElement = document.body;

const headerContainerElement = bodyElement.querySelector('div.page-body__container.page-header__container');
const headerMainElement = headerContainerElement.querySelector('div.trip-main');
const headerFiltersElement = headerContainerElement.querySelector('div.trip-controls__filters');
const contentElement = bodyElement.querySelector('section.trip-events');

const eventsModel = new EventsModel();

const infoPresenter = new InfoPresenter({ containerElement: headerMainElement, eventsModel }); //? может нужна отдельная модель?
const contentPresenter = new ContentPresenter({ containerElement: contentElement, eventsModel });

//? есть ли смысл добавить FILTERS и SORTINGS и активные типы в модель?
const activeFilter = getRandomArrayElement(FILTERS);
render(new FiltersView(FILTERS, activeFilter), headerFiltersElement);

//! очень похожи FiltersView и SortingView, после наследования передалать
const activeSorting = getRandomArrayElement(SORTINGS.filter((item) => !DISABLED_SORTINGS.includes(item)));
render(new SortingView(SORTINGS, activeSorting, DISABLED_SORTINGS), contentElement);

infoPresenter.init();
contentPresenter.init();
