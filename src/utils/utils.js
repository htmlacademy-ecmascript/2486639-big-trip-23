const isEmptyArray = (items) => (!Array.isArray(items) || !items.length);

const isEscapeKey = (evt) => evt.key === 'Escape';

const findItemIndexByKey = (items, keyValue, keyName = 'id') => items.findIndex((item) => item[keyName] === keyValue);

const findItemByKey = (items, keyValue, keyName = 'id') => items[findItemIndexByKey(items, keyValue, keyName)];

export { isEmptyArray, isEscapeKey, findItemIndexByKey, findItemByKey };
