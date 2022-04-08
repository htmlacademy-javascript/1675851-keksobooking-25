import {map, minorPinIcon} from './create-map.js';
import {getData} from './server.js';
import {createErrorNotice, debounce} from './util.js';
import {setInactiveMapForm, setActiveMapForm} from './set-state.js';
import {filterByType, filterByPrice, filterByRooms, filterByGuests, filterByFeatures} from './filter.js';
import {redrawAdOnEvent} from './validate-form.js';
import {renderAd} from './render-ad.js';

const DATA_ELEMENTS = 10;
const RENDER_DELAY = 500;

const markerGroup = L.layerGroup().addTo(map);

const drawAd = (array) => {
  markerGroup.clearLayers();

  const endAdData = array.filter(filterByType)
    .filter(filterByPrice)
    .filter(filterByRooms)
    .filter(filterByGuests)
    .filter(filterByFeatures);

  endAdData.forEach((item) => {
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

    const adData = data.slice(-DATA_ELEMENTS);

    drawAd(adData);

    redrawAdOnEvent(debounce(
      () => drawAd(adData),
      RENDER_DELAY
    ));
  },
  () => {
    createErrorNotice('Ошибка загрузки данных с сервера');
    setInactiveMapForm();
  }
);
