import { render, replace, remove, RenderPosition } from '../framework/render.js';

const createElementsTemplate = (elements, createElementTemplate, ...rest) => {
  if (elements instanceof Array) {
    return (elements) ? elements.map((element) => createElementTemplate(element, ...rest)).join(' ') : '';
  }

  if (elements instanceof Map) {
    const strings = [];

    elements.forEach((value, key) => {
      strings.push(createElementTemplate(value, key, ...rest));
    });

    return strings.join('');
  }

  if (elements instanceof Object) {
    return Object.entries(elements).map(([key, value]) => createElementTemplate(value, key, ...rest)).join('');
  }

  return '';
};

const renderOrReplace = (newComponent, storedComponent, containerElement, place = RenderPosition.BEFOREEND) => {
  if (!storedComponent) {
    render(newComponent, containerElement, place);
  } else {
    replace(newComponent, storedComponent);
    remove(storedComponent);
  }
};

export { createElementsTemplate, renderOrReplace };
