import { API_URL, API_KEY } from './weather.js';
export const updateMarkerByGeolocation = (map, marker, position) => {
    map.setView([position.coords.latitude, position.coords.longitude], 3);
    marker.setLatLng([position.coords.latitude, position.coords.longitude]);
    marker.bindPopup('Estás acá');
    marker.openPopup();
};
export const updateMarkerByLocation = async (map, marker, location) => {
    try {
        const response = await fetch(`${API_URL}q=${location}&appid=${API_KEY}`);
        const data = await response.json();
        map.setView([data.coord.lat, data.coord.lon], 3);
        marker.setLatLng([data.coord.lat, data.coord.lon]);
        marker.closePopup();
    }
    catch (error) {
        console.log(`Fetch error ${error}`);
    }
};
