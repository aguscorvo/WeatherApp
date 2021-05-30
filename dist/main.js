import { getWeatherByLocation, deleteContent } from './weather.js';
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
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
export let marker = L.marker([-33, -56]).addTo(map);
