import { locationInput, map, marker } from './main';
import { updateMarkerByGeolocation } from './map';
import { API_URL, API_KEY } from './weather';

export const successCallback = position => {
  console.log(position);
  getLocationName(position);
  updateMarkerByGeolocation(map, marker, position);
};

export const errorCallback = error => {
  if (error.code == error.PERMISSION_DENIED) {
    console.log(error);
    console.log('deshabilitado');
  }
};

const getLocationName = async (position): Promise<void> => {
  const response = await fetch(
    `${API_URL}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`
  );
  const data = await response.json();
  locationInput.value = `${data.name}, ${data.sys.country}`;
};
