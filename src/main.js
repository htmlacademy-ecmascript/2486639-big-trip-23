import { render } from './framework/render.js';
import TripFiltersView from './view/trip-filters-view.js';
import TripSortingView from './view/trip-sorting-view.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import TripEventsModel from './model/trip-events-model.js';
import { TripFilters, TRIP_SORTINGS } from './const.js';

//! main.js как главный презентор, поробовать переделать
const bodyElement = document.body;

const headerContainerElement = bodyElement.querySelector('div.page-body__container.page-header__container');
const headerTripMainElement = headerContainerElement.querySelector('div.trip-main');
const headerTripFiltersElement = headerContainerElement.querySelector('div.trip-controls__filters');
const tripEventsElement = bodyElement.querySelector('section.trip-events');

const tripEventsModel = new TripEventsModel();

const tripInfoPresenter = new TripInfoPresenter({ containerElement: headerTripMainElement, tripEventsModel });
const tripEventsPresenter = new TripEventsPresenter({ containerElement: tripEventsElement, tripEventsModel });

render(new TripFiltersView(tripEventsModel.events, TripFilters.EVERYTHING), headerTripFiltersElement);

if (tripEventsModel.events.length) {
  render(new TripSortingView(TRIP_SORTINGS, TRIP_SORTINGS[0], [TRIP_SORTINGS[1]]), tripEventsElement);
}

tripInfoPresenter.init();
tripEventsPresenter.init();
