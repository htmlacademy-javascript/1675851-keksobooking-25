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

function getRandomArrayElement(elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
}

function getRandomArrayElements(elements) {
  return elements.slice(0, getRandomNumber(1, elements.length));
}

const IMAGE_NUMBER_MIN = 0;
const IMAGE_NUMBER_MAX = 10;
const LATITUDE_MIN = 35.65000;
const LATITUDE_MAX = 35.70000;
const LONGITUDE_MIN = 139.70000;
const LONGITUDE_MAX = 139.80000;
const DIGITS_SIZE = 5;
const PRICE_MIN = 1000;
const PRICE_MAX = 50000;
const ACCOMMODATION_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const ROOMS_MIN = 1;
const ROOMS_MAX = 100;
const GUESTS_MIN = 1;
const GUESTS_MAX = 3;
const ARRIVAL_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
const DEPARTURE_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const DATA_ARRAY_ELEMENTS = 10;

function generateData() {
  const IMAGE_NUMBER = String(getRandomNumber(IMAGE_NUMBER_MIN, IMAGE_NUMBER_MAX)).padStart(2, 0);
  const location = {
    lat: getRandomFloatNumber(LATITUDE_MIN, LATITUDE_MAX, DIGITS_SIZE),
    lng: getRandomFloatNumber(LONGITUDE_MIN, LONGITUDE_MAX, DIGITS_SIZE)
  };

  return {
    author: {
      avatar: `img/avatars/user${IMAGE_NUMBER}.png`
    },
    offer: {
      title: 'Просторная квартира премиум-класса в центре Токио',
      address: `${location.lat}, ${location.lng}`,
      price: getRandomNumber(PRICE_MIN, PRICE_MAX),
      type: getRandomArrayElement(ACCOMMODATION_TYPES),
      rooms: getRandomNumber(ROOMS_MIN, ROOMS_MAX),
      guests: getRandomNumber(GUESTS_MIN, GUESTS_MAX),
      checkin: getRandomArrayElement(ARRIVAL_TIMES),
      checkout: getRandomArrayElement(DEPARTURE_TIMES),
      features: getRandomArrayElements(FEATURES),
      description: 'Место — надо брать!',
      photos: getRandomArrayElements(PHOTOS)
    },
    location: {
      lat: location.lat,
      lng: location.lng
    }
  };
}

const generateDataArray = Array.from({length: DATA_ARRAY_ELEMENTS}, generateData);
