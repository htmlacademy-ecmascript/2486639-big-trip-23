const isEmptyArray = (items) => (!Array.isArray(items) || !items.length);

const isEscapeKey = (evt) => evt.key === 'Escape';

export { isEmptyArray, isEscapeKey };
