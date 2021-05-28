import { getWeatherByLocation, deleteContent } from './weather.js';
import { successCallback, errorCallback } from './geolocation.js';

export let locationInput: HTMLInputElement =
  document.querySelector('.location');
let searchBtn: HTMLElement = document.querySelector('.search');
let deleteBtn: HTMLElement = document.querySelector('.delete');

searchBtn.addEventListener('click', () =>
  getWeatherByLocation(locationInput.value)
);
deleteBtn.addEventListener('click', () => deleteContent());

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
