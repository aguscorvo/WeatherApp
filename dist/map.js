import { sweetAlertError } from './utils.js';
import { API_URL, API_KEY } from './weather.js';
export const updateMarkerByGeolocation = (map, marker, position) => {
  map.setView([position.coords.latitude, position.coords.longitude], 3);
  marker.setLatLng([position.coords.latitude, position.coords.longitude]);
  marker.bindPopup('Your location');
  marker.openPopup();
};
export const updateMarkerByLocation = async (map, marker, location) => {
  try {
    const response = await fetch(`${API_URL}q=${location}&appid=${API_KEY}`);
    const data = await response.json();
    map.setView([data.coord.lat, data.coord.lon]);
    marker.setLatLng([data.coord.lat, data.coord.lon]);
    marker.bindPopup(`${data.name}, ${data.sys.country}`);
    marker.openPopup();
  } catch (error) {
    sweetAlertError('Please try again.');
  }
};
