function cityName(event) {
  event.preventDefault();
  let input = document.querySelector("#newCity");
  let city = document.querySelector("#city");
  city.innerHTML = input.value;

  let newCity = input.value;
  let units = "metric";
  let apiKey = "73aa23218a979a57aac07ba4ab59beb9";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(showTemp);
}

let form = document.querySelector("form");
form.addEventListener("submit", cityName);

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let newTemp = document.querySelector("#temp");
  newTemp.innerHTML = temp;
}

///
function clickedButton() {
  function getPosition(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units = "metric";

    function showLocationTemp(response) {
      let locTemp = Math.round(response.data.main.temp);
      let newLocTemp = document.querySelector("#temp");
      newLocTemp.innerHTML = locTemp;

      let currentCity = response.data.name;
      let currentCityLoc = document.querySelector("#city");
      currentCityLoc.innerHTML = currentCity;
    }

    axios
      .get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`)
      .then(showLocationTemp);
  }

  let apiKey = "73aa23218a979a57aac07ba4ab59beb9";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

  navigator.geolocation.getCurrentPosition(getPosition);
}

let element = document.querySelector("button");
element.addEventListener("click", clickedButton);
