import { getWeatherByLocation, deleteContent } from './weather.js';
let locationInput = document.querySelector('.location');
let searchBtn = document.querySelector('.search');
let deleteBtn = document.querySelector('.delete');
searchBtn.addEventListener('click', () =>
  getWeatherByLocation(locationInput.value)
);
deleteBtn.addEventListener('click', () => deleteContent());
