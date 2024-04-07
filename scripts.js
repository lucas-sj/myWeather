if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      callWeatherAPI(lat, lon);
    }, function(error) {
      console.error('Erro ao obter a localização:', error.message);
    });
  } else {
    console.error('Geolocalização não suportada pelo navegador.');
  }


function callWeatherAPI(lat,lon){
    const lat_test = -23.628300;
    const lon_test = -46.640900;

    const locationParagraph = document.getElementById('location');
    const iconWeather = document.getElementById('icon_weather');

    const api_key = '3c98783f23b44423d06cd3607435ce4c';
    const base_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt_br&APPID=${api_key}`;

    fetch(base_url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
        locationParagraph.textContent = data.name;
        iconWeather.src = getIconAPI(data.weather[0].icon)
        console.log(data);
    })
    .catch(error => {
      console.error('Erro ao fazer a requisição:', error);
    });
}


function getIconAPI(id_icon){
    base_url_icon = `https://openweathermap.org/img/wn/${id_icon}.png`
    return base_url_icon
}

