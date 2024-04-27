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

const getRandomArrayElement = (elements) => (elements.length === 0) ? null : elements[getRandomNumber(0, elements.length - 1)];

const getRandomArrayElements = (elements = [], maxCount = 1) => {
  const { length } = elements;

  if ((length === 0) || (maxCount < 1)) {
    return null;
  }
  if (maxCount === 1) {
    return [getRandomArrayElement(elements)];
  }

  if (maxCount >= length) {
    return structuredClone(elements);
  }

  const generateElemetIndex = createIdGenerator(0, length - 1);

  return Array.from({ length: getRandomNumber(1, maxCount) }, () => elements[generateElemetIndex()]);
};

const getRandomNumbers = (firstNumber, lastNumber) => {
  const count = lastNumber - firstNumber;
  const length = getRandomNumber(0, count);

  return (length > 0) ? Array.from({ length }, () => getRandomNumber(firstNumber, lastNumber)) : null;
};

const createElementsTemplate =
  (elements, createElementTemplate) => (elements) ? elements.map((element) => createElementTemplate(element)).join(' ') : '';

export {
  getRandomNumber,
  createIdGenerator,
  getRandomArrayElement,
  getRandomArrayElements,
  getRandomNumbers,
  createElementsTemplate
};
