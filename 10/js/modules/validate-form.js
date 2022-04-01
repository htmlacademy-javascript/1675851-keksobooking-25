import {isEscapeKey} from './util.js';
import {sendData} from './server.js';
import {mainMarker, tokyoPoints, map} from './create-map.js';

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

const PRICE_RANGE_MIN = 0;
const PRICE_RANGE_MAX = 100000;
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
const submitFormButton = document.querySelector('.ad-form__submit');
const resetFormButton = document.querySelector('.ad-form__reset');

const onNoticeClick = () => {
  closeNotice();
};

const onNoticeEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeNotice();
  }
};

function closeNotice() {
  const noticePopup = document.querySelector('.success, .error');

  noticePopup.remove();

  document.removeEventListener('click', onNoticeClick);
  document.removeEventListener('keydown', onNoticeEscKeydown);
}

const showSuccessNotice = () => {
  const successContainer = document.querySelector('#success').content.querySelector('.success');
  const successNotice = successContainer.cloneNode(true);

  document.body.append(successNotice);

  document.addEventListener('click', onNoticeClick);
  document.addEventListener('keydown', onNoticeEscKeydown);
};

const showErrorNotice = (message) => {
  const errorContainer = document.querySelector('#error').content.querySelector('.error');
  const errorNotice = errorContainer.cloneNode(true);
  const errorMessage = errorContainer.querySelector('.error__message');

  errorMessage.textContent = message;

  document.body.append(errorNotice);

  document.addEventListener('click', onNoticeClick);
  document.addEventListener('keydown', onNoticeEscKeydown);
};

noUiSlider.create(slider, {
  range: {
    min: PRICE_RANGE_MIN,
    max: PRICE_RANGE_MAX,
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

const blockSubmitButton = () => {
  submitFormButton.disabled = true;
  submitFormButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitFormButton.disabled = false;
  submitFormButton.textContent = 'Опубликовать';
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();

    sendData(
      () => {
        showSuccessNotice();
        unblockSubmitButton();

        adForm.reset();
        map.closePopup();

        slider.noUiSlider.updateOptions({
          start: PRICE_RANGE_MIN,
        });
      },
      () => {
        showErrorNotice('Не удалось отправить форму. Попробуйте еще раз');
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );
  }
});

resetFormButton.addEventListener('click', () => {
  slider.noUiSlider.updateOptions({
    start: PRICE_RANGE_MIN,
  });

  price.placeholder = PRICE_RANGE_MIN;

  map.closePopup();

  mainMarker.setLatLng([tokyoPoints.latitude, tokyoPoints.longitude]);
});
