const slider = document.querySelector('.ad-form__slider');
const PRICE_RANGE_MIN = 0;
const PRICE_RANGE_MAX = 100000;
const price = document.querySelector('[name="price"]');
const adPriceItems = document.getElementsByClassName('ad-form__element--price');

const validateSlider = () => {
  noUiSlider.create(slider, {
    range: {
      min: PRICE_RANGE_MIN,
      max: PRICE_RANGE_MAX,
    },
    start: '',
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed(0),
      from: (value) => Number(value)
    },
  },
  );

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
};

const updateSliderValue = (value) => {
  slider.noUiSlider.updateOptions({
    start: value,
  });
};

const resetSliderValue = () => {
  slider.noUiSlider.updateOptions({
    start: PRICE_RANGE_MIN,
  });

  price.value = '';
};

export {PRICE_RANGE_MIN, validateSlider, updateSliderValue, resetSliderValue};
