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

getRandomNumber(0, 7);

function getRandomFloatNumber(min, max, digits) {
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

getRandomFloatNumber(0, 7, 5);
