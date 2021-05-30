import { locationInput } from './main.js';
import { capitalizeFirstLetter, roundToOneDigitAfterComma } from './utils.js';

export const API_KEY: string = '58028712b6a3c7b033e2d4752aab2b37';
export const API_URL: string =
  'https://api.openweathermap.org/data/2.5/weather?';
const API_UNITS: string = 'metric';
let weatherContainer: HTMLElement =
  document.querySelector('.weather-container');

export const getWeatherByLocation = async (location: string): Promise<void> => {
  try {
    const response: Response = await fetch(
      `${API_URL}q=${location}&appid=${API_KEY}&units=${API_UNITS}`
    );
    const data: JSON = await response.json();
    console.log(data);
    const weatherNode: HTMLDivElement = createWeatherNode(data, location);
    weatherContainer.prepend(weatherNode);
  } catch (error) {
    console.log(`Fetch error ${error}`);
  }
};

const createWeatherNode = (data, location: string): HTMLDivElement => {
  //contenedor principal
  const container: HTMLDivElement = document.createElement('div');
  container.className = 'container';

  const title: HTMLHeadingElement = document.createElement('h3');
  title.textContent = `Current weather in ${location}`;
  const icon: HTMLImageElement = document.createElement('img');
  icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const description: HTMLParagraphElement = document.createElement('p');
  description.textContent = data.weather[0].description;
  description.textContent = capitalizeFirstLetter(description.textContent);
  description.className = 'description';
  const temperature: HTMLHeadingElement = document.createElement('h2');
  temperature.textContent = `${roundToOneDigitAfterComma(data.main.temp)}°C`;
  const feelsLike: HTMLParagraphElement = document.createElement('p');
  feelsLike.textContent = `Feels like: ${roundToOneDigitAfterComma(
    data.main.feels_like
  )}°C`;
  feelsLike.className = 'feelsLike';
  const humidity: HTMLParagraphElement = document.createElement('p');
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  humidity.className = 'humidity';
  const wind: HTMLParagraphElement = document.createElement('p');
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

export const deleteContent = (): void => {
  while (weatherContainer.firstChild) {
    const toDelete = weatherContainer.firstChild;
    weatherContainer.removeChild(toDelete);
  }
  locationInput.value = '';
};
