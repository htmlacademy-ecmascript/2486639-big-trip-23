const createElementsTemplate = (elements, createElementTemplate, ...rest) => {
  if (elements instanceof Array) {
    return (elements) ? elements.map((element) => createElementTemplate(element, ...rest)).join(' ') : '';
  }

  if (elements instanceof Map) {
    const items = [];

    elements.forEach((value, key) => {
      items.push(createElementTemplate(value, key, ...rest));
    });

    return items.join('');
  }

  if (elements instanceof Object) {
    return Object.entries(elements).map(([key, value]) => createElementTemplate(value, key, ...rest)).join('');
  }

  return '';
};

export { createElementsTemplate };
