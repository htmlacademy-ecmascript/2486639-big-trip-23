const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const getTwoDigitString = (number) => (number < 10) ? `0${number}` : number.toString();

const isEmptyArray = (items) => (!Array.isArray(items) || !items.length);

const isEscapeKey = (evt) => evt.key === 'Escape';

const isInputElement = (element) => element.tagName === 'INPUT';

const getPositiveNumber = (string) => {
  if (!string) {
    return null;
  }

  const value = parseInt(string, 10);
  if (isNaN(value) || (value <= 0)) {
    return null;
  }

  return value;
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

export {
  capitalizeFirstLetter,
  getTwoDigitString,
  isEmptyArray,
  isEscapeKey,
  isInputElement,
  getPositiveNumber,
  findItemByKey,
  findItemIndexByKey,
  updateItemByKey,
  addItem,
  deleteItemByKey
};
