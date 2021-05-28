import { locationInput } from './main.js';
import { roundToOneDigitAfterComma } from './utils.js';

export const API_KEY: String = '58028712b6a3c7b033e2d4752aab2b37';
export const API_URL: String =
  'https://api.openweathermap.org/data/2.5/weather?';
const API_UNITS: String = 'metric';
export const API_LANG: String = 'sp';
let weatherContainer: HTMLElement =
  document.querySelector('.weather-container');

export const getWeatherByLocation = async (location: String): Promise<void> => {
  try {
    const response = await fetch(
      `${API_URL}q=${location}&appid=${API_KEY}&units=${API_UNITS}&lang=${API_LANG}`
    );
    const data = await response.json();
    console.log(data);
    const weatherNode = createWeatherNode(data);
    weatherContainer.append(weatherNode);
  } catch (error) {
    console.log(`Fetch error ${error}`);
  }
};

const createWeatherNode = (data): HTMLDivElement => {
  //contenedor principal
  const container: HTMLDivElement = document.createElement('div');
  container.className = 'container';

  // mainInfo
  const main: HTMLDivElement = document.createElement('div');
  const icon: HTMLImageElement = document.createElement('img');
  icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const description: HTMLParagraphElement = document.createElement('p');
  description.textContent = data.weather[0].description;
  const temperature: HTMLHeadingElement = document.createElement('h2');
  temperature.textContent = `${roundToOneDigitAfterComma(data.main.temp)}°C`;
  const realFeel: HTMLParagraphElement = document.createElement('p');
  realFeel.textContent = `RealFeel: ${roundToOneDigitAfterComma(
    data.main.feels_like
  )}°C`;
  main.append(icon, description, temperature, realFeel);
  const extraInfo: HTMLDivElement = document.createElement('div');
  const humidity: HTMLParagraphElement = document.createElement('p');
  humidity.textContent = `Humedad: ${data.main.humidity}%`;
  const wind: HTMLParagraphElement = document.createElement('p');
  wind.textContent = `Viento: ${roundToOneDigitAfterComma(
    data.wind.speed
  )} km/h`;
  extraInfo.append(humidity, wind);

  //se agregan ambos contenedores al contenedor principal
  container.append(main, extraInfo);

  return container;
};

export const deleteContent = (): void => {
  while (weatherContainer.firstChild) {
    const toDelete = weatherContainer.firstChild;
    weatherContainer.removeChild(toDelete);
  }
  locationInput.value = '';
};
