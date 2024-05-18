const isEmptyArray = (items) => (!Array.isArray(items) || !items.length);

const isEscapeKey = (evt) => evt.key === 'Escape';

const findItemIndexByKey = (items, keyValue, keyName = 'id') => items.findIndex((item) => item[keyName] === keyValue);

export { isEmptyArray, isEscapeKey, findItemIndexByKey };
