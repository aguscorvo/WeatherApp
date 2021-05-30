import { getWeatherByLocation, deleteContent } from './weather.js';
import { successCallback, errorCallback } from './geolocation.js';
// import L from 'leaflet';
export let locationInput = document.querySelector('.location');
let searchBtn = document.querySelector('.search');
let deleteBtn = document.querySelector('.delete');
searchBtn.addEventListener('click', () =>
  getWeatherByLocation(locationInput.value)
);
deleteBtn.addEventListener('click', () => deleteContent());
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
//Mapa
let map = L.map('map', {
  minZoom: 3,
  maxZoom: 11,
}).setView([-34.89014879874051, -56.166746954884836], 3);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
let marker = L.marker([-34.8846231, -56.108646099999994])
  .addTo(map)
  .bindPopup('Estás acá')
  .openPopup();
