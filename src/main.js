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
 *
 * Заметки:
 *   1. event-presenter.js, попробовать убрать создание формы сразу, а содвавать в момент переключения и в дальнейшем не удалять, пока не будет перерисовки
 *   2. не вызывать обработчки напрямую!
 *   7. В презентер похожий код, можно попробовать вынести в базовый класс (FilterPresenter, TripPresenter)
 *   8. проверить перерисовку при добавлении нового события
 *   9. проверить сортировату и фильтрацию дабавленного события
 *   11. перепроверить методы _ # и обычные их сортировку и вызов
 *   12. сменить название EventFormView-> EventEditView и имя файла
 *   13. попробовать объеденить логику this.#onDestinationInputElementChange и this.#onDestinationInputElementInput
 *
 * Дополнительный функционал(отключить есть будут проблемы с автотестами):
 *   1. При открытии формы редактирования события, расположенных снизу, прокрутить страницу немного вниз, если форма отрисовалась ниже видимой области
 *       src/presenter/event-presenter.js EventPresenter.#openForm() - что то такое использовал Element.scrollTo(scrollX, Element.scrollHeight);
 *   2. Не закрываеться элемент с типом события на форме редактирования, если открыт список городов или выбор дат, при клике вне него, по нажатию Esc закрываеться вся форма.
 *   3. flatpickr обработка Esc, сейчас закрываеться форма редактирования. Не особо понятен аглоритм оконяния выбора даты...
 *   4. Обработать на форме нажатие Enter в src\presenter\event-presenter.js EventPresenter.#onDocumentKeyDown
 *   5. Обработать форму если не было изменений
 *
 */
