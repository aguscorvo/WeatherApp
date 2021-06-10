import {
  locationInput,
  map,
  marker,
  setWeatherNodeCounter,
  weatherNodeCounter,
} from './main';
import { updateMarkerByGeolocation } from './map';
import { sweetAlertError } from './utils';
import { API_URL, API_KEY, getWeatherByLocation } from './weather';

export const successCallback = position => {
  console.log(position);
  getLocationName(position);
  updateMarkerByGeolocation(map, marker, position);
};

export const errorCallback = error => {
  if (error.code == error.PERMISSION_DENIED) {
    console.log(error);
    console.log('deshabilitado');
  } else if (error.code == (error.POSITION_UNAVAILABLE || error.TIMEOUT)) {
    sweetAlertError('Position unavailable. Please try again (F5).');
  }
};

const getLocationName = async position => {
  const response = await fetch(
    `${API_URL}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`
  );
  const data = await response.json();
  locationInput.value = `${data.name}, ${data.sys.country}`;
  getWeatherByLocation(locationInput.value);
  //falta manejo de errores
};

export const getLocationFromMap = async (
  latitude,
  longitude
): Promise<void> => {
  const response = await fetch(
    `${API_URL}lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
  );
  const data = await response.json();
  if (data.sys.country !== undefined) {
    locationInput.value = `${data.name}, ${data.sys.country}`;
    marker.bindPopup(`${data.name}, ${data.sys.country}`);
    marker.openPopup();
  } else {
    locationInput.value = '';
    marker.bindPopup('Undefined location. Please try again.');
    marker.openPopup();
  }
};
