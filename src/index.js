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

function search(city) {
  let units = "metric";
  let apiKey = "0ffeeb933d0b51c0bd7ob493d69aftd6";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(url).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#newCity");
  let city = document.querySelector("#city");
  city.innerHTML = cityInputElement.value;

  search(cityInputElement.value);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let celciusTemp = 0;
let originalTempInCelsius = 0;

function showTemp(response) {
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let newTemp = document.querySelector("#temp");
  let icon = document.querySelector("#weather-icon");
  let weatherDescription = document.querySelector("#weatherDescription");

  celciusTemp = Math.round(response.data.temperature.current);
  originalTempInCelsius = celciusTemp;
  newTemp.innerHTML = celciusTemp;
  humidity.innerHTML = response.data.temperature.humidity;
  wind.innerHTML = response.data.wind.speed;
  weatherDescription.innerHTML = response.data.condition.description;

  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  icon.setAttribute("alt", response.data.condition.description);
}

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", function () {
  let temp = document.querySelector("#temp");
  temp.innerHTML = originalTempInCelsius;
});

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", function () {
  let temp = document.querySelector("#temp");
  let fahrenheitTemp = Math.round((celciusTemp * 9) / 5 + 32);
  temp.innerHTML = fahrenheitTemp;
});

function clickedButton() {
  function getPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units = "metric";

    let currentCelciusTemp = 0;
    let currentFahrenheitTemp = 0;

    function showLocationTemp(response) {
      let newLocTemp = document.querySelector("#temp");
      newLocTemp.innerHTML = Math.round(response.data.temperature.current);

      let currentCityLoc = document.querySelector("#city");
      currentCityLoc.innerHTML = response.data.city;

      let currentHumidity = document.querySelector("#humidity");
      currentHumidity.innerHTML = response.data.temperature.humidity;

      let currentWind = document.querySelector("#wind");
      currentWind.innerHTML = response.data.wind.speed;

      let currentWeather = document.querySelector("#weatherDescription");
      currentWeather.innerHTML = response.data.condition.description;

      let currentIcon = document.querySelector("#weather-icon");
      currentIcon.setAttribute(
        "src",
        `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
      );
      currentIcon.setAttribute("alt", response.data.condition.description);

      currentCelciusTemp = Math.round(response.data.temperature.current);
      currentFahrenheitTemp = Math.round((currentCelciusTemp * 9) / 5 + 32);

      let currentTemp = document.querySelector("#temp");
      let currentCelcius = document.querySelector("#celcius");
      let currentFahrenheit = document.querySelector("#fahrenheit");

      currentCelcius.addEventListener("click", function () {
        currentTemp.innerHTML = currentCelciusTemp;
      });

      currentFahrenheit.addEventListener("click", function () {
        currentTemp.innerHTML = currentFahrenheitTemp;
      });
    }

    let apiKey = "0ffeeb933d0b51c0bd7ob493d69aftd6";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showLocationTemp);
  }

  navigator.geolocation.getCurrentPosition(getPosition);
}

let element = document.querySelector("button");
element.addEventListener("click", clickedButton);

search("Polokwane");
