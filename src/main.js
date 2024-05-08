import { render } from './framework/render.js';
import TripFiltersView from './view/trip-filters-view.js';
import TripSortingView from './view/trip-sorting-view.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import TripEventsModel from './model/trip-events-model.js';
import { getRandomArrayElement } from './utils/random.js';
import { TRIP_FILTERS, TRIP_SORTINGS } from './const.js';

const bodyElement = document.body;

const headerContainerElement = bodyElement.querySelector('div.page-body__container.page-header__container');
const headerTripMainElement = headerContainerElement.querySelector('div.trip-main');
const headerTripFiltersElement = headerContainerElement.querySelector('div.trip-controls__filters');
const tripEventsElement = bodyElement.querySelector('section.trip-events');

const tripEventsModel = new TripEventsModel();

const tripInfoPresenter = new TripInfoPresenter({ containerElement: headerTripMainElement, tripEventsModel });
const tripEventsPresenter = new TripEventsPresenter({ containerElement: tripEventsElement, tripEventsModel });

const activeFilter = getRandomArrayElement(TRIP_FILTERS);
render(new TripFiltersView(TRIP_FILTERS, activeFilter), headerTripFiltersElement);

//! очень похожи FiltersView и SortingView, после теории о наследовании передалать и когда в TRIP_FILTERS добавиться isEnabled
const activeSorting = getRandomArrayElement(TRIP_SORTINGS.filter((item) => item.isEnabled))?.name; //! верменно, выбираем случаную сортировку
render(new TripSortingView(TRIP_SORTINGS, activeSorting), tripEventsElement);

tripInfoPresenter.init();
tripEventsPresenter.init();
