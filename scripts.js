// Elements
const api_key = '3c98783f23b44423d06cd3607435ce4c';

const btExternalLocation = document.querySelector("#getExternalLocation")
const btGetMyLocation = document.querySelector("#getMyLocation");
const txtExternalCity = document.querySelector("#externalCity");
const currentDate = document.querySelector("#currentDate");

const locationParagraph = document.getElementById('location');
const iconWeather = document.getElementById('icon_weather');
const temp = document.getElementById('temperatura');
const temp_min = document.getElementById('temperatura_min');
const temp_max = document.getElementById('temperatura_max');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const speed = document.getElementById('speed');

//Functions
function callWeatherAPI(url){
    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
        locationParagraph.textContent = data.name;
        iconWeather.src = getIconAPI(data.weather[0].icon);
        temp.textContent = `${parseInt(data.main.temp)} °C`;
        temp_min.textContent = `${parseInt(data.main.temp_min)} °C`;
        temp_max.textContent = `${parseInt(data.main.temp_max)} °C`;
        description.textContent = data.weather[0].description;
        humidity.textContent = `${data.main.humidity}%`
        speed.textContent = `${data.wind.speed} km/h`
        // console.log(data);
        const currentDate = document.querySelector("#currentDate");
        const dataAtual = new Date();
        const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        const diaSemana = diasSemana[dataAtual.getDay()];
        const dia = dataAtual.getDate();
        const mes = meses[dataAtual.getMonth()];
        const ano = dataAtual.getFullYear();
        const dataFormatada = `${diaSemana} ${dia} de ${mes} de ${ano}`;
        currentDate.textContent = dataFormatada;
    })
    .catch(error => {
      console.error('Erro ao fazer a requisição:', error);
    });
}

function getIconAPI(id_icon){
    base_url_icon = `https://openweathermap.org/img/wn/${id_icon}.png`
    return base_url_icon
}

//Events
btGetMyLocation.addEventListener("click", (e) => {
  e.preventDefault();
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const base_url_mylocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt_br&units=metric&APPID=${api_key}`;
      callWeatherAPI(base_url_mylocation);

    }, function(error) {
      console.error('Erro ao obter a localização:', error.message);
    });
  } else {
    console.error('Geolocalização não suportada pelo navegador.');
  }
})

btExternalLocation.addEventListener("click", (e) =>{
  e.preventDefault();
  const city = txtExternalCity.value;
  if(city != ""){
    const base_url_externallocation = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt_br&units=metric&APPID=${api_key}`;
    callWeatherAPI(base_url_externallocation)
  }else{
    alert('Preencha com uma cidade')
  }

})

