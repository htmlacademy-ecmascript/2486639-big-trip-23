const createElementsTemplate = (elements, createElementTemplate, ...rest) => {
  if (elements instanceof Array) {
    return (elements) ? elements.map((element) => createElementTemplate(element, ...rest)).join(' ') : '';
  }

  if (elements instanceof Map) {
    const strings = [];

    elements.forEach((value, key) => {
      strings.push(createElementTemplate(key, value, ...rest));
    });

    return strings.join('');
  }

  return '';
};

export { createElementsTemplate };
