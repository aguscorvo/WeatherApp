import { locationInput } from './main';
import { API_URL, API_KEY, API_LANG } from './weather';

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

const getLocationName = async (position): Promise<void> => {
  const response = await fetch(
    `${API_URL}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&lang=${API_LANG}`
  );
  const data = await response.json();
  locationInput.value = `${data.name}, ${data.sys.country}`;
};
