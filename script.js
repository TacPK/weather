function weather(zipCode) {
  var key = 'cb76f3e75adae5a47fdb83709b5d4ad3';

  fetch(
    'https://api.openweathermap.org/data/2.5/weather?zip=' +
      zipCode +
      '&appid=' +
      key
  )
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      console.log(data.weather[0].main);
    })
    .catch((err) => {
      console.log(err);
    });
}

// document.getElementsByClassName('weather').innerHTML = data.weather[0].main;
