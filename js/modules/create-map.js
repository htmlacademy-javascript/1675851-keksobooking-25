import {setInactiveState, setActiveState} from './set-state.js';
import {createData, DIGITS_SIZE} from './create-data.js';
import {createAd} from './create-ad.js';

setInactiveState();

const tokyoPoints = {
  latitude: 35.68211,
  longitude: 139.76567
};

const data = createData;
const address = document.querySelector('[name="address"]');

address.value = `${tokyoPoints.latitude}, ${tokyoPoints.longitude}`;

const map = L.map('map-canvas')
  .on('load', () => {
    setActiveState();
  })
  .setView({
    lat: tokyoPoints.latitude,
    lng: tokyoPoints.longitude,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: tokyoPoints.latitude,
    lng: tokyoPoints.longitude,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

mainMarker.on('move', (evt) => {
  const addressPoints = evt.target.getLatLng();

  address.value = `${addressPoints.lat.toFixed(DIGITS_SIZE)}, ${addressPoints.lng.toFixed(DIGITS_SIZE)}`;
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

data.forEach((item) => {
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
