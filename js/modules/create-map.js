import {setInactiveState, setActiveState} from './set-state.js';
import {DIGITS_SIZE} from './create-data.js';

setInactiveState();

const tokyoPoints = {
  latitude: 35.68211,
  longitude: 139.76567
};

const MAP_SCALE = 13;

const MAIN_PIN_SIZE = [
  52,
  52
];

const PIN_SIZE = [
  40,
  40
];

const address = document.querySelector('[name="address"]');

const map = L.map('map-canvas')
  .on('load', () => {
    setActiveState();
  })
  .setView({
    lat: tokyoPoints.latitude,
    lng: tokyoPoints.longitude,
  }, MAP_SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: MAIN_PIN_SIZE,
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: PIN_SIZE,
  iconAnchor: [20, 40],
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

export {map, pinIcon, mainMarker, tokyoPoints};
