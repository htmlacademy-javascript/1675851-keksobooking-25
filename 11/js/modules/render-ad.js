const accommodationType = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

const renderAd = (data) => {
  const adTemplate = document.querySelector('#card').content.querySelector('.popup');
  const adItem = adTemplate.cloneNode(true);

  data.forEach(({author, offer}) => {
    adItem.querySelector('.popup__avatar').src = author.avatar ? author.avatar : 'img/avatars/default.png';
    adItem.querySelector('.popup__title').textContent = offer.title ? offer.title : '';
    adItem.querySelector('.popup__text--address').textContent = offer.address ? offer.address : '';
    adItem.querySelector('.popup__text--price').textContent = offer.price ? `${offer.price} ₽/ночь` : '';
    adItem.querySelector('.popup__type').textContent = offer.type ? accommodationType[offer.type] : '';
    adItem.querySelector('.popup__text--capacity').textContent = offer.rooms && offer.guests ? `${offer.rooms} комнаты для ${offer.guests} гостей` : '';
    adItem.querySelector('.popup__text--time').textContent = offer.checkin && offer.checkout ? `Заезд после ${offer.checkin}, выезд до ${offer.checkout}` : '';

    const createFeatures = () => {
      const adFeaturesContainer = adItem.querySelector('.popup__features');
      const adFeaturesList = adFeaturesContainer.querySelectorAll('.popup__feature');
      const dataFeaturesList = offer.features;

      if (!dataFeaturesList) {
        adFeaturesContainer.textContent = '';
        return adFeaturesContainer;
      }

      adFeaturesList.forEach((adFeaturesItem) => {
        const isNecessary = dataFeaturesList.some((dataFeatureItem) => adFeaturesItem.classList.contains(`popup__feature--${dataFeatureItem}`));
        if (!isNecessary) { adFeaturesItem.remove(); }
      });

      return adFeaturesContainer;
    };

    createFeatures();

    adItem.querySelector('.popup__description').textContent = offer.description ? offer.description : '';

    const createPhotos = () => {
      const adPhotosContainer = adItem.querySelector('.popup__photos');
      const adPhotosList = adPhotosContainer.children;
      const dataPhotosList = offer.photos;

      if (!dataPhotosList) {
        adPhotosContainer.textContent = '';
        return adPhotosContainer;
      }

      dataPhotosList.forEach((dataPhotoItem, i) => {
        if (!adPhotosList[i]) {
          const adPhoto = adPhotosList[i - 1].cloneNode(true);
          adPhotosContainer.appendChild(adPhoto);
        }

        adPhotosList[i].src = dataPhotoItem;
      });

      return adPhotosContainer;
    };

    createPhotos();
  });

  const adItemElements = adItem.children;

  for (const adItemElement of adItemElements) {
    if (!adItemElement.textContent && !adItemElement.classList.contains('popup__avatar')) {
      adItemElement.classList.add('hidden');
    }
  }

  return adItem;
};

export {renderAd};
