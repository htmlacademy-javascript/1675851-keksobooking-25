import {PRICE_RANGE_MIN, validateSlider, updateSliderValue, resetSliderValue} from './validate-slider.js';
import {sendData} from './server.js';
import {showSuccessNotice, showErrorNotice} from './server-notice.js';
import {mainMarker, tokyoPoints, map} from './create-map.js';

validateSlider();

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
const pristineElements = document.getElementsByClassName('ad-form__element--pristine');
const timeinOptions = document.querySelector('[name="timein"]').children;
const timeoutOptions = document.querySelector('[name="timeout"]').children;
const time = document.querySelector('.ad-form__element--time');
const submitFormButton = document.querySelector('.ad-form__submit');
const resetFormButton = document.querySelector('.ad-form__reset');

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

  updateSliderValue(value);

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

        resetSliderValue();
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
  resetSliderValue();

  price.placeholder = PRICE_RANGE_MIN;

  map.closePopup();

  mainMarker.setLatLng([tokyoPoints.latitude, tokyoPoints.longitude]);
});
