const FILTER_OPTION_ALL = 'any';
const PRICE_OPTION_MIN = 'low';
const PRICE_OPTION_MID = 'middle';
const PRICE_OPTION_MAX = 'high';
const PRICE_MIN = 10000;
const PRICE_MID = 50000;

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');

const filterByType = (item) => housingType.value === FILTER_OPTION_ALL || housingType.value === item.offer.type;
const filterByRooms = (item) => housingRooms.value === FILTER_OPTION_ALL || Number(housingRooms.value) === item.offer.rooms;
const filterByGuests = (item) => housingGuests.value === FILTER_OPTION_ALL || Number(housingGuests.value) === item.offer.guests;

const filterByPrice = (item) => housingPrice.value === FILTER_OPTION_ALL ||
    housingPrice.value === PRICE_OPTION_MIN && item.offer.price < PRICE_MIN ||
    housingPrice.value === PRICE_OPTION_MID && item.offer.price >= PRICE_MIN && item.offer.price < PRICE_MID ||
    housingPrice.value === PRICE_OPTION_MAX && item.offer.price >= PRICE_MID;

const filterByFeatures = (item) => {
  let featuresValues = item.offer.features;

  if (!featuresValues) { featuresValues = []; }

  const housingFeaturesList = document.querySelectorAll('[name="features"]:checked');
  const housingFeatureValues = [];

  housingFeaturesList.forEach((housingFeaturesItem) => {
    housingFeatureValues.push(housingFeaturesItem.value);
  });

  return housingFeatureValues.length === 0 ||
  housingFeatureValues.length && housingFeatureValues.every((element) => featuresValues.includes(element));
};

export {filterByType, filterByPrice, filterByRooms, filterByGuests, filterByFeatures};
