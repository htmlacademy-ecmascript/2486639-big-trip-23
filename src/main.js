import TripPresenter from './presenter/trip-presenter.js';
import EventsModel from './model/events-model.js';

const eventsModel = new EventsModel();
const tripPresenter = new TripPresenter({ containerElement: document.body, eventsModel });

tripPresenter.init();

/*
 * Вопросы:
 *   нет
 *
 * Заметки:
 * 1. Смотреть где нужны деструкторы, там где есть перересовка и удаление сомпонентов и презенторов
 * 2. Не использовать '?.()' для проверки переде выполнением this.#onEditClick?.()
 *
 * Дополнительный функционал(отключить есть будут проблемы с автотестами):
 * 1. При открытии формы редактирования события, расположенных снизу, прокрутить страницу немного вниз, если форма отрисовалась ниже видимой области
 *     src/presenter/event-presenter.js EventPresenter.#openForm() - что то такое использовал Element.scrollTo(scrollX, Element.scrollHeight);
 *
 *
 */
