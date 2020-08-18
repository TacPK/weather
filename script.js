// // Const for RapidAPI key
// const rapidKey = '8e7221da4cmshddb6abe80e1272fp1013b5jsn91c730b8c6e1';

// // IP Geo Location API
// fetch('https://ip-geo-location.p.rapidapi.com/ip/23.123.12.11?format=json', {
//   method: 'GET',
//   headers: {
//     'x-rapidapi-host': 'ip-geo-location.p.rapidapi.com',
//     'x-rapidapi-key': '8e7221da4cmshddb6abe80e1272fp1013b5jsn91c730b8c6e1',
//   },
// })
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// // Weather API
// function weather(cityID) {
//     fetch(
//   'https://community-open-weather-map.p.rapidapi.com/forecast?q=san%20francisco%252Cus',
//   {
//     method: 'GET',
//     headers: {
//       'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
//       'x-rapidapi-key': '8e7221da4cmshddb6abe80e1272fp1013b5jsn91c730b8c6e1',
//     },
//   }
// )
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

function drawWeather(d) {
  var celcius = Math.round(parseFloat(d.main.temp) - 273.15);
  var fahrenheit = Math.round((parseFloat(d.main.temp) - 273.15) * 1.8 + 32);

  document.getElementById('description').innerHTML = d.weather[0].description;
  document.getElementById('temp').innerHTML = celcius + '&deg;';
  document.getElementById('location').innerHTML = d.name;
}

function weatherBalloon(cityID) {
  var key = 'cb76f3e75adae5a47fdb83709b5d4ad3';
  fetch(
    'https://api.openweathermap.org/data/2.5/weather?id=' +
      cityID +
      '&appid=' +
      key
  )
    .then(function (resp) {
      return resp.json();
    }) // Convert data to json
    .then(function (data) {
      drawWeather(data); // Call drawWeather
    })
    .catch(function () {
      // catch any errors
    });
}

window.onload = function () {
  weatherBalloon(6167865);
};
