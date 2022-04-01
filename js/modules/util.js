const NOTICE_SHOW_TIME = 3000;

const getRandomNumber = (min, max) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('min и max должны быть числами');
  }

  if (min < 0 || max < 0) {
    throw new Error('min и max должны быть положительными числами');
  }

  if (min >= max) {
    throw new Error('min должно быть меньше max');
  }

  return Math.round(min + Math.random() * (max - min));
};

const getRandomFloatNumber = (min, max, digits = 5) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('min и max должны быть числами');
  }

  if (min < 0 || max < 0) {
    throw new Error('min и max должны быть положительными числами');
  }

  if (min >= max) {
    throw new Error('min должно быть меньше max');
  }

  const randomNumber = min + Math.random() * (max - min);

  if (!digits) {
    return Math.round(randomNumber);
  }

  return Number(randomNumber.toFixed(digits));
};

const getRandomArrayNumbers = (min, max, padLength = 2, padNumber = 0) => {
  const array = [];

  while (array.length < max) {
    const item = String(getRandomNumber(min, max)).padStart(padLength, padNumber);

    if (array.indexOf(item) === -1) {
      array.push(item);
    } else {
      continue;
    }
  }

  return array;
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];
const getRandomArrayElements = (elements) => elements.slice(0, getRandomNumber(1, elements.length));

const isEscapeKey = (evt) => evt.key === 'Escape';

const createErrorNotice = (message) => {
  const errorContainer = document.createElement('div');

  errorContainer.classList.add('error-notice');
  errorContainer.textContent = message;

  document.body.append(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, NOTICE_SHOW_TIME);
};

export {getRandomNumber, getRandomArrayNumbers, getRandomFloatNumber, getRandomArrayElement, getRandomArrayElements, isEscapeKey, createErrorNotice};
