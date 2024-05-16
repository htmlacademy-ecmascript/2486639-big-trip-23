import TripPresenter from './presenter/trip-presenter.js';
import EventsModel from './model/events-model.js';

const eventsModel = new EventsModel();
const tripPresenter = new TripPresenter({ containerElement: document.body, eventsModel });

tripPresenter.init();

/*
 *
 * Заметки и вопросы:
 * 1. По заданию 11-"одна форма", нужно сделать в точности как описано? или оставить свою реализацию
 *    я реализовал через активный презентор события в презенторе событий (EventsPresenter.#activeEventPresenter)
 * + задание 12-"созданием компонента сортировки и его отрисовкой должен заниматься презентер списка точек маршрута"
 *
 * 2. А деструкторы нужны?
 *    в TaskPresenter ->destroy() { remove(this.#taskComponent); remove(this.#taskEditComponent); }
 *    наверное понадобятся в EventPresenter при удалении событий или перерисовке всего.
 *    в остальных презенторах или компонентах? обработчики событий в компонентах удаляються при удалении элементов.
 *
 * 3. Есть ли смылс проверять, на null переданный обработчик перед вызовом, если знаем, что обработчик точно будет?
 *    '?.' для this.#onEditClick?.()? например для переиспользовани или будет не соблюден критерий об излишних проверке
 *
 *
 */
