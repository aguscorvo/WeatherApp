import { getWeatherByLocation, deleteContent } from './weather';

let locationInput: HTMLInputElement = document.querySelector('.location');
let searchBtn: HTMLElement = document.querySelector('.search');
let deleteBtn: HTMLElement = document.querySelector('.delete');

searchBtn.addEventListener('click', () =>
  getWeatherByLocation(locationInput.value)
);
deleteBtn.addEventListener('click', () => deleteContent());
