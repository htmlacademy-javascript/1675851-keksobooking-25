import {getRandomNumber, getRandomArrayNumbers, getRandomFloatNumber, getRandomArrayElement, getRandomArrayElements} from './util.js';

const TITLES = [
  'Просторная студия в тихом районе. Идеально подходит для удаленной работы',
  'Бюджетная квартира-студия рядом с торговым центром и метро',
  'Простая, но просторная квартира. Очень близко Акихабаре',
  'Роскошный номер с интерьером от итальянского дизайнера',
  'Пентхаус Люкс с панорамным видом и изысканной мебелью',
  'Студия в стиле лофт. Отличное место для работы',
  'Остановитесь в Икэбукуро! Дом на 6 человек',
  'Элегантная, яркая и современная квартира',
  'Дом в японском классическом стиле',
  'Семейный номер. Барбекю на крыше'
];

const accommodationType = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

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

const IMAGE_NUMBER_MIN = 1;
const IMAGE_NUMBER_MAX = 10;
const PAD_LENGTH = 2;
const PAD_NUMBER = 0;
const IMAGE_NUMBERS = getRandomArrayNumbers(IMAGE_NUMBER_MIN, IMAGE_NUMBER_MAX, PAD_LENGTH, PAD_NUMBER);
const LATITUDE_MIN = 35.65000;
const LATITUDE_MAX = 35.70000;
const LONGITUDE_MIN = 139.70000;
const LONGITUDE_MAX = 139.80000;
const DIGITS_SIZE = 5;
const PRICE_MIN = 1000;
const PRICE_MAX = 50000;
const ROOMS_MIN = 1;
const ROOMS_MAX = 100;
const GUESTS_MIN = 1;
const GUESTS_MAX = 3;
const DATA_ARRAY_ELEMENTS = 10;

const generateData = (i) => {
  const points = {
    latitude: getRandomFloatNumber(LATITUDE_MIN, LATITUDE_MAX, DIGITS_SIZE),
    longitude: getRandomFloatNumber(LONGITUDE_MIN, LONGITUDE_MAX, DIGITS_SIZE)
  };

  return {
    author: {
      avatar: `img/avatars/user${IMAGE_NUMBERS[i]}.png`
    },
    offer: {
      title: TITLES[i],
      address: `${points.latitude}, ${points.longitude}`,
      price: getRandomNumber(PRICE_MIN, PRICE_MAX),
      type: getRandomArrayElement(Object.values(accommodationType)),
      rooms: getRandomNumber(ROOMS_MIN, ROOMS_MAX),
      guests: getRandomNumber(GUESTS_MIN, GUESTS_MAX),
      checkin: getRandomArrayElement(ARRIVAL_TIMES),
      checkout: getRandomArrayElement(DEPARTURE_TIMES),
      features: getRandomArrayElements(FEATURES),
      description: 'Место — надо брать!',
      photos: getRandomArrayElements(PHOTOS)
    },
    location: {
      lat: points.latitude,
      lng: points.longitude
    }
  };
};

const createData = new Array(DATA_ARRAY_ELEMENTS).fill('').map((item, i) => generateData(i));

export {createData, DIGITS_SIZE};
