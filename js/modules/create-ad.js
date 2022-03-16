const createAd = function(data) {
  const adTemplate = document.querySelector('#card').content.querySelector('.popup');
  const adFragment = document.createDocumentFragment();

  data.forEach(({author, offer}) => {
    const adItem = adTemplate.cloneNode(true);

    adItem.querySelector('.popup__avatar').src = author.avatar;
    adItem.querySelector('.popup__title').textContent = offer.title;
    adItem.querySelector('.popup__text--address').textContent = offer.address;
    adItem.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    adItem.querySelector('.popup__type').textContent = offer.type;
    adItem.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    adItem.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

    const adFeaturesContainer = adItem.querySelector('.popup__features');
    const adFeaturesList = adFeaturesContainer.querySelectorAll('.popup__feature');
    const dataFeaturesList = offer.features;

    // adFeaturesList больше, чем dataFeaturesList

    adFeaturesList.forEach((adFeaturesItem) => {
      const isNecessary = dataFeaturesList.some((dataFeatureItem) => adFeaturesItem.classList.contains(`popup__feature--${dataFeatureItem}`));

      if (!isNecessary) { adFeaturesItem.remove(); }
    });

    const adDescription = adItem.querySelector('.popup__description').textContent = offer.description;

    if (!adDescription) { adDescription.remove(); }

    const adPhotosContainer = adItem.querySelector('.popup__photos');
    const adPhotosList = adPhotosContainer.children;
    const dataPhotosList = offer.photos;

    dataPhotosList.forEach((dataPhotoItem, i) => {
      if (!adPhotosList[i]) {
        const adPhoto = adPhotosList[i - 1].cloneNode(true);
        adPhotosContainer.appendChild(adPhoto);
      }

      adPhotosList[i].src = dataPhotoItem;
    });

    adFragment.appendChild(adItem);
  });

  return adFragment;
};

export {createAd};
