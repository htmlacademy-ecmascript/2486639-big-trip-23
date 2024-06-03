import FilterModel from './model/filter-model.js';
import EventsModel from './model/events-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import EventsApiService from './events-api-service.js';
import { BASE_URL, AUTHORIZATION } from './const.js';

const headerContainerElement = document.body.querySelector('.page-header__container');
const headerTripMainElement = headerContainerElement.querySelector('.trip-main');
const headerTripFiltersElement = headerContainerElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.body.querySelector('.trip-events');
headerTripMainElement.querySelector('.trip-main__event-add-btn').remove(); // удалю здесь кнопку, чтобы не менять /public/index.html

const filterModel = new FilterModel();
const eventsModel = new EventsModel({ eventsApiService: new EventsApiService(BASE_URL, AUTHORIZATION) });

const tripPresenter = new TripPresenter({
  headerTripMainElement,
  headerTripFiltersElement,
  tripEventsElement,
  filterModel,
  eventsModel
});

tripPresenter.init();
eventsModel.init().catch((error) => {
  tripPresenter.renderFailedMessage(error);
});

/*
 * Вопросы:
 *   1. Б9. В названии переменных не используется тип данных.
 *       использую: date, dateFrom, dateTo, string, number...
 */
