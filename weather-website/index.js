//Date&Time
function formatTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDay(date) {
  const dayArray = date.getDay();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const day = days[dayArray];
  return day;
}

//User's location
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // Call the function to get city based on coordinates
        getCityByCoordinates(latitude, longitude);
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser");
  }
}

//Geocoding
function getCityByCoordinates(latitude, longitude) {
  const apiKey = "ef06b1955aad345a9a78da03aca58d9f";
  const reverseGeocodingUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;

  axios.get(reverseGeocodingUrl)
    .then((response) => {
      const city = response.data[0].name;
      // Call the function to update weather info with the obtained city
      updateWeatherInfo(city);
    })
    .catch((error) => {
      console.error("Error getting city by coordinates:", error);
    });
}

//Weather update information for searched city
function updateWeatherInfo(city) {
  document.querySelector("#searched-city").innerHTML = city;
  searchCity(city);
}

// implementing search bar and api request
function displayWeatherInfo(response) {
  document.querySelector("#searched-city").innerHTML = response.data.name;
  const temperature = Math.round(response.data.main.temp);
  document.querySelector("#current-temperature").innerHTML = `${temperature}°`;
  const humidity = response.data.main.humidity;
  document.querySelector("#humidity").innerHTML = `${humidity}%`;
  const windSpeed = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = `${windSpeed}km/h`;
  document.querySelector("#weather-type").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  const apiKey = "ef06b1955aad345a9a78da03aca58d9f";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherInfo);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

const searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", handleSubmit);

// getting current time & day and displaying it
const currentTime = document.querySelector("#current-time");
const currentDay = document.querySelector("#current-day");

function updateDateTime() {
  let newCurrentTime = new Date();
  currentTime.innerHTML = formatTime(newCurrentTime);

  let newCurrentDay = new Date();
  currentDay.innerHTML = formatDay(newCurrentDay);

  // Call the function to get the user's location and set it as the default city
  getUserLocation();
}

// Call the function to update date and time
updateDateTime();
