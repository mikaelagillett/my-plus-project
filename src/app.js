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
  getCity(response.data.city);
}
function getTimeData(response) {
  let latitude = response.data.coordinates.latitude;
  let longitude = response.data.coordinates.longitude;
  let apiKey = "CQESC99IXFQ0";
  let apiUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`;

  axios.get(apiUrl).then(showTime);
  axios.get(apiUrl).then(getForecastDays);
  getForecastData([currentCityData, currentUnitData]);
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
  getUnit(unit);
}
function searchCity(response) {
  response.preventDefault();
  let city = document.querySelector("#city-search-bar");
  getWeatherData([city.value, currentUnitData]);
  getForecastData([city.value, currentUnitData]);
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
    currentSecondaryColor = "secondary-color-clear";
    inactiveLink.className = `inactive ${currentSecondaryColor}`;
    descriptionElement.className = `description ${currentSecondaryColor}`;
  } else if (description.includes("clouds" || "cloudy")) {
    mainIcon.className = "wi wi-cloudy";
    background.style.backgroundImage = `url("src/images/clouds.jpg")`;
    currentSecondaryColor = "secondary-color-cloudy";
    inactiveLink.className = `inactive ${currentSecondaryColor}`;
    descriptionElement.className = `description ${currentSecondaryColor}`;
  } else if (description.includes("rain")) {
    mainIcon.className = "wi wi-raindrops";
    background.style.backgroundImage = `url("src/images/rain.jpg")`;
    currentSecondaryColor = "secondary-color-rain";
    inactiveLink.className = `inactive ${currentSecondaryColor}`;
    descriptionElement.className = `description ${currentSecondaryColor}`;
  } else if (description === "thunderstorm") {
    mainIcon.className = "wi wi-lightning";
    background.style.backgroundImage = `url("src/images/thunderstorm.jpg")`;
    currentSecondaryColor = "secondary-color-thunderstorm";
    inactiveLink.className = `inactive ${currentSecondaryColor}`;
    descriptionElement.className = `description ${currentSecondaryColor}`;
  } else if (description === "snow") {
    mainIcon.className = "wi wi-snowflake";
    background.style.backgroundImage = `url("src/images/snow.jpg")`;
    currentSecondaryColor = "secondary-color-snow";
    inactiveLink.className = `inactive ${currentSecondaryColor}`;
    descriptionElement.className = `description ${currentSecondaryColor}`;
  } else if (description === "mist") {
    mainIcon.className = "wi wi-fog";
    background.style.backgroundImage = `url("src/images/foggy-weather.jpg")`;
    currentSecondaryColor = "secondary-color-mist";
    inactiveLink.className = `inactive ${currentSecondaryColor}`;
    descriptionElement.className = `description ${currentSecondaryColor}`;
  } else {
    mainIcon.className = "wi wi-cloudy";
    background.style.backgroundImage = `url("src/images/foggy-weather.jpg")`;
    currentSecondaryColor = "secondary-color-mist";
    inactiveLink.className = `inactive ${currentSecondaryColor}`;
    descriptionElement.className = `description ${currentSecondaryColor}`;
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
function getForecastData(data) {
  let city = data[0];
  let unit = data[1];
  let apiKey = "5332bf2a40c7e9tc684f12abo0f0ab54";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let forecastSection = document.querySelector("#forecast");
  let forecastHTML = `<hr />`;
  let forecastDays = response.data.daily;
  forecastDays.forEach(function (forecast, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `<div class="col-5">
            <span class="forecast-day" id="forecast-day"
              >${getDay(index)} <br />
              <span class="forecast-date ${currentSecondaryColor}" id="forecast-date"
                >${getDate(index)}</span
              >
            </span>
          </div>
          <div class="col-4"></div>
          <div class="forecast-weather col-3">
            <span class="forecast-temp" id="forecast-temp">${Math.round(
              forecast.temperature.day
            )}°</span>
            <span>${getIcon(forecast.condition.description)}</span>
          </div>
          <hr />`;
    }
  });
  forecastSection.innerHTML = forecastHTML;
}
function getForecastDays(response) {
  let fullDate = new Date(response.data.formatted);
  let day = fullDate.getDay();
  let month = fullDate.getMonth();
  let year = fullDate.getFullYear();
  let date = fullDate.getDate();
  currentDay = day;
  currentMonth = month;
  currentYear = year;
  currentDate = date;
  getForecastData([currentCityData, currentUnitData]);
}
function getDay(day) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  day = day + 1;
  if (currentDay + day > 7) {
    forecastDayOfTheWeek = days[day];
    return `${forecastDayOfTheWeek}`;
  } else {
    forecastDayOfTheWeek = days[currentDay + day];
    return `${forecastDayOfTheWeek}`;
  }
}
function getDate(day) {
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
  day = day + 1;
  monthsThirtyOne = [0, 2, 4, 6, 7, 9, 11];
  monthsThirty = [3, 5, 8, 10];
  if (currentDate + day > 31 && monthsThirtyOne.includes(currentMonth)) {
    forecastDate = day;
    if (currentMonth === 11) {
      forecastMonth = months[0];
      forecastYear = currentYear + 1;
    } else {
      forecastMonth = months[currentMonth + 1];
      forecastYear = currentYear;
    }
  } else if (currentDay + day > 30 && monthsThirty.includes(currentMonth)) {
    forecastDate = day;
    forecastMonth = months[currentMonth + 1];
    forecastYear = currentYear;
  } else if (currentDay + day > 28 && currentMonth === 1) {
    forecastDate = day;
    forecastMonth = months[currentMonth + 1];
    forecastYear = currentYear;
  } else {
    forecastDate = currentDate + day;
    forecastMonth = months[currentMonth];
    forecastYear = currentYear;
  }
  let forecastSuffix = getSuffix(forecastDate);
  return `${forecastMonth} ${forecastDate}${forecastSuffix}, ${forecastYear}`;
}
function getIcon(description) {
  if (description === "clear sky") {
    return `<i class="wi wi-day-sunny"></i>`;
  } else if (description.includes("clouds" || "cloudy")) {
    return `<i class="wi wi-cloudy"></i>`;
  } else if (description.includes("rain")) {
    return `<i class="wi wi-raindrops"></i>`;
  } else if (description === "thunderstorm") {
    return `<i class="wi wi-lightning"></i>`;
  } else if (description === "snow") {
    return `<i class="wi wi-snowflake"></i>`;
  } else if (description === "mist") {
    return `<i class="wi wi-fog"></i>`;
  } else {
    return `<i class="wi wi-cloudy"></i>`;
  }
}
let currentCityData = "Greater Sudbury";
let currentUnitData = "metric";
let currentDay = "";
let currentDate = "";
let currentMonth = "";
let currentYear = "";
let currentSecondaryColor = "";
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
