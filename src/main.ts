import {
  getWeatherByLocation,
  deleteContent,
  API_KEY,
  API_URL,
  deleteWeatherNode,
} from './weather';
import { successCallback, errorCallback } from './geolocation';
import L from 'leaflet';
import { updateMarkerByLocation } from './map';
import {
  deleteValue,
  getScreenWidth,
  spaceAvailable,
  sweetAlertSettings,
  sweetAlertWarning,
} from './utils';

export let weatherNodeCounter: number = 0;
let comparisonEnabled: boolean = false;
let showAuto: boolean = false;

export const setWeatherNodeCounter = (num: number) => {
  weatherNodeCounter = num;
  console.log(weatherNodeCounter);
};

export let locationInput: HTMLInputElement =
  document.querySelector('.location');
let settingsBtn: HTMLButtonElement = document.querySelector('.settings');
let searchBtn: HTMLButtonElement = document.querySelector('.search');
export let compareBtn: HTMLButtonElement = document.querySelector('.compare');
let deleteBtn: HTMLButtonElement = document.querySelector('.delete');

locationInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') searchWeather();
});
settingsBtn.addEventListener('click', () =>
  sweetAlertSettings(comparisonEnabled, showAuto)
);
searchBtn.addEventListener('click', () => searchWeather());
compareBtn.addEventListener('click', () => changeBtnState(compareBtn));
deleteBtn.addEventListener('click', (): void => {
  deleteValue();
  deleteContent();
});

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

//Mapa

export let map = L.map('map', {
  minZoom: 2,
  maxZoom: 11,
}).setView([-33, -56], 3);

map.setMaxBounds([
  [-90, -180],
  [90, 180],
]);

if (getScreenWidth() > 1125) {
  map.setMinZoom(3);
}

//Se agrega capa base al mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

//Se obtienen capas de temperatura, nubes, precipitaciones y viento
let temp = L.tileLayer(
  `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
  {
    attribution:
      'Weather from <a href="https://openweathermap.org/">OpenWeatherMap</a>',
  }
).addTo(map);

let clouds = L.tileLayer(
  `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
  {
    attribution:
      'Weather from <a href="https://openweathermap.org/">OpenWeatherMap</a>',
  }
);

let precipitation = L.tileLayer(
  `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
  {
    attribution:
      'Weather from <a href="https://openweathermap.org/">OpenWeatherMap</a>',
  }
);

let wind = L.tileLayer(
  `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
  {
    attribution:
      'Weather from <a href="https://openweathermap.org/">OpenWeatherMap</a>',
  }
);

let none = L.tileLayer('');

let baseMaps = {
  Temperature: temp,
  'Wind speed': wind,
  Clouds: clouds,
  Precipitation: precipitation,
  None: none,
};

//Se agrega control de capas al mapa
L.control.layers(baseMaps).addTo(map).expand();

export let marker = L.marker([-33, -56]).addTo(map);

//Se obtienen nuevos datos al hacer click en el mapa
function getNewLocation(newPosition) {
  map.setView([newPosition.latlng.lat, newPosition.latlng.lng]);
  marker.setLatLng([newPosition.latlng.lat, newPosition.latlng.lng]);
  getLocationFromMap(newPosition.latlng.lat, newPosition.latlng.lng);
}

map.on('click', getNewLocation);

const searchWeather = () => {
  if (locationInput.value !== '') {
    if (
      comparisonEnabled &&
      spaceAvailable(weatherNodeCounter, getScreenWidth())
    ) {
      getWeatherByLocation(locationInput.value);
      updateMarkerByLocation(map, marker, locationInput.value);
    } else if (comparisonEnabled) {
      deleteWeatherNode();
      getWeatherByLocation(locationInput.value);
      updateMarkerByLocation(map, marker, locationInput.value);
    } else {
      deleteContent();
      getWeatherByLocation(locationInput.value);
      updateMarkerByLocation(map, marker, locationInput.value);
    }
  } else {
    sweetAlertWarning('Please fill the imput before searching.');
  }
};

const changeBtnState = (button: HTMLButtonElement) => {
  if (button.classList.contains('active')) {
    button.classList.remove('active');
    comparisonEnabled = false;
  } else {
    button.classList.add('active');
    comparisonEnabled = true;
  }
};

export const setBtnActive = (button: HTMLButtonElement) => {
  if (!button.classList.contains('active')) {
    button.classList.add('active');
    comparisonEnabled = true;
  }
};

export const setBtnInactive = (button: HTMLButtonElement) => {
  if (button.classList.contains('active')) {
    button.classList.remove('active');
    comparisonEnabled = false;
  }
};

export const setShowActive = () => {
  if (!showAuto) {
    showAuto = true;
  }
};

export const setShowInactive = () => {
  if (showAuto) {
    showAuto = false;
  }
};

const getLocationFromMap = async (latitude, longitude): Promise<void> => {
  const response = await fetch(
    `${API_URL}lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
  );
  const data = await response.json();
  if (data.sys.country !== undefined) {
    locationInput.value = `${data.name}, ${data.sys.country}`;
    marker.bindPopup(`${data.name}, ${data.sys.country}`);
    marker.openPopup();
    if (showAuto) {
      if (locationInput.value !== '') {
        if (
          comparisonEnabled &&
          spaceAvailable(weatherNodeCounter, getScreenWidth())
        ) {
          getWeatherByLocation(locationInput.value);
        } else if (comparisonEnabled) {
          deleteWeatherNode();
          getWeatherByLocation(locationInput.value);
        } else {
          deleteContent();
          getWeatherByLocation(locationInput.value);
        }
      }
    }
  } else {
    locationInput.value = '';
    marker.bindPopup('Undefined location. Please try again.');
    marker.openPopup();
  }
};
