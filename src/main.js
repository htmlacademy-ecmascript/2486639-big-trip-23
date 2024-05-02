import { render } from './render.js';
import FiltersView from './view/filters-view.js';
import SortingView from './view/sorting-view.js';
import InfoPresenter from './presenter/info-presenter.js';
import ContentPresenter from './presenter/content-presenter.js';
import EventsModel from './model/events-model.js';
import { getRandomArrayElement } from './utils.js';
import { FILTER_TYPES, SORTING_TYPES } from './const.js';

const bodyElement = document.body;

const headerContainerElement = bodyElement.querySelector('div.page-body__container.page-header__container');
const headerMainElement = headerContainerElement.querySelector('div.trip-main');
const headerFiltersElement = headerContainerElement.querySelector('div.trip-controls__filters');
const contentElement = bodyElement.querySelector('section.trip-events');

const eventsModel = new EventsModel();

const infoPresenter = new InfoPresenter({ containerElement: headerMainElement, eventsModel }); //? может нужна отдельная модель?
const contentPresenter = new ContentPresenter({ containerElement: contentElement, eventsModel });

//? есть ли смысл добавить FILTER_TYPES и SORTING_TYPES и выбранные типы в модель?
const activeFilter = getRandomArrayElement(FILTER_TYPES);
render(new FiltersView(FILTER_TYPES, activeFilter), headerFiltersElement);

//!! очень похожи с FiltersView
const activeSorting = getRandomArrayElement(SORTING_TYPES);
render(new SortingView(SORTING_TYPES, activeSorting), contentElement);

infoPresenter.init();
contentPresenter.init();
