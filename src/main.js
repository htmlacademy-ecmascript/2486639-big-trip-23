import HeaderPresenter from './presenter/header-presenter.js';
import ContentPresenter from './presenter/content-presenter.js';

const bodyElement = document.body;
//
const headerContainerElement = bodyElement.querySelector('div.page-body__container.page-header__container');
const headerMainElement = headerContainerElement.querySelector('div.trip-main');
const headerFiltersElement = headerContainerElement.querySelector('div.trip-controls__filters');
//
const contentElement = bodyElement.querySelector('section.trip-events');

//
const headerPresenter = new HeaderPresenter({ headerMainElement, headerFiltersElement });
const contentPresenter = new ContentPresenter({ contentElement });

headerPresenter.init();
contentPresenter.init();
