const mapForm = document.querySelector('.map__filters');
const mapFormElements = document.querySelectorAll('[id^="housing-"]');
const adForm = document.querySelector('.ad-form');
const adFormElements = document.querySelectorAll('.ad-form__element');
const adFormFileElements = document.querySelectorAll('input[type="file"]');

const setInactiveState = function() {
  const setInactiveMapForm = function() {
    mapForm.classList.add('map__filters--disabled');

    mapFormElements.forEach((mapFormElement) => {
      mapFormElement.setAttribute('disabled', '');
    });
  };

  setInactiveMapForm();

  const setInactiveAdForm = function() {
    adForm.classList.add('ad-form--disabled');

    adFormFileElements.forEach((adFormFileElement) => {
      adFormFileElement.setAttribute('disabled', '');
    });

    adFormElements.forEach((adFormElement) => {
      adFormElement.setAttribute('disabled', '');
    });
  };

  setInactiveAdForm();
};

const setActiveState = function() {
  const setActiveMapForm = function() {
    mapForm.classList.remove('map__filters--disabled');

    mapFormElements.forEach((mapFormElement) => {
      mapFormElement.removeAttribute('disabled');
    });
  };

  setActiveMapForm();

  const setActiveAdForm = function() {
    adForm.classList.remove('ad-form--disabled');

    adFormFileElements.forEach((adFormFileElement) => {
      adFormFileElement.removeAttribute('disabled');
    });

    adFormElements.forEach((adFormElement) => {
      adFormElement.removeAttribute('disabled');
    });
  };

  setActiveAdForm();
};

export {setInactiveState, setActiveState};
