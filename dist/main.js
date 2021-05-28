import { getWeatherByLocation, deleteContent } from './weather.js';
import { successCallback, errorCallback } from './geolocation.js';
export let locationInput = document.querySelector('.location');
let searchBtn = document.querySelector('.search');
let deleteBtn = document.querySelector('.delete');
searchBtn.addEventListener('click', () => getWeatherByLocation(locationInput.value));
deleteBtn.addEventListener('click', () => deleteContent());
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
