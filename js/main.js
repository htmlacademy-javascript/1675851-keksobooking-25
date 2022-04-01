import {map, pinIcon} from './modules/create-map.js';
import {getData} from './modules/server.js';
import {DATA_ARRAY_ELEMENTS} from './modules/create-data.js';
import {createAd} from './modules/create-ad.js';
import {createErrorNotice} from './modules/util.js';
import './modules/validate-form.js';

getData(
  (data) => {
    const workData = data.slice(-DATA_ARRAY_ELEMENTS);

    workData.forEach((item) => {
      const {location} = item;
      const lat = location.lat;
      const lng = location.lng;

      const marker = L.marker(
        {
          lat,
          lng
        },
        {
          icon: pinIcon,
        }
      );

      marker.addTo(map).bindPopup(createAd([item]));
    });
  },
  () => createErrorNotice('Ошибка загрузки данных с сервера')
);
