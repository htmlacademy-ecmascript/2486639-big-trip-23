import { render } from './framework/render.js';
import TripFiltersView from './view/filters-view.js';
import TripSortingView from './view/sorting-view.js';
import TripInfoPresenter from './presenter/info-presenter.js';
import TripEventsPresenter from './presenter/events-presenter.js';
import TripEventsModel from './model/events-model.js';
import { FilterType, TRIP_SORTINGS } from './const.js';

//! main.js как главный презентор, поробовать переделать
const bodyElement = document.body;

const headerContainerElement = bodyElement.querySelector('div.page-body__container.page-header__container');
const headerTripMainElement = headerContainerElement.querySelector('div.trip-main');
const headerTripFiltersElement = headerContainerElement.querySelector('div.trip-controls__filters');
const tripEventsElement = bodyElement.querySelector('section.trip-events');

const tripEventsModel = new TripEventsModel();

const tripInfoPresenter = new TripInfoPresenter({ containerElement: headerTripMainElement, tripEventsModel });
const tripEventsPresenter = new TripEventsPresenter({ containerElement: tripEventsElement, tripEventsModel });

render(new TripFiltersView(tripEventsModel.events, FilterType.EVERYTHING), headerTripFiltersElement);

if (tripEventsModel.events.length) {
  render(new TripSortingView(TRIP_SORTINGS, TRIP_SORTINGS[0], [TRIP_SORTINGS[1]]), tripEventsElement);
}

tripInfoPresenter.init();
tripEventsPresenter.init();
