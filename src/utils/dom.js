const createElementsTemplate =
  (elements, createElementTemplate, ...rest) => (elements) ? elements.map((element) => createElementTemplate(element, ...rest)).join(' ') : '';

//! название подобрать
const createMapElementsTemplate =
  (mapElements, createElementTemplate, ...rest) => {
    const strings = [];

    mapElements.forEach((value, key) => {
      strings.push(createElementTemplate(key, value, ...rest));
    });

    return strings.join('');
  };

export { createElementsTemplate, createMapElementsTemplate };
