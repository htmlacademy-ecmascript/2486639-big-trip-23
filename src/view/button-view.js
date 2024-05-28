export default class ButtonView {
  #buttonElement = null;
  #onClick = null;

  constructor({ buttonElement, onClick }) {
    this.#buttonElement = buttonElement;
    this.#onClick = onClick;

    this.#buttonElement.addEventListener('click', this.#onButtonElementClick);
  }

  enable() {
    this.#buttonElement.disabled = false;
  }

  #disable() {
    this.#buttonElement.disabled = true;
  }

  #onButtonElementClick = (evt) => {
    evt.preventDefault();
    this.#disable();

    this.#onClick();
  };
}
