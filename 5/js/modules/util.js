function getRandomNumber(min, max) {
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
}

function getRandomFloatNumber(min, max, digits = 5) {
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
}

function getRandomArrayNumbers(min, max, padLength = 2, padNumber = 0) {
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
}

function getRandomArrayElement(elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
}

function getRandomArrayElements(elements) {
  return elements.slice(0, getRandomNumber(1, elements.length));
}

export {getRandomNumber, getRandomArrayNumbers, getRandomFloatNumber, getRandomArrayElement, getRandomArrayElements};
