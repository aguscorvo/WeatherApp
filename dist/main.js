import { getWeatherByLocation, deleteContent, API_KEY } from './weather.js';
import { successCallback, errorCallback } from './geolocation.js';
// import L from 'leaflet';
import { updateMarkerByLocation } from './map.js';
export let locationInput = document.querySelector('.location');
let searchBtn = document.querySelector('.search');
let deleteBtn = document.querySelector('.delete');
searchBtn.addEventListener('click', () => {
  getWeatherByLocation(locationInput.value);
  updateMarkerByLocation(map, marker, locationInput.value);
});
deleteBtn.addEventListener('click', () => deleteContent());
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
//Mapa
export let map = L.map('map', {
  minZoom: 2,
  maxZoom: 11,
}).setView([-33, -56], 3);
//Se agrega capa base al mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
//Se obtienen capas de temperatura, nubes, precipitaciones y viento
export let temp = L.tileLayer(
  `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(map);
export let clouds = L.tileLayer(
  `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);
export let precipitation = L.tileLayer(
  `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);
export let wind = L.tileLayer(
  `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);
export let none = L.tileLayer('');
var baseMaps = {
  Temperature: temp,
  Clouds: clouds,
  Precipitation: precipitation,
  Wind: wind,
  None: none,
};
//Se agrega control de capas al mapa
L.control.layers(baseMaps).addTo(map);
export let marker = L.marker([-33, -56]).addTo(map);
