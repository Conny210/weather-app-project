let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = now.getDay();
let currentDay = days[day];

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dateTime = `${currentDay} ${hour}:${minutes}`;

let date = document.querySelector("#date");
date.innerHTML = `${dateTime}`;

function tempFarhenheit(params) {
  let temp = document.querySelector("#temp");
  temp.innerHTML = "46";
}
let farhenheit = document.querySelector("#farhenheit");
farhenheit.addEventListener("click", tempFarhenheit);

function tempCelcius(params) {
  let temp = document.querySelector("#temp");
  temp.innerHTML = "8";
}
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", tempCelcius);

function cityName(event) {
  event.preventDefault();
  let input = document.querySelector("#newCity");
  let city = document.querySelector("#city");

  city.innerHTML = input.value;

  let newCity = input.value;
  let units = "metric";
  let apiKey = "0ffeeb933d0b51c0bd7ob493d69aftd6";
  let url = `https://api.shecodes.io/weather/v1/current?query=${newCity}&key=${apiKey}&units=${units}`;
  axios.get(url).then(showTemp);
}

let form = document.querySelector("form");
form.addEventListener("submit", cityName);

function showTemp(response) {
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");  
  let newTemp = document.querySelector("#temp");
  let icon = document.querySelector("#weather-icon");
  let weatherDescription = document.querySelector("#weatherDescription");

  humidity.innerHTML = response.data.daily.temperature.humidity;
  wind.innerHTML = response.data.daily.wind.speed;
  weatherDescription.innerHTML = response.data.daily.condition.description;
  
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily.condition.icon}.png`
  );
  icon.setAttribute("alt", response.data.daily.condition.description);
  

  let temp = Math.round(response.data.temperature.current);
 
  newTemp.innerHTML = temp;
}

function clickedButton() {
  function getPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units = "metric";

    function showLocationTemp(response) {
      let locTemp = Math.round(response.data.temperature.current);
      let newLocTemp = document.querySelector("#temp");
      newLocTemp.innerHTML = locTemp;

      let currentCity = response.data.city;
      let currentCityLoc = document.querySelector("#city");
      currentCityLoc.innerHTML = currentCity;
    }
    let apiKey = "0ffeeb933d0b51c0bd7ob493d69aftd6";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showLocationTemp);
  }

  navigator.geolocation.getCurrentPosition(getPosition);
}

let element = document.querySelector("button");
element.addEventListener("click", clickedButton);
