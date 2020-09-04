// Import APIs
import { weatherKey, geoKey } from './apis.js';

// Force All Caps and Remove Spaces in Form Field
function allCapsNoSpaces() {
  let string = zip.value;
  let newString = string.toUpperCase().replace(/\s+/g, '');
  zip.value = newString;
}

// Event Listener
const form = document.getElementById('form');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  allCapsNoSpaces();
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
      alert('Please enter a valid zip code!');
    });
}

// DOM Manipulation
function domWeather(data) {
  var fahrenheit = Math.round((parseFloat(data.main.temp) - 273.15) * 1.8 + 32);
  var iconCode = data.weather[0].icon;
  var iconURL = 'http://openweathermap.org/img/w/';

  document.getElementById('city').innerHTML = data.name;
  fetchState();
  document.getElementById('country').innerHTML = data.sys.country;
  document.getElementById('weather').innerHTML = data.weather[0].main;
  document.getElementById('icon').src = iconURL + iconCode + '.png';
  document.getElementById('temperature').innerHTML = fahrenheit + '°F';

  document.getElementById('results').style.display = 'flex';
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
      alert('Cannot find coordinates. Sorry!');
    });
}

// Get State
function fetchState() {
  fetch(
    'https://maps.googleapis.com/maps/api/geocode/json?address=' +
      zip.value +
      '&key=' +
      geoKey
  )
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      domState(data);
    });
}

// Added domState
function domState(data) {
  state.value = data.results[0].address_components[3].short_name;
  document.getElementById('state').innerHTML = state.value;
}
