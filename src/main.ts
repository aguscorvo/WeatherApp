import { API_KEY } from './config';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const API_UNITS = 'metric';
const API_LANG = 'sp';

let locationInput: HTMLInputElement = document.querySelector('.location');
let searchBtn: HTMLElement = document.querySelector('.search');
let deleteBtn: HTMLElement = document.querySelector('.delete');
let weatherContainer: HTMLElement =
  document.querySelector('.weather-container');

searchBtn.addEventListener('click', () =>
  getWeatherByLocation(locationInput.value)
);

const getWeatherByLocation = async (location: String): Promise<void> => {
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
