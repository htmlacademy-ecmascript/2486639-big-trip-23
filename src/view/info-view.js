import { createElement } from '../render.js';

const Info = {
  TITLE: 'Amsterdam — Chamonix — Geneva',
  DATES: '18&nbsp;—&nbsp;20 Mar',
  COST: '12340'
};

const createInfoTemplate = (title, dates, cost) => `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${title}</h1>
    <p class="trip-info__dates">${dates}</p>
  </div>
  <p class="trip-info__cost">
    Total: €&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>
</section>`;

export default class InfoView {
  getTemplate() {
    return createInfoTemplate(Info.TITLE, Info.DATES, Info.COST);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
