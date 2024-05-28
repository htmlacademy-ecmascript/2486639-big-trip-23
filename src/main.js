import FilterModel from './model/filter-model.js';
import EventsModel from './model/events-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import { UpdateType } from './const.js';

const headerContainerElement = document.body.querySelector('.page-header__container');
const headerTripMainElement = headerContainerElement.querySelector('.trip-main');
const headerTripFiltersElement = headerContainerElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.body.querySelector('.trip-events');
const addEventButtonElement = headerContainerElement.querySelector('.trip-main__event-add-btn');

const filterModel = new FilterModel({ updateType: UpdateType.MAJOR });
const eventsModel = new EventsModel();

const tripPresenter = new TripPresenter({
  headerTripMainElement,
  headerTripFiltersElement,
  tripEventsElement,
  addEventButtonElement,
  filterModel,
  eventsModel
});

tripPresenter.init();

/*
 * Вопросы:
 *   1. Компонент без отрисовки? можно ли создать компонет на основе имеющейся разметки без "get template", сделал так для кнопки добавления события
 *   2. Обязательно ли однотипно инициализировать компонеты? или удалить кномпу добавления из "public\index.html"
 *        есть простые new FiltersView(eventsModel.events), new SortingView(this.#onSortingChange)
 *        есть сложные new EventFormView({ event, destinationInfo, ..., onFormSubmit: this.#onFormSubmit, onDelete: this.#onDelete, ...});
 *
 * Заметки:
 *   1. Смотреть где нужны деструкторы, там где есть перересовка и удаление сомпонентов и презенторов
 *   2. Не использовать '?.()' для проверки перед выполнением this.#onEditClick?.()
 *   3. Выделить общее <li class="trip-events__item"> у EventFormView и EventItemView
 *   4. src\presenter\event-presenter.js попробовать сделать наследование для добавления события
 *   5. typeOffers.filter((typeOffer) => eventOfferIds.has(typeOffer.id)), а если офферы типа(typeOffers) сделать Map, то как подружить Map и Set... подумать
 *
 * Дополнительный функционал(отключить есть будут проблемы с автотестами):
 *   1. При открытии формы редактирования события, расположенных снизу, прокрутить страницу немного вниз, если форма отрисовалась ниже видимой области
 *       src/presenter/event-presenter.js EventPresenter.#openForm() - что то такое использовал Element.scrollTo(scrollX, Element.scrollHeight);
 *   2. Не закрываеться элемент с типом события на форме редактирования, если открыт список городов или выбор дат, при клике вне него, по нажатию Esc закрываеться вся форма.
 *   3. flatpickr обработка Esc, сейчас закрываеться форма редактирования. Не особо понятен аглоритм оконяния выбора даты...
 *   4. Выдавать весь список городов, на форме редактирования события или при очистке поля добавить пробел для вывода полного списка, т.к. без проблеа три города в списке.
 *   5. Обработать на форме нажатие Enter в src\presenter\event-presenter.js EventPresenter.#onDocumentKeyDown
 *
 */
