import { locationInput, map, marker } from './main';
import { updateMarkerByGeolocation } from './map';
import { sweetAlertError } from './utils';
import { API_URL, API_KEY, getWeatherByLocation } from './weather';

export const successCallback = position => {
  getLocationName(position);
  updateMarkerByGeolocation(map, marker, position);
};

export const errorCallback = error => {
  if (error.code == (error.POSITION_UNAVAILABLE || error.TIMEOUT)) {
    sweetAlertError(
      'Ubicación no disponible. Por favor inténtalo de nuevo (F5).'
    );
  }
};

const getLocationName = async position => {
  const response = await fetch(
    `${API_URL}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`
  );
  const data = await response.json();
  locationInput.value = `${data.name}, ${data.sys.country}`;
  getWeatherByLocation(locationInput.value);
};
