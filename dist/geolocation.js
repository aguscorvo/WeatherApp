import { locationInput } from './main.js';
import { API_URL, API_KEY } from './weather.js';
export const successCallback = position => {
  console.log(position);
  getLocationName(position);
};
export const errorCallback = error => {
  if (error.code == error.PERMISSION_DENIED) {
    console.log(error);
    console.log('deshabilitado');
  }
};
const getLocationName = async position => {
  const response = await fetch(
    `${API_URL}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`
  );
  const data = await response.json();
  locationInput.value = `${data.name}, ${data.sys.country}`;
};
