// Import APIs
import { weatherKey, geoKey } from './api.js';

// Event Listener
const form = document.getElementById('form');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  fetchWeather();
});

// Fetch Weather API Data
function fetchWeather() {
  fetch(
    'https://api.openweathermap.org/data/2.5/weather?zip=' +
      zip.value +
      '&appid=' +
      weatherKey
  )
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      domWeather(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

// DOM Manipulation
function domWeather(data) {
  var fahrenheit = Math.round((parseFloat(data.main.temp) - 273.15) * 1.8 + 32);
  var iconCode = data.weather[0].icon;
  var iconURL = 'http://openweathermap.org/img/w/';

  document.getElementById('city').innerHTML = data.name;
  document.getElementById('country').innerHTML = data.sys.country;
  document.getElementById('weather').innerHTML = data.weather[0].main;
  document.getElementById('icon').src = iconURL + iconCode + '.png';
  document.getElementById('temperature').innerHTML = fahrenheit + '°F';

  document.getElementById('results').style.visibility = 'visible';
}

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
      fetchWeather();
    })
    .catch((err) => {
      console.log(err);
    });
}
