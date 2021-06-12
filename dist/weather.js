import { setWeatherNodeCounter, weatherNodeCounter } from './main.js';
import {
  capitalizeFirstLetter,
  roundToOneDigitAfterComma,
  sweetAlertError,
} from './utils.js';
export const API_KEY = 'af35cd595cda16b3edfc97e2a21ab394';
export const API_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const API_UNITS = 'metric';
let weatherContainer = document.querySelector('.weather-container');
export const getWeatherByLocation = async location => {
  try {
    const response = await fetch(
      `${API_URL}q=${location}&appid=${API_KEY}&units=${API_UNITS}`
    );
    const data = await response.json();
    const weatherNode = createWeatherNode(data, location);
    weatherContainer.prepend(weatherNode);
    setWeatherNodeCounter(weatherNodeCounter + 1);
  } catch (error) {
    sweetAlertError('Weather unavailable. Please try again.');
  }
};
const createWeatherNode = (data, location) => {
  //contenedor principal
  const container = document.createElement('article');
  container.className = 'container';
  const title = document.createElement('h3');
  title.textContent = `Current weather in ${location}`;
  const icon = document.createElement('img');
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  icon.alt = 'Weather icon';
  const description = document.createElement('p');
  description.textContent = data.weather[0].description;
  description.textContent = capitalizeFirstLetter(description.textContent);
  description.className = 'description';
  const temperature = document.createElement('h2');
  temperature.textContent = `${roundToOneDigitAfterComma(data.main.temp)}°C`;
  const feelsLike = document.createElement('p');
  feelsLike.textContent = `Feels like: ${roundToOneDigitAfterComma(
    data.main.feels_like
  )}°C`;
  feelsLike.className = 'feelsLike';
  const humidity = document.createElement('p');
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  humidity.className = 'humidity';
  const wind = document.createElement('p');
  wind.textContent = `Wind: ${roundToOneDigitAfterComma(data.wind.speed)} km/h`;
  wind.className = 'wind';
  container.append(
    title,
    icon,
    description,
    temperature,
    feelsLike,
    humidity,
    wind
  );
  return container;
};
export const deleteWeatherNode = () => {
  const toDelete = weatherContainer.lastChild;
  weatherContainer.removeChild(toDelete);
  setWeatherNodeCounter(weatherNodeCounter - 1);
};
export const deleteContent = () => {
  while (weatherContainer.firstChild) {
    const toDelete = weatherContainer.firstChild;
    weatherContainer.removeChild(toDelete);
  }
  setWeatherNodeCounter(0);
};
