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

function formatDate(dateDay) {
  let date = new Date(dateDay * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index <= 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weatherForecastDate">${formatDate(forecastDay.time)}</div>
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          alt=""
          width="42"
        />
        <div class="weatherForecastTemps">
          <span class="weatherForecastMaxTemp"> ${Math.round(
            forecastDay.temperature.maximum
          )}° </span>
          <span class="weatherForecastMinTemp"> ${Math.round(
            forecastDay.temperature.minimum
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

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

function getForecast(city) {
  let units = "metric";
  let apiKey = "0ffeeb933d0b51c0bd7ob493d69aftd6";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}
getForecast();

function initialLoad(params) {
  let initialSearch = "Polokwane";
  let city = document.querySelector("#city");
  city.innerHTML = initialSearch;

  search(initialSearch);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function showTemp(response) {
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let newTemp = document.querySelector("#temp");
  let icon = document.querySelector("#weather-icon");
  let weatherDescription = document.querySelector("#weatherDescription");
  let city = document.querySelector("#city");

  newTemp.innerHTML = Math.round(response.data.temperature.current);
  humidity.innerHTML = response.data.temperature.humidity;
  wind.innerHTML = response.data.wind.speed;
  weatherDescription.innerHTML = response.data.condition.description;
  city.innerHTML = response.data.city;

  getForecast(response.data.city);

  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  icon.setAttribute("alt", response.data.condition.description);
}

function clickedButton() {
  function getPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units = "metric";
    let apiKey = "0ffeeb933d0b51c0bd7ob493d69aftd6";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showTemp);
  }

  navigator.geolocation.getCurrentPosition(getPosition);
}

let element = document.querySelector("button");
element.addEventListener("click", clickedButton);

initialLoad();
displayForecast();
