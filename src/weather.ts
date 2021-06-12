import {
  locationInput,
  setWeatherNodeCounter,
  weatherNodeCounter,
} from './main';
import {
  capitalizeFirstLetter,
  roundToOneDigitAfterComma,
  sweetAlertError,
} from './utils';

export const API_KEY: string = 'af35cd595cda16b3edfc97e2a21ab394';
export const API_URL: string =
  'https://api.openweathermap.org/data/2.5/weather?';
const API_UNITS: string = 'metric';
let weatherContainer: HTMLElement =
  document.querySelector('.weather-container');

export const getWeatherByLocation = async (
  location: string | Promise<string>
): Promise<void> => {
  try {
    const response: Response = await fetch(
      `${API_URL}q=${location}&appid=${API_KEY}&units=${API_UNITS}`
    );
    const data: JSON = await response.json();
    const weatherNode: HTMLElement = createWeatherNode(data, location);
    weatherContainer.prepend(weatherNode);
    setWeatherNodeCounter(weatherNodeCounter + 1);
  } catch (error) {
    sweetAlertError('Weather unavailable. Please try again.');
  }
};

const createWeatherNode = (
  data,
  location: string | Promise<string>
): HTMLElement => {
  //contenedor principal
  const container: HTMLElement = document.createElement('article');
  container.className = 'container';

  const title: HTMLHeadingElement = document.createElement('h3');
  title.textContent = `Current weather in ${location}`;
  const icon: HTMLImageElement = document.createElement('img');
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  icon.alt = 'Weather icon';
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

export const deleteWeatherNode = (): void => {
  const toDelete: ChildNode = weatherContainer.lastChild;
  weatherContainer.removeChild(toDelete);
  setWeatherNodeCounter(weatherNodeCounter - 1);
};

export const deleteContent = (): void => {
  while (weatherContainer.firstChild) {
    const toDelete: ChildNode = weatherContainer.firstChild;
    weatherContainer.removeChild(toDelete);
  }
  setWeatherNodeCounter(0);
};
