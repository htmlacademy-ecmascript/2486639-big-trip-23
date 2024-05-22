//? а можно измользовать view без отрисовки?
export default class ButtonView {
  #buttonElement = null;
  #onClick = null;

  constructor({ containerElement, selector, onClick }) {
    //! найти свою кнопку
    this.#buttonElement = containerElement.querySelector('.trip-main__event-add-btn'); //! selector
    this.#onClick = onClick;

    //! повешать обработчики
    this.#buttonElement.addEventListener('click', this.#onEventAddButtonElementClick);
  }

  enable() {
    this.#buttonElement.disabled = false;
  }

  #disable() {
    this.#buttonElement.disabled = true;
  }

  #onEventAddButtonElementClick = (evt) => {
    evt.preventDefault();
    this.#disable();

    this.#onClick();
  };
}
