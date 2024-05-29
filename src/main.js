import FilterModel from './model/filter-model.js';
import EventsModel from './model/events-model.js';
import TripPresenter from './presenter/trip-presenter.js';

const headerContainerElement = document.body.querySelector('.page-header__container');
const headerTripMainElement = headerContainerElement.querySelector('.trip-main');
const headerTripFiltersElement = headerContainerElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.body.querySelector('.trip-events');
headerTripMainElement.querySelector('.trip-main__event-add-btn').remove(); // удалю здесь кнопку, чтобы не менять /public/index.html

const filterModel = new FilterModel();
const eventsModel = new EventsModel();

const tripPresenter = new TripPresenter({
  headerTripMainElement,
  headerTripFiltersElement,
  tripEventsElement,
  filterModel,
  eventsModel
});

tripPresenter.init();

/*
 * Вопросы:
 *   1. проверить: фильтр не по дням, удалить все события, фильтр должен остать который есть, но собщение..., но его делает не активным функция доступных фильтров
 *       const disabled = (disabledFilters.includes(filter) && activeFilter !== filter) ? 'disabled' : '';
 *   2. now в при отрисовке фильтров... обновляеться только при изменнии модели... а нужно ли обновлять при сортировке или другом действии? в ТЗ что то есть?
 *         а фильтрацию к данным мы применяем каждый раз с новой датой...
 *         или в фильтрации применять старую дату или обновлять доступные фильтры...
 *
 * Заметки:
 *   1. Смотреть где нужны деструкторы, там где есть перересовка и удаление сомпонентов и презентеров
 *   2. Не использовать '?.()' для проверки перед выполнением this.#onEditClick?.()
 *   3. event-presenter.js и new-event-presenter.js немного похожи... попробовать выделить общего предка
 *   4. Выделить общее <li class="trip-events__item"> у EventFormView и EventItemView !!! о может тут быть пброблема с тряской формы после отмены...
 *        li+item/form init+render
 *   5. event-presenter.js, попробовать убрать создание формы сразу, а содвавать в момент переключения и в дальнейшем не удалять, пока не будет перерисовки
 *   6. не вызывать обработчки напрямую!
 *   7. В презентер похожий код, можно попробовать вынести в базовый класс (FilterPresenter, TripPresenter)
 *   8. проверить перерисовку при добавлении нового события
 *   9. проверить сортировату и фильтрацию дабавленного события
 *   10. почитать ТЗ что делать с открытым добавление/редактирование события, при нажатии на фильтрацию и сортировку, закрывать?
 *
 *
 * Дополнительный функционал(отключить есть будут проблемы с автотестами):
 *   1. При открытии формы редактирования события, расположенных снизу, прокрутить страницу немного вниз, если форма отрисовалась ниже видимой области
 *       src/presenter/event-presenter.js EventPresenter.#openForm() - что то такое использовал Element.scrollTo(scrollX, Element.scrollHeight);
 *   2. Не закрываеться элемент с типом события на форме редактирования, если открыт список городов или выбор дат, при клике вне него, по нажатию Esc закрываеться вся форма.
 *   3. flatpickr обработка Esc, сейчас закрываеться форма редактирования. Не особо понятен аглоритм оконяния выбора даты...
 *   4. Выдавать весь список городов, на форме редактирования события или при очистке поля добавить пробел для вывода полного списка, т.к. без проблеа три города в списке.
 *   5. Обработать на форме нажатие Enter в src\presenter\event-presenter.js EventPresenter.#onDocumentKeyDown
 *   6. Обработать форму если не было изменений
 *
 */
