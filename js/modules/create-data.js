import {getRandomNumber, getRandomArrayNumbers, getRandomFloatNumber, getRandomArrayElement, getRandomArrayElements} from './util.js';

const IMAGE_NUMBER_MIN = 1;
const IMAGE_NUMBER_MAX = 10;
const PAD_LENGTH = 2;
const PAD_NUMBER = 0;
const imageNumbers = getRandomArrayNumbers(IMAGE_NUMBER_MIN, IMAGE_NUMBER_MAX, PAD_LENGTH, PAD_NUMBER);
const LATITUDE_MIN = 35.65000;
const LATITUDE_MAX = 35.70000;
const LONGITUDE_MIN = 139.70000;
const LONGITUDE_MAX = 139.80000;
const DIGITS_SIZE = 5;
const PRICE_MIN = 1000;
const PRICE_MAX = 50000;
const AccommodationType = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};
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
const DATA_ARRAY_ELEMENTS = 1;

function generateData(i) {
  const location = {
    lat: getRandomFloatNumber(LATITUDE_MIN, LATITUDE_MAX, DIGITS_SIZE),
    lng: getRandomFloatNumber(LONGITUDE_MIN, LONGITUDE_MAX, DIGITS_SIZE)
  };

  return {
    author: {
      avatar: `img/avatars/user${imageNumbers[i]}.png`
    },
    offer: {
      title: 'Просторная квартира премиум-класса в центре Токио',
      address: `${location.lat}, ${location.lng}`,
      price: getRandomNumber(PRICE_MIN, PRICE_MAX),
      type: getRandomArrayElement(Object.values(AccommodationType)),
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

const createData = new Array(DATA_ARRAY_ELEMENTS).fill('').map((item, i) => generateData(i));

export {createData};
