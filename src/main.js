import HeaderMainPresenter from './presenter/header-main-presenter.js';
import HeaderFiltersPresenter from './presenter/header-filters-presenter.js';
import ContentPresenter from './presenter/content-presenter.js';

const bodyElement = document.body;
//
const headerContainerElement = bodyElement.querySelector('div.page-body__container.page-header__container');
const headerMainElement = headerContainerElement.querySelector('div.trip-main');
const headerFiltersElement = headerContainerElement.querySelector('div.trip-controls__filters');
//
const contentElement = bodyElement.querySelector('section.trip-events');

//
const headerMainPresenter = new HeaderMainPresenter({ containerElement: headerMainElement });
const headerFiltersPresenter = new HeaderFiltersPresenter({ containerElement: headerFiltersElement });
const contentPresenter = new ContentPresenter({ containerElement: contentElement });

headerMainPresenter.init();
headerFiltersPresenter.init();
contentPresenter.init();
