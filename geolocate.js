// Import APIs
import { geoKey } from './api.js';

// Geolocation Button
const geo = document.getElementById('loc');

// Get Coordinates
function watchID() {
  navigator.geolocation.watchPosition((position) => {
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    let coords = latitude + ',' + longitude;
    localStorage.setItem(coords, coords);
  });
}

// Event Listener for Geolocation Button
geo.addEventListener('click', function (e) {
  fetchGeo();
});

// Get Zip Code
function fetchGeo() {
  watchID();
  let coordsLocal = localStorage.getItem('coords');
  fetch(
    'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
      coordsLocal +
      '&key=' +
      geoKey
  )
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      zip.value = data.results[0].address_components[7].short_name;
    })
    .catch((err) => {
      console.log(err);
    });
}
