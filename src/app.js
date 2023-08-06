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
function getWeatherData(data) {
  let apiKey = "5332bf2a40c7e9tc684f12abo0f0ab54";
  let apiUrl = "https://api.shecodes.io/weather/v1/current?";
  let city = data[0];
  let unit = data[1];
  axios
    .get(`${apiUrl}query=${city}&key=${apiKey}&units=${unit}`)
    .then(showCurrentWeather);
  axios
    .get(`${apiUrl}query=${city}&key=${apiKey}&units=${unit}`)
    .then(getTimeData);
  axios
    .get(`${apiUrl}query=${city}&key=${apiKey}&units=${unit}`)
    .then(getWeatherDesign);
  getCity(city);
  getUnit(unit);
}
function showCurrentWeather(response) {
  let currentCity = document.querySelector("#current-city");
  let currentCountry = document.querySelector("#current-country");
  let currentTemp = document.querySelector("#current-temp");
  let currentWeatherDescription = document.querySelector(
    "#weather-description"
  );
  let currentFeelsLike = document.querySelector("#current-feels-like");
  let currentHumidity = document.querySelector("#current-humidity");
  let currentWindSpeed = document.querySelector("#current-wind-speed");

  currentCity.innerHTML = `${response.data.city},`;
  currentCountry.innerHTML = response.data.country;
  currentTemp.innerHTML = `${Math.round(response.data.temperature.current)}°`;
  currentWeatherDescription.innerHTML = response.data.condition.description;
  currentFeelsLike.innerHTML = Math.round(response.data.temperature.feels_like);
  currentHumidity.innerHTML = response.data.temperature.humidity;
  currentWindSpeed.innerHTML = Math.round(response.data.wind.speed);
}
function getTimeData(response) {
  let latitude = response.data.coordinates.latitude;
  let longitude = response.data.coordinates.longitude;
  let apiKey = "6TJ220JA0JSG";
  let apiUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`;

  axios.get(apiUrl).then(showTime);
}
function showTime(response) {
  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = formatTime(response.data.formatted);
}
function formatTime(timestamp) {
  let fullDate = new Date(timestamp);
  let hours = fullDate.getHours();
  let minutes = fullDate.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[fullDate.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[fullDate.getMonth()];
  let date = fullDate.getDate();
  let suffix = getSuffix(date);

  return `${day}, ${month} ${date}${suffix} ${hours}:${minutes}`;
}
function getSuffix(date) {
  if (date === 1 || date === 21 || date === 31) {
    return "st";
  } else if (date === 2 || date === 22) {
    return "nd";
  } else if (date === 3 || date === 23) {
    return "rd";
  } else {
    return "th";
  }
}
function getGeoLocation() {
  navigator.geolocation.getCurrentPosition(getGeoWeatherData);
}
function getGeoWeatherData(response) {
  let apiKey = "5332bf2a40c7e9tc684f12abo0f0ab54";
  let apiUrl = "https://api.shecodes.io/weather/v1/current?";
  let latitude = response.coords.latitude;
  let longitude = response.coords.longitude;
  let unit = currentUnitData;
  axios
    .get(
      `${apiUrl}&lat=${latitude}&lon=${longitude}&key=${apiKey}&units=${unit}`
    )
    .then(showCurrentWeather);
  axios
    .get(
      `${apiUrl}&lat=${latitude}&lon=${longitude}&key=${apiKey}&units=${unit}`
    )
    .then(getTimeData);
  axios
    .get(
      `${apiUrl}&lat=${latitude}&lon=${longitude}&key=${apiKey}&units=${unit}`
    )
    .then(getWeatherDesign);
}
function searchCity(response) {
  response.preventDefault();
  let city = document.querySelector("#city-search-bar");
  getWeatherData([city.value, currentUnitData]);
}
function getWeatherDesign(response) {
  let description = response.data.condition.description;
  let background = document.querySelector(".background");
  let mainIcon = document.querySelector("#main-icon");
  let inactiveLink = document.querySelector(".inactive");
  let descriptionElement = document.querySelector("#description");
  if (description === "clear sky") {
    mainIcon.className = "wi wi-day-sunny";
    background.style.backgroundImage = `url("src/images/clear.jpg")`;
    inactiveLink.className = "inactive secondary-color-clear";
    descriptionElement.className = "description secondary-color-clear";
  } else if (
    description === "few clouds" ||
    description === "scattered clouds" ||
    description === "broken clouds"
  ) {
    mainIcon.className = "wi wi-cloudy";
    background.style.backgroundImage = `url("src/images/clouds.jpg")`;
    inactiveLink.className = "inactive secondary-color-cloudy";
    descriptionElement.className = "description secondary-color-cloudy";
  } else if (description === "shower rain" || description === "rain") {
    mainIcon.className = "wi wi-raindrops";
    background.style.backgroundImage = `url("src/images/rain.jpg")`;
    inactiveLink.className = "inactive secondary-color-rain";
    descriptionElement.className = "description secondary-color-rain";
  } else if (description === "thunderstorm") {
    mainIcon.className = "wi wi-lightning";
    background.style.backgroundImage = `url("src/images/thunderstorm.jpg")`;
    inactiveLink.className = "inactive secondary-color-thunderstorm";
    descriptionElement.className = "description secondary-color-thunderstorm";
  } else if (description === "snow") {
    mainIcon.className = "wi wi-snowflake";
    background.style.backgroundImage = `url("src/images/snow.jpg")`;
    inactiveLink.className = "inactive secondary-color-snow";
    descriptionElement.className = "description secondary-color-snow";
  } else {
    mainIcon.className = "wi wi-fog";
    background.style.backgroundImage = `url("src/images/foggy-weather.jpg")`;
    inactiveLink.className = "inactive secondary-color-mist";
    descriptionElement.className = "description secondary-color-mist";
  }
}
function celciusClick() {
  celciusLink.classList.remove("inactive");
  farenheitLink.classList.add("inactive");
  farenheitLink.classList.add(`${celciusClasses}`);
  celciusLink.classList.remove(`${celciusClasses}`);
  celciusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let unit = "metric";
  getWeatherData([currentCityData, unit]);
}
function farenheitClick() {
  farenheitLink.classList.remove("inactive");
  celciusLink.classList.add("inactive");
  celciusLink.classList.add(`${farenheitClasses}`);
  farenheitLink.classList.remove(`${farenheitClasses}`);
  celciusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let unit = "imperial";
  getWeatherData([currentCityData, unit]);
}
function getUnit(unit) {
  if (unit === "°C") {
    currentUnitData = "metric";
  } else if (unit === "°F") {
    currentUnitData = "imperial";
  } else {
    currentUnitData = unit;
  }
}
function getCity(city) {
  currentCityData = city;
}
let currentCityData = "Greater Sudbury";
let currentUnitData = "metric";
getWeatherData([currentCityData, currentUnitData]);

let dropDownButton = document.querySelector("#drop-down-button");
dropDownButton.addEventListener("click", openDropDown);

let closeDropDownButton = document.querySelector("#close-drop-down-button");
closeDropDownButton.addEventListener("click", closeDropDown);

let geoLocationButton = document.querySelector("#current-location-button");
geoLocationButton.addEventListener("click", getGeoLocation);

let search = document.querySelector("#search-form");
search.addEventListener("submit", searchCity);

let celciusLink = document.querySelector("#celcius-link");
let farenheitLink = document.querySelector("#farenheit-link");
let farenheitClasses = farenheitLink.classList;
let celciusClasses = celciusLink.classList;
celciusLink.addEventListener("click", celciusClick);
farenheitLink.addEventListener("click", farenheitClick);
