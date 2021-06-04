import {
  getWeatherByLocation,
  deleteContent,
  API_KEY,
  deleteWeatherNode,
} from './weather.js';
import {
  successCallback,
  errorCallback,
  getLocationFromMap,
} from './geolocation.js';
// import L from 'leaflet';
import { updateMarkerByLocation } from './map.js';
import { getScreenWidth, spaceAvailable } from './utils.js';
export let weatherNodeCounter = 0;
export const setWeatherNodeCounter = num => {
  weatherNodeCounter = num;
  console.log(weatherNodeCounter);
};
export let locationInput = document.querySelector('.location');
let searchBtn = document.querySelector('.search');
let deleteBtn = document.querySelector('.delete');
locationInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') searchWeather();
});
searchBtn.addEventListener('click', () => searchWeather());
deleteBtn.addEventListener('click', () => deleteContent());
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
    if (spaceAvailable(weatherNodeCounter, getScreenWidth())) {
      getWeatherByLocation(locationInput.value);
      updateMarkerByLocation(map, marker, locationInput.value);
    } else {
      deleteWeatherNode();
      getWeatherByLocation(locationInput.value);
      updateMarkerByLocation(map, marker, locationInput.value);
    }
  }
};
