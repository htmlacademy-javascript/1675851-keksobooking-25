import {map, minorPinIcon} from './create-map.js';
import {getData} from './server.js';
import {createErrorNotice, debounce, RENDER_DELAY} from './util.js';
import {setInactiveMapForm, setActiveMapForm} from './set-state.js';
import {setHousingFilterChange, filterByType, filterByPrice, filterByRooms, filterByGuests, filterByFeatures} from './filter.js';
import {renderAd} from './render-ad.js';

const DATA_ELEMENTS = 10;

const markerGroup = L.layerGroup().addTo(map);

const drawAds = (array) => {
  markerGroup.clearLayers();

  const endAdsData = array.filter(filterByType)
    .filter(filterByPrice)
    .filter(filterByRooms)
    .filter(filterByGuests)
    .filter(filterByFeatures);

  endAdsData.forEach((item) => {
    const {location} = item;
    const lat = location.lat;
    const lng = location.lng;

    const minorMarker = L.marker(
      {
        lat,
        lng
      },
      {
        icon: minorPinIcon,
      }
    );

    minorMarker.addTo(markerGroup).bindPopup(renderAd([item]));
  });
};

getData(
  (data) => {
    setActiveMapForm();

    const adsData = data.slice(-DATA_ELEMENTS);

    drawAds(adsData);

    setHousingFilterChange(debounce(
      () => drawAds(adsData),
      RENDER_DELAY
    ));
  },
  () => {
    createErrorNotice('Ошибка загрузки данных с сервера');
    setInactiveMapForm();
  }
);
