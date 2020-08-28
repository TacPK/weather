// Import APIs
import { weatherKey } from './api.js';

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

// DOM Manipulation (put under .then(data) in Fetch)
function domWeather(data) {
  var fahrenheit = Math.round((parseFloat(data.main.temp) - 273.15) * 1.8 + 32);
  var iconCode = data.weather[0].icon;
  var iconURL = 'http://openweathermap.org/img/w/';

  document.getElementById('city').innerHTML = data.name;
  document.getElementById('country').innerHTML = data.sys.country;
  document.getElementById('weather').innerHTML = data.weather[0].main;
  document.getElementById('icon').src = iconURL + iconCode + '.png';
  document.getElementById('temperature').innerHTML = fahrenheit + '°F';
}
