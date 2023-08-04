function openDropDown(event) {
  event.preventDefault();
  let dropDown = document.querySelector("#drop-down-section");
  dropDown.classList.remove("hidden");
  dropDownButton.classList.add("hidden");
}
function closeDropDown(event) {
  event.preventDefault();
  let dropDown = document.querySelector("#drop-down-section");
  dropDown.classList.add("hidden");
  dropDownButton.classList.remove("hidden");
}
function showCurrentWeather(response) {
  console.log(response);
  let currentCity = document.querySelector("#current-city");
  let currentCountry = document.querySelector("#current-country");
  let currentTemp = document.querySelector("#current-temp");
  let currentFeelsLike = document.querySelector("#current-feels-like");
  let currentHumidity = document.querySelector("#current-humidity");
  let currentWindSpeed = document.querySelector("#current-wind-speed");
  currentCity.innerHTML = `${response.data.city},`;
  currentCountry.innerHTML = response.data.country;
  currentTemp.innerHTML = `${Math.round(response.data.temperature.current)}°`;
  currentFeelsLike.innerHTML = Math.round(response.data.temperature.feels_like);
  currentHumidity.innerHTML = response.data.temperature.humidity;
  currentWindSpeed.innerHTML = Math.round(response.data.wind.speed);
}

let dropDownButton = document.querySelector("#drop-down-button");
dropDownButton.addEventListener("click", openDropDown);

let closeDropDownButton = document.querySelector("#close-drop-down-button");
closeDropDownButton.addEventListener("click", closeDropDown);

let apiKey = "5332bf2a40c7e9tc684f12abo0f0ab54";
let apiUrl = "https://api.shecodes.io/weather/v1/current?";

let city = "Greater Sudbury";

axios.get(`${apiUrl}&query=${city}&key=${apiKey}`).then(showCurrentWeather);
