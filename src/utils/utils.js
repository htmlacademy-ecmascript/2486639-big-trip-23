const isEmptyArray = (items) => (!Array.isArray(items) || !items.length);

const isEscapeKey = (evt) => evt.key === 'Escape';

const isInputElement = (element) => element.tagName === 'INPUT';

const getNumber = (string) => {
  if (!string) {
    return null;
  }

  const number = parseInt(string, 10);
  //! if (isNaN(number) || (number < 0)) { //getNumber->getPositiveNumber
  if (isNaN(number)) {
    return null;
  }

  return number;
};

const findItemIndexByKey = (items, keyValue, keyName = 'id') => items.findIndex((item) => item[keyName] === keyValue);

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

export { isEmptyArray, isEscapeKey, isInputElement, getNumber, findItemIndexByKey, updateItemByKey, addItem, deleteItemByKey };
