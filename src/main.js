import TripPresenter from './presenter/trip-presenter.js';
import EventsModel from './model/events-model.js';

const eventsModel = new EventsModel();
const tripPresenter = new TripPresenter({ containerElement: document.body, eventsModel });

tripPresenter.init();

/*
 * Вопросы:
 *   1. Огромный файл src\view\event-form-view.js, может из него убрать функцию createEventFormTemplate(), а какое название для файла src\view\event-form-view-template.js? критерии?
 *        подумать, что еще можно убрать и где еще есть огромные файлы...
 *   2. Найминг src\presenter\event-presenter.js onGetTypeOffers: this.#onGetTypeOffers, //? getTypeOffer? как же правильно оформить получение уточняющих данных с презентора?, все действия с презентора передаем обработчиками
 *
 * Заметки:
 *   1. Смотреть где нужны деструкторы, там где есть перересовка и удаление сомпонентов и презенторов
 *   2. Не использовать '?.()' для проверки перед выполнением this.#onEditClick?.()
 *   3. Выделить общее <li class="trip-events__item"> у EventFormView и EventItemView
 *
 * Дополнительный функционал(отключить есть будут проблемы с автотестами):
 *   1. При открытии формы редактирования события, расположенных снизу, прокрутить страницу немного вниз, если форма отрисовалась ниже видимой области
 *       src/presenter/event-presenter.js EventPresenter.#openForm() - что то такое использовал Element.scrollTo(scrollX, Element.scrollHeight);
 *   2. Не закрываеться элемент с типом события на форме редактирования, если открыт список городов или выбор дат, при клике вне него, по нажатию Esc закрываеться вся форма.
 *   3. Выдавать весь список городов, на форме редактирования события или при очистке поля добавить пробел для вывода полного списка, т.к. без проблеа три города в списке.
 *   4. Обработать на форме нажатие Enter в src\presenter\event-presenter.js EventPresenter.#onDocumentKeyDown
 *
 */
