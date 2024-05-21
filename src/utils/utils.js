const isEmptyArray = (items) => (!Array.isArray(items) || !items.length);

const isEscapeKey = (evt) => evt.key === 'Escape';

const isInputElement = (element) => element.tagName === 'INPUT';

const findItemIndexByKey = (items, keyValue, keyName = 'id') => items.findIndex((item) => item[keyName] === keyValue);

const findItemByKey = (items, keyValue, keyName = 'id') => items[findItemIndexByKey(items, keyValue, keyName)];

const deleteItem = (items, item) => {
  const index = items.indexOf(item);
  if (index !== -1) {
    items.splice(index, 1);
  }
};

export { isEmptyArray, isEscapeKey, isInputElement, findItemIndexByKey, findItemByKey, deleteItem };
