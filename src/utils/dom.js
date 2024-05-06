const createElementsTemplate =
  (elements, createElementTemplate, ...rest) => (elements) ? elements.map((element) => createElementTemplate(element, ...rest)).join(' ') : '';

export { createElementsTemplate };
