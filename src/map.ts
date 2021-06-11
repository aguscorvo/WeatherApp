import { API_URL, API_KEY } from './weather';

export const updateMarkerByGeolocation = (
  map: L.Map,
  marker: L.Marker,
  position
) => {
  map.setView([position.coords.latitude, position.coords.longitude], 3);
  marker.setLatLng([position.coords.latitude, position.coords.longitude]);
  marker.bindPopup('Tu ubicación');
  marker.openPopup();
};

export const updateMarkerByLocation = async (
  map: L.Map,
  marker: L.Marker,
  location: string
): Promise<void> => {
  try {
    const response: Response = await fetch(
      `${API_URL}q=${location}&appid=${API_KEY}`
    );
    const data = await response.json();
    map.setView([data.coord.lat, data.coord.lon]);
    marker.setLatLng([data.coord.lat, data.coord.lon]);
    marker.bindPopup(`${data.name}, ${data.sys.country}`);
    marker.openPopup();
  } catch (error) {
    console.log(`Fetch error ${error}`);
  }
};
