import {
  getWeatherByLocation,
  deleteContent,
  API_KEY,
  API_URL,
  deleteWeatherNode,
} from './weather.js';
import { successCallback, errorCallback } from './geolocation.js';
// import L from 'leaflet';
import { updateMarkerByLocation } from './map.js';
import {
  deleteValue,
  getScreenWidth,
  spaceAvailable,
  sweetAlertInfo,
  sweetAlertSettings,
  sweetAlertWarning,
} from './utils.js';
export let weatherNodeCounter = 0;
let comparisonEnabled = false;
let showAuto = false;
export const setWeatherNodeCounter = num => (weatherNodeCounter = num);
export let locationInput = document.querySelector('.location');
let settingsBtn = document.querySelector('.settings');
let searchBtn = document.querySelector('.search');
export let compareBtn = document.querySelector('.compare');
let deleteBtn = document.querySelector('.delete');
locationInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') searchWeather();
});
settingsBtn.addEventListener('click', () =>
  sweetAlertSettings(comparisonEnabled, showAuto)
);
searchBtn.addEventListener('click', () => searchWeather());
compareBtn.addEventListener('click', () => {
  //if its tablet
  if (getScreenWidth() >= 720 && getScreenWidth() < 1050) {
    sweetAlertInfo(
      'Función no disponible en tablet. Por favor intente en su teléfono móvil o computadora.'
    );
  } else {
    changeBtnState(compareBtn);
  }
});
deleteBtn.addEventListener('click', () => {
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
  Temperatura: temp,
  Viento: wind,
  Nubes: clouds,
  Precipitaciones: precipitation,
  Ninguna: none,
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
    sweetAlertWarning('Por favor escriba la ubicación deseada.');
  }
};
const changeBtnState = button => {
  if (button.classList.contains('active')) {
    button.classList.remove('active');
    comparisonEnabled = false;
  } else {
    button.classList.add('active');
    comparisonEnabled = true;
  }
};
export const setBtnActive = button => {
  if (!button.classList.contains('active')) {
    button.classList.add('active');
    comparisonEnabled = true;
  }
};
export const setBtnInactive = button => {
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
const getLocationFromMap = async (latitude, longitude) => {
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
    marker.bindPopup('Ubicación no definida. Inténtalo de nuevo.');
    marker.openPopup();
  }
};
