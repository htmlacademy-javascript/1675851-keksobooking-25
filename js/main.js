import {createData} from './modules/create-data.js';
import {createAd} from './modules/create-ad.js';
import {setInactiveState, setActiveState} from './modules/set-state.js';

const adContainer = document.querySelector('.map__canvas');
adContainer.appendChild(createAd(createData));
