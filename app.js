function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class = "row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            <div class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" width="42"/>
            <div class="weather-forecast-temperature">
              <span class="weather-forecast-temperature-max"> ${Math.round(
                forecastDay.temp.max
              )} </span>
              <span class="weather-forecast-temperature-min"> ${Math.round(
                forecastDay.temp.min
              )} </span>
            </div>
          </div>
        
`;
    }
  });

  // do a concatenation!
  //leave the string empty. js will read it as, hey, leave the string empty and make it below

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
//remember! innerHTML accepts HTML, so c/p the
//HTML code that we need to duplicate for our forecast in here:

//okay, so it's injected once, now how do I duplicate this?!
//do not c/p! It will not append it on. It will just replace what is there.
//use a loop! make a new var above to store the HTML of the forecast.

function getForecast(coordinates) {
  let apiKey = "0aa51f2ae72d62c67ab574237edb123f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  //just storing this here, we will need it later!
  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  cityElement.innerHTML = response.data.name;

  descriptionElement.innerHTML = response.data.weather[0].description;

  humidityElement.innerHTML = response.data.main.humidity;

  windElement.innerHTML = Math.round(response.data.wind.speed);

  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "0aa51f2ae72d62c67ab574237edb123f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

//these are the global variables down here:

//by calling celsiusTemperature in the function to displayFahrenheitTemperature:
//Instead of calling the celsius temp by a querySelector(which would multiply the temp with every call)
//This way, when the function runs as it is written this way, it will multiply the current
//celsius temp in the displayFahrenheitTemperature function.
//Now let's get it to add the celsius link back in!

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//it is best to call the search functions at the bottom. Find out why.
search("New York");
//It is good to put the functions at the top and then call them at the bottom
