const isEmptyArray = (items) => (!Array.isArray(items) || !items.length);

const getById = (items, id, idName = 'id') => items.find((item) => item[idName] === id);

export { isEmptyArray, getById };
