const isEmptyArray = (items) => (!Array.isArray(items) || !items.length);

const isEscapeKey = (evt) => evt.key === 'Escape';

const isInputElement = (element) => element.tagName === 'INPUT';

const getPositiveNumber = (value) => {
  if (!value) {
    return null;
  }

  const result = parseInt(value, 10);
  if (isNaN(result) || (result <= 0)) {
    return null;
  }

  return result;
};

const findItemIndexByKey = (items, keyValue, keyName = 'id') => items.findIndex((item) => item[keyName] === keyValue);

const findItemByKey = (items, keyValue, keyName = 'id') => items.find((item) => item[keyName] === keyValue);

const updateItemByKey = (items, item, keyName = 'id') => {
  items[findItemIndexByKey(items, item[keyName], keyName)] = item;
};

const addItem = (items, item) => {
  items[items.length] = item;
};

const deleteItemByIndex = (items, index) => {
  if (index >= 0) {
    items.splice(index, 1);
  }
};

const deleteItemByKey = (items, item, keyName = 'id') => {
  deleteItemByIndex(items, findItemIndexByKey(items, item[keyName], keyName));
};

export { isEmptyArray, isEscapeKey, isInputElement, getPositiveNumber, findItemByKey, findItemIndexByKey, updateItemByKey, addItem, deleteItemByKey };
