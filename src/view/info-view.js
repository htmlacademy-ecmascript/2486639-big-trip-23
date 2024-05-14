import AbstractView from '../framework/view/abstract-view.js';
import { getMockInfo } from '../mock/events.js';//! временно
import { DateFormat, getStringDate } from '../utils/date.js';

const createInfoTemplate = ({ title, dateFrom, dateTo, cost }) => {
  //! почитать ТЗ и посмотреть как выводить, если в одном месяце?, если в разных? и т.д.?
  const tripDateFrom = getStringDate(dateFrom, DateFormat.DAY_MONTH);
  const tripDateTo = getStringDate(dateTo, DateFormat.DAY_MONTH);

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${title}</h1>
    <p class="trip-info__dates">${tripDateFrom}&nbsp;—&nbsp;${tripDateTo}</p>
  </div>
  <p class="trip-info__cost">
    Total: €&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>
</section>`;
};

export default class InfoView extends AbstractView {
  #destinations = [];
  #offers = []; //! возможно нужен для подсчета полной стоимости
  #events = [];

  constructor(events, destinations, offers) {
    super();
    //! временно
    this.#destinations = [...destinations];
    this.#offers = [...offers];
    this.#events = [...events];
  }

  get template() {
    return createInfoTemplate(this.#info);
  }

  get #info() { //! название не очень
    //! почитать в ТЗ, что показывать когда событий меньше трех и проверить это!
    //! временный код для генерации заголовка
    return getMockInfo(this.#destinations);
  }
}
