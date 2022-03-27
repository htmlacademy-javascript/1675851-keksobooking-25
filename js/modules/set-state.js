const mapForm = document.querySelector('.map__filters');
const mapFormElements = document.querySelectorAll('[id^="housing-"]');
const adForm = document.querySelector('.ad-form');
const adFormElements = document.querySelectorAll('.ad-form__element');
const adFormFileElements = document.querySelectorAll('input[type="file"]');
const slider = document.querySelector('.ad-form__slider');

const setInactiveMapForm = () => {
  mapForm.classList.add('map__filters--disabled');

  mapFormElements.forEach((mapFormElement) => {
    mapFormElement.setAttribute('disabled', '');
  });
};

const setInactiveAdForm = () => {
  adForm.classList.add('ad-form--disabled');

  adFormFileElements.forEach((adFormFileElement) => {
    adFormFileElement.setAttribute('disabled', '');
  });

  adFormElements.forEach((adFormElement) => {
    adFormElement.setAttribute('disabled', '');
  });

  slider.setAttribute('disabled', true);
};

const setActiveMapForm = () => {
  mapForm.classList.remove('map__filters--disabled');

  mapFormElements.forEach((mapFormElement) => {
    mapFormElement.removeAttribute('disabled');
  });
};

const setActiveAdForm = () => {
  adForm.classList.remove('ad-form--disabled');

  adFormFileElements.forEach((adFormFileElement) => {
    adFormFileElement.removeAttribute('disabled');
  });

  adFormElements.forEach((adFormElement) => {
    adFormElement.removeAttribute('disabled');
  });

  slider.removeAttribute('disabled');
};

const setInactiveState = () => {
  setInactiveMapForm();
  setInactiveAdForm();
};

const setActiveState = () => {
  setActiveMapForm();
  setActiveAdForm();
};

export {setInactiveState, setActiveState};
