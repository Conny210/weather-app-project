// Format timestamp to a readable date and time string
function currentDate(time) {
  const date = new Date(time);
  const formattedHours = (date.getHours() < 10 ? "0" : "") + date.getHours();
  const formattedMinutes =
    (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[date.getDay()];
  return `${dayOfWeek} ${formattedHours}:${formattedMinutes}`;
}

// Display weather data on the webpage
function displayTemperature(response) {
  const temperatureElement = document.querySelector("#temperature");
  const cityElement = document.querySelector("#city");
  const descriptionElement = document.querySelector("#description");
  const humidityElement = document.querySelector("#humidity");
  const windElement = document.querySelector("#wind");
  const dateElement = document.querySelector("#date");
  const iconElement = document.querySelector("#icon");

  const celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  const iconUrl = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  iconElement.setAttribute("src", iconUrl);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// Fetch weather data for a given city
function fetchWeather(city) {
  const units = "metric";
  const apiKey = "73aa23218a979a57aac07ba4ab59beb9";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

// Handle form submission
function handleSubmit(event) {
  event.preventDefault();
  const cityInputElement = document.querySelector("#newCity");
  fetchWeather(cityInputElement.value);
}

// Convert temperature to Fahrenheit
function fahrenheitTemp(event) {
  event.preventDefault();
  const temperatureElement = document.querySelector("#temp");
  const fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}

// Convert temperature back to Celsius
function celsiusTemp(event) {
  event.preventDefault();
  const temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}

// Global variables
let celsiusTemperature = null;
const form = document.querySelector("#search");
const tempFahrenheit = document.querySelector("#fahrenheit");
const tempCelsius = document.querySelector("#celsius");

// Event listeners
form.addEventListener("submit", handleSubmit);
tempFahrenheit.addEventListener("click", displayFahrenheitTemperature);
tempCelsius.addEventListener("click", displayCelsiusTemperature);

// Initial search
search("Randburg");

// Current location button
function clickedButton() {
  function getPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const units = "metric";
    const apiKey = "73aa23218a979a57aac07ba4ab59beb9";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

    function showLocationTemp(response) {
      const locTemp = Math.round(response.data.main.temp);
      const newLocTemp = document.querySelector("#temp");
      newLocTemp.innerHTML = locTemp;

      const currentCity = response.data.name;
      const currentCityLoc = document.querySelector("#city");
      currentCityLoc.innerHTML = currentCity;
    }

    axios
      .get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`)
      .then(showLocationTemp);
  }

  navigator.geolocation.getCurrentPosition(getPosition);
}

const element = document.querySelector("button");
element.addEventListener("click", clickedButton);
