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
eventsModel.init();

/*
 * Вопросы:
 *   1. проверить: фильтр не по дням, удалить все события, фильтр должен остать который есть, но собщение..., но его делает не активным функция доступных фильтров
 *      или в событие поменяли дату и оно теперь будет в другом фильтре, а в это фильтре пусто
 *       const disabled = (disabledFilters.includes(filter) && activeFilter !== filter) ? 'disabled' : '';
 *   2. now() в при отрисовке фильтров... обновляеться только при изменнии модели... а нужно ли обновлять при сортировке или другом действии? в ТЗ что то есть?
 *         а фильтрацию к данным мы применяем каждый раз с новой датой...
 *         или в фильтрации применять старую дату или обновлять доступные фильтры...
 *         getEnableFilters(events, date(сохраненная из перезетера например и обновляеться при init, её же использовать для фильтрации))
 *   3. нужен he? использую преобразование к числу и поиск строковый поиск по городам
 *   4. поведение при редектировании/добавлении если очистить пункта назначения? очистить описание?
 *   5. ТЗ - На время загрузки, вместо списка точек маршрута, отображается сообщение: «Loading...».
 *      Задание 16 - На время загрузки вместо списка выведите информирующее сообщение (разметку смотрите в /markup).
 *                   Сообщение должно показываться единожды на старте приложения, пока данные загружаются.
 *                   В случае, если при загрузке произошла ошибка, приложение должно отработать так, как будто данных нет, и показать соответствующую заглушку.
 *      сделал как в markup и кнопку заблокировал и все фильтры
 *
 * Заметки:
 *   1. Смотреть где нужны деструкторы, там где есть перересовка и удаление сомпонентов и презентеров
 *   2. Не использовать '?.()' для проверки перед выполнением this.#onEditClick?.()
 *   3. event-presenter.js и new-event-presenter.js немного похожи... попробовать выделить общего предка
 *   4. Выделить общее <li class="trip-events__item"> у EventFormView и EventItemView !!! о может тут быть пброблема с тряской формы после отмены...
 *        li+item/form init+render
 *        this.#activeEventPresenter = null; // тут может тряска не работать корректно!!!
 *   5. event-presenter.js, попробовать убрать создание формы сразу, а содвавать в момент переключения и в дальнейшем не удалять, пока не будет перерисовки
 *   6. не вызывать обработчки напрямую!
 *   7. В презентер похожий код, можно попробовать вынести в базовый класс (FilterPresenter, TripPresenter)
 *   8. проверить перерисовку при добавлении нового события
 *   9. проверить сортировату и фильтрацию дабавленного события
 *   11. перепроверить методы _ # и обычные их сортировку и вызов
 *   12. сменить название EventFormView-> EventEditView и имя файла
 *   13. если вопрос 6, то попробовать объеденить логику this.#onDestanationInputElementChange и this.#onDestanationInputElementInput
 *   14. если вопрос 5, то доступность кнопки добавить событие перепроверить.
 *         при ошибке загрузки данных this.#addEventButtonComponent.enable() при render INIT поизойдет в любом случае
 *         либо в презентере сделать метод и выполнить его в eventsModel.init().finaly(....)
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
