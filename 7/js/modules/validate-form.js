const accommodationPrice = {
  'Бунгало': 0,
  'Квартира': 1000,
  'Отель': 3000,
  'Дом': 5000,
  'Дворец': 10000
};

const roomsOption = {
  '1 комната': ['для 1 гостя'],
  '2 комнаты': ['для 2 гостей', 'для 1 гостя'],
  '3 комнаты': ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  '100 комнат': ['не для гостей']
};

const adForm = document.querySelector('.ad-form');
const type = document.querySelector('[name="type"]');
const price = document.querySelector('[name="price"]');
const rooms = document.querySelector('[name="rooms"]');
const guests = document.querySelector('[name="capacity"]');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'help'
});

function validatePrice(value) {
  const typeOption = type.querySelector('option:checked');
  const typeOptionMinPrice = accommodationPrice[typeOption.textContent];

  return value >= typeOptionMinPrice;
}

function getPriceError() {
  const typeOption = type.querySelector('option:checked');

  return `Минимальная цена ${accommodationPrice[typeOption.textContent]}\u00A0руб.`;
}

pristine.addValidator(price, validatePrice, getPriceError);

function onTypeChange() {
  const typeOption = type[this.selectedIndex];
  const typeOptionMinPrice = accommodationPrice[typeOption.textContent];

  price.placeholder = typeOptionMinPrice;
  price.setAttribute('min', typeOptionMinPrice);
  pristine.validate(price);
}

type.addEventListener('change', onTypeChange);

function validateRooms() {
  const roomsOptionValue = rooms[rooms.selectedIndex].textContent;
  const guestsValue = guests[guests.selectedIndex].textContent;

  return roomsOption[roomsOptionValue].includes(guestsValue);
}

function getRoomsError() {
  const roomsOptionValue = rooms[rooms.selectedIndex].textContent;
  const availableOptions = roomsOption[roomsOptionValue].join(', ');

  return `Вариант ${roomsOptionValue} доступен только для: ${availableOptions}`;
}

pristine.addValidator(rooms, validateRooms, getRoomsError);
pristine.addValidator(guests, validateRooms, getRoomsError);

adForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) { evt.preventDefault(); }
});
