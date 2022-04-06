const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelectorAll('[name="features"]');

const setHousingFilterChange = (cb) => {
  housingType.addEventListener('change', () => {
    cb();
  });

  housingPrice.addEventListener('change', () => {
    cb();
  });

  housingRooms.addEventListener('change', () => {
    cb();
  });

  housingGuests.addEventListener('change', () => {
    cb();
  });

  housingFeatures.forEach((item) => {
    item.addEventListener('change', () => {
      cb();
    });
  });
};

const filterByType = (item) => {
  const {offer} = item;
  const typeValue = offer.type;

  if (housingType.value === 'any' || housingType.value === typeValue) {
    return true;
  }

  return false;
};

const filterByPrice = (item) => {
  const {offer} = item;
  const priceValue = offer.price;

  if (
    housingPrice.value === 'any' ||
    housingPrice.value === 'low' && priceValue < 10000 ||
    housingPrice.value === 'middle' && priceValue >= 10000 && priceValue < 50000 ||
    housingPrice.value === 'high' && priceValue >= 50000) {

    return true;
  }

  return false;
};

const filterByRooms = (item) => {
  const {offer} = item;
  const roomsValue = offer.rooms;

  if (housingRooms.value === 'any' || Number(housingRooms.value) === roomsValue) {
    return true;
  }

  return false;
};

const filterByGuests = (item) => {
  const {offer} = item;
  const guestsValue = offer.guests;

  if (housingGuests.value === 'any' || Number(housingGuests.value) === guestsValue) {
    return true;
  }

  return false;
};

const filterByFeatures = (item) => {
  const {offer} = item;
  let featuresValues = offer.features;

  if (featuresValues === undefined) {
    featuresValues = [];
  }

  const housingFeaturesList = document.querySelectorAll('[name="features"]:checked');
  const housingFeatureValues = [];

  housingFeaturesList.forEach((housingFeaturesItem) => {
    housingFeatureValues.push(housingFeaturesItem.value);
  });

  if (housingFeatureValues.length === 0 ||
  housingFeatureValues.length && housingFeatureValues.every((e) => featuresValues.includes(e))) {
    return true;
  }

  return false;
};

export {setHousingFilterChange, filterByType, filterByPrice, filterByRooms, filterByGuests, filterByFeatures};
