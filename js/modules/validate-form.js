const accommodationPrice = {
  'Бунгало': 0,
  'Квартира': 1000,
  'Отель': 3000,
  'Дом': 5000,
  'Дворец': 10000
};

const roomСapacity = {
  '1 комната': ['для 1 гостя'],
  '2 комнаты': ['для 2 гостей', 'для 1 гостя'],
  '3 комнаты': ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  '100 комнат': ['не для гостей']
};

const adForm = document.querySelector('.ad-form');
const type = document.querySelector('[name="type"]');
const price = document.querySelector('[name="price"]');
const rooms = document.querySelector('[name="rooms"]');
const capacity = document.querySelector('[name="capacity"]');
const time = document.querySelector('.ad-form__element--time');
const timeinOptions = document.querySelector('[name="timein"]').children;
const timeoutOptions = document.querySelector('[name="timeout"]').children;
const pristineElements = document.getElementsByClassName('ad-form__element--pristine');
const slider = document.querySelector('.ad-form__slider');
const adPriceItems = document.getElementsByClassName('ad-form__element--price');

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return Number(value);
    },
  },
});

slider.noUiSlider.on('update', () => {
  price.value = slider.noUiSlider.get();

  for (const adPriceItem of adPriceItems) {
    if (adPriceItem.classList.contains('has-danger')) {
      const adPriceItemError = adPriceItem.querySelector('.pristine-error');

      adPriceItem.classList.remove('has-danger');
      adPriceItemError.style.display = 'none';
    }
  }
});

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'help'
});


const validatePrice = (value) => {
  const typeOption = type.querySelector('option:checked');
  const typeOptionName = typeOption.textContent;
  const typeOptionMinPrice = accommodationPrice[typeOptionName];

  slider.noUiSlider.updateOptions({
    start: value,
  });

  return value >= typeOptionMinPrice;
};

const getPriceError = () => {
  const typeOption = type.querySelector('option:checked');
  const typeOptionName = typeOption.textContent;
  const typeOptionMinPrice = accommodationPrice[typeOptionName];

  return `Минимальная цена ${typeOptionMinPrice}\u00A0руб.`;
};

pristine.addValidator(price, validatePrice, getPriceError);

const onTypeChange = () => {
  const typeOption = type.querySelector('option:checked');
  const typeOptionName = typeOption.textContent;
  const typeOptionMinPrice = accommodationPrice[typeOptionName];

  price.placeholder = typeOptionMinPrice;
  pristine.validate(price);
};

type.addEventListener('change', onTypeChange);

function validateCapacity() {
  const roomsOption = rooms.querySelector('option:checked');
  const roomsOptionName = roomsOption.textContent;
  const capacityOption = capacity.querySelector('option:checked');
  const capacityOptionName = capacityOption.textContent;

  this.parentNode.classList.add('ad-form__element--pristine');

  for (const pristineElement of pristineElements) {
    if (pristineElement.classList.contains('has-danger')) {
      const pristineElementError = pristineElement.querySelector('.pristine-error');

      pristineElement.classList.remove('has-danger');
      pristineElementError.style.display = 'none';
    }
  }

  return roomСapacity[roomsOptionName].includes(capacityOptionName);
}

const getCapacityError = () => {
  const roomsOption = rooms.querySelector('option:checked');
  const roomsOptionName = roomsOption.textContent;
  const correctCapacity = roomСapacity[roomsOptionName];
  const correctCapacityMessage = correctCapacity.map((element) => `"${element}"`).join(', ');

  return `Вариант "${roomsOptionName}" доступен только: ${correctCapacityMessage}`;
};

pristine.addValidator(rooms, validateCapacity, getCapacityError);
pristine.addValidator(capacity, validateCapacity, getCapacityError);

const setOptionByValue = (targetValue, options) => {
  for (const option of options) {
    if (option.value === targetValue) {
      option.selected = 'selected';
    }
  }
};

const onTimeChange = (evt) => {
  const target = evt.target;

  if (target.classList.contains('timein') || target.classList.contains('timeout')) {
    setOptionByValue(target.value, timeinOptions);
    setOptionByValue(target.value, timeoutOptions);
  }
};

time.addEventListener('change', onTimeChange);

adForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) { evt.preventDefault(); }
});
