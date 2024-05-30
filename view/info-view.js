import AbstractView from '../framework/view/abstract-view.js';
import { getStringDate } from '../utils/date.js';
import { DateFormat } from '../const.js';

const createInfoTemplate = ({ title, dateFrom, dateTo, cost }) => {
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
  #tripInfo = null;

  constructor({ tripInfo }) {
    super();

    this.#tripInfo = tripInfo;
  }

  get template() {
    return createInfoTemplate(this.#tripInfo);
  }
}
