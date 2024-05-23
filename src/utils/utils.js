const isEmptyArray = (items) => (!Array.isArray(items) || !items.length);

const isEscapeKey = (evt) => evt.key === 'Escape';

const isInputElement = (element) => element.tagName === 'INPUT';

const findItemIndexByKey = (items, keyValue, keyName = 'id') => items.findIndex((item) => item[keyName] === keyValue);

const findItemByKey = (items, keyValue, keyName = 'id') => items[findItemIndexByKey(items, keyValue, keyName)];

const deleteItemByIndex = (items, index) => {
  if (index >= 0) {
    items.splice(index, 1);
  }
};

const deleteItemByKey = (items, keyValue, keyName = 'id') => {
  deleteItemByIndex(items, findItemIndexByKey(items, keyValue, keyName));
};

//! удалить если не пригодится
/*
const deleteItem = (items, item) => {
  deleteItemByIndex(items, items.indexOf(item));
};
*/

export { isEmptyArray, isEscapeKey, isInputElement, findItemIndexByKey, findItemByKey, deleteItemByKey/*, deleteItem*/ };
