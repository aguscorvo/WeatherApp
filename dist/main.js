import { API_KEY } from './config.js';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const API_UNITS = 'metric';
const API_LANG = 'sp';
let locationInput = document.querySelector('.location');
let searchBtn = document.querySelector('.search');
let deleteBtn = document.querySelector('.delete');
let weatherContainer = document.querySelector('.weather-container');
searchBtn.addEventListener('click', () =>
  getWeatherByLocation(locationInput.value)
);
const getWeatherByLocation = async location => {
  try {
    const response = await fetch(
      `${API_URL}q=${location}&appid=${API_KEY}&units=${API_UNITS}&lang=${API_LANG}`
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(`Fetch error ${error}`);
  }
};
