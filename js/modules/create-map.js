import {setInactiveState, setActiveState} from './set-state.js';

setInactiveState();

const tokyoPoints = {
  latitude: 35.68211,
  longitude: 139.76567
};

const MAP_ZOOM = 13;

const MAIN_PIN_SIZE = [
  52,
  52
];

const MINOR_PIN_SIZE = [
  40,
  40
];

const MAIN_PIN_SHIFT = [
  26,
  52
];

const MINOR_PIN_SHIFT = [
  20,
  40
];

const address = document.querySelector('[name="address"]');
const DIGITS_AMOUNT = 5;

const map = L.map('map-canvas')
  .on('load', () => {
    setActiveState();
  })
  .setView({
    lat: tokyoPoints.latitude,
    lng: tokyoPoints.longitude,
  }, MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: MAIN_PIN_SIZE,
  iconAnchor: MAIN_PIN_SHIFT,
});

const minorPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: MINOR_PIN_SIZE,
  iconAnchor: MINOR_PIN_SHIFT,
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

  address.value = `${addressPoints.lat.toFixed(DIGITS_AMOUNT)}, ${addressPoints.lng.toFixed(DIGITS_AMOUNT)}`;
});

const resetMap = () => {
  map.setView([tokyoPoints.latitude, tokyoPoints.longitude], MAP_ZOOM);
  mainMarker.setLatLng([tokyoPoints.latitude, tokyoPoints.longitude]);
  map.closePopup();
};

export {tokyoPoints, map, minorPinIcon, mainMarker, resetMap};
