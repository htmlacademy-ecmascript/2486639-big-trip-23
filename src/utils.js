const getRandomNumber = (minNumber = 0, maxNumber = 0) => {
  const absMinNumber = Math.abs(minNumber);
  const absMaxNumber = Math.abs(maxNumber);

  const realMinNumber = Math.min(absMinNumber, absMaxNumber);
  const realMaxNumber = Math.max(absMinNumber, absMaxNumber);

  const startNumber = Math.ceil(realMinNumber);
  const endNumber = Math.floor(realMaxNumber);

  const result = Math.random() * (endNumber - startNumber + 1) + startNumber;

  return Math.floor(result);
};

const getRandomBoolean = () => {
  const randomNumber = getRandomNumber(0, 1);

  return Boolean(randomNumber);
};

const createIdGenerator = (minNumber = 0, maxNumber = 0) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomNumber(minNumber, maxNumber);

    if (previousValues.length >= (maxNumber - minNumber + 1)) {
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(minNumber, maxNumber);
    }
    previousValues.push(currentValue);

    return currentValue;
  };
};

const isEmptyArray = (items) => (!items || !items.length);

const getRandomArrayElement = (elements) => (isEmptyArray(elements)) ? null : elements[getRandomNumber(0, elements.length - 1)];

const getRandomArrayElements = (elements = [], maxCount = 1, minCount = 1) => {
  if (!elements || (maxCount < 1) || (minCount < 0)) {
    return null;
  }

  const { length } = elements;

  if ((length === 0)) {
    return null;
  }

  if (maxCount === 1) {
    return [getRandomArrayElement(elements)];
  }

  if (maxCount >= length) {
    return structuredClone(elements);
  }

  const generateElemetIndex = createIdGenerator(0, length - 1);

  return Array.from({ length: getRandomNumber(minCount, maxCount) }, () => elements[generateElemetIndex()]);
};

const getRandomNumbers = (firstNumber, lastNumber) => {
  const count = lastNumber - firstNumber;
  const length = getRandomNumber(0, count);

  return (length > 0) ? Array.from({ length }, () => getRandomNumber(firstNumber, lastNumber)) : null;
};

const createElementsTemplate =
  (elements, createElementTemplate) => (elements) ? elements.map((element) => createElementTemplate(element)).join(' ') : '';

//! const getById = (items, id) => items.find((item) => item.id === id); //? а как по производительности?
//! const getByType = (items, id) => items.find((item) => item.id === id); //? а как по производительности?
//! getValueOf...
const getById = (items, id, idName = 'id') => items.find((item) => item[idName] === id);

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export {
  getRandomNumber,
  getRandomBoolean,
  createIdGenerator,
  isEmptyArray,
  getRandomArrayElement,
  getRandomArrayElements,
  getRandomNumbers,
  createElementsTemplate,
  getById,
  capitalizeFirstLetter
};
