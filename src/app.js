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
function getWeatherData(city) {
  let apiKey = "5332bf2a40c7e9tc684f12abo0f0ab54";
  let apiUrl = "https://api.shecodes.io/weather/v1/current?";
  axios.get(`${apiUrl}query=${city}&key=${apiKey}`).then(showCurrentWeather);
  axios.get(`${apiUrl}query=${city}&key=${apiKey}`).then(getTimeData);
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
  axios
    .get(`${apiUrl}&lat=${latitude}&lon=${longitude}&key=${apiKey}`)
    .then(showCurrentWeather);
  axios
    .get(`${apiUrl}&lat=${latitude}&lon=${longitude}&key=${apiKey}`)
    .then(getTimeData);
}
let dropDownButton = document.querySelector("#drop-down-button");
dropDownButton.addEventListener("click", openDropDown);

let closeDropDownButton = document.querySelector("#close-drop-down-button");
closeDropDownButton.addEventListener("click", closeDropDown);

let geoLocationButton = document.querySelector("#current-location-button");
geoLocationButton.addEventListener("click", getGeoLocation);

let city = "Greater Sudbury";

getWeatherData(`${city}`);
