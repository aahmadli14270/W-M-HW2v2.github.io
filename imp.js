"use strict";

const date3D = new Date();
const temp = new Date();
const tomorrow = new Date();

const tomorrowplus = new Date();
const tomorrowplusplus = new Date();
tomorrow.setDate(temp.getDate() + 1);
tomorrowplus.setDate(temp.getDate() + 2);
tomorrowplusplus.setDate(temp.getDate() + 3);

const searchbar = document.querySelector(".search-bar");
const searchbar1 = document.querySelector(".search-bar1");
const searchbutton = document.querySelector(".search");
const searchbutton1 = document.querySelector(".search1");
const herocurrent = document.querySelector(".hero-current");
const flexColumn = document.querySelector(".flex-columns-container");

let searchforAPI = "";

searchbutton1.addEventListener("click", (e) => {
  console.log("clicked");
  searchforAPI = searchbar1.value;
  let template = searchforAPI.replaceAll(" ", "+");
  console.log(searchforAPI.replaceAll(" ", "+"));

  flexColumn.classList.add("flex-columns-container-addup");
  flexColumn.classList.remove("flex-columns-container-before");
  flexColumn.innerHTML = `<div class="user-columns border-right main-weather-details"></div>
          <div
            class="user-columns border-right secondary-weather-details"
          ></div>
          <div class="user-columns" id="map"></div>
        </div>`;

  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${template}&key=AIzaSyBxhJWZ5Xs9C8gj2YkCgkQ6KUY31ZE7VYs`
  )
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      openWeatherCall(
        data.results[0].geometry.location.lat,
        data.results[0].geometry.location.lng
      );
      const map = L.map("map").setView(
        [
          data.results[0].geometry.location.lat,
          data.results[0].geometry.location.lng,
        ],
        6
      );

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([
        data.results[0].geometry.location.lat,
        data.results[0].geometry.location.lng,
      ])
        .addTo(map)
        .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
        .openPopup();
    })
    .catch(console.err);
});

searchbutton.addEventListener("click", (e) => {
  console.log("clicked");
  searchforAPI = searchbar.value;
  let template = searchforAPI.replaceAll(" ", "+");
  console.log(searchforAPI.replaceAll(" ", "+"));
  flexColumn.classList.add("flex-columns-container-addup");
  flexColumn.classList.remove("flex-columns-container-before");
  flexColumn.innerHTML = `<div class="user-columns border-right main-weather-details"></div>
          <div
            class="user-columns border-right secondary-weather-details"
          ></div>
          <div class="user-columns" id="map"></div>
        </div>`;

  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${template}&key=AIzaSyBxhJWZ5Xs9C8gj2YkCgkQ6KUY31ZE7VYs`
  )
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      openWeatherCall(
        data.results[0].geometry.location.lat,
        data.results[0].geometry.location.lng
      );
      const map = L.map("map").setView(
        [
          data.results[0].geometry.location.lat,
          data.results[0].geometry.location.lng,
        ],
        6
      );

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([
        data.results[0].geometry.location.lat,
        data.results[0].geometry.location.lng,
      ])
        .addTo(map)
        .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
        .openPopup();
    })
    .catch(console.err);
});

const flag = 0;
const monthNames = [
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

const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

console.log(date3D);

herocurrent.addEventListener("click", (e) => {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      flexColumn.classList.add("flex-columns-container-addup");
      flexColumn.classList.remove("flex-columns-container-before");
      flexColumn.innerHTML = `<div class="user-columns border-right main-weather-details"></div>
          <div
            class="user-columns border-right secondary-weather-details"
          ></div>
          <div class="user-columns" id="map"></div>
        </div>`;

      // console.log(position);
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(latitude, longitude);

      const map = L.map("map").setView([latitude, longitude], 6);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
        .openPopup();

      openWeatherCall(latitude, longitude);
      // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
    },
    function () {
      alert(
        "Couldn't get your current location... Please give location permission."
      );
    }
  );
});

function openWeatherCall(latitude, longitude) {
  let lat = latitude;
  let lon = longitude;
  let units = "metric";
  let lang = "en";
  let key = "5209b666803238e6492b0f84bb620f41";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;
  //let url = `https://api.openweathermap.org/data/2.5/onecall?lat=40.405520074042514&lon=49.844963102044325&appid=51a6bf5e7efb2ebbc1b35e2519d42ff1&units=metric&lang=en`;
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      weatherGenerator(data);
    })
    .catch(console.err);
}

function weatherGenerator(data) {
  const mainDetails = document.querySelector(".main-weather-details");

  let templateHTML = `
<img class = "cloud-img" src = "http://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png" alt = "${data.current.weather[0].description}">
  <p class = "property">humidity: ${data.current.humidity}</p>
  <p class = "property">pressure: ${data.current.pressure}</p>
  <p class = "property">sunrise: ${data.current.sunrise}</p>
  <p class = "property">timezone: ${data.timezone}</p>
  `;

  mainDetails.innerHTML = templateHTML;
  const secondaryDetails = document.querySelector(".secondary-weather-details");

  let templateHTMLsecondary = `

          <div class="day">
            <h1 class="date">${
              dayNames[tomorrow.getDay() - 1] +
              ", " +
              tomorrow.getDate() +
              " " +
              monthNames[tomorrow.getMonth()]
            }</h1>
            <div class="details">
              <!-- <p class="detail">Feels like 7°C. Light rain. Light breeze</p> -->
              <p class="detail">Humidity:  ${
                data.daily[tomorrow.getDay()].humidity
              }%</p>
              <p class="detail">Pressure: ${
                data.daily[tomorrow.getDay()].pressure
              } hPa</p>
              <p class="detail">Clouds: ${
                data.daily[tomorrow.getDay()].clouds
              }%</p>
              <p class="detail">Wind: ${
                data.daily[tomorrow.getDay()].wind_speed
              } m/s NNW</p>
              <!-- <p class="detail">UV: 0</p> -->
            </div>
            <div class="img-degree-container">
            <img class = "cloud-img" src = "http://openweathermap.org/img/wn/${
              data.daily[tomorrow.getDay()].weather[0].icon
            }@4x.png" alt = "${
    data.daily[tomorrow.getDay()].weather[0].description
  }"/>
<p class="temp">${Math.round(
    data.daily[tomorrow.getDay()].temp.day
  )} / ${Math.round(data.daily[tomorrow.getDay()].temp.night)} °C</p>
            </div>
          </div>
          <div class="day">
            <h1 class="date">${
              dayNames[tomorrowplus.getDay() - 1] +
              ", " +
              tomorrowplus.getDate() +
              " " +
              monthNames[tomorrowplus.getMonth()]
            }</h1>

            <div class="details">
              <!-- <p class="detail">Feels like 7°C. Light rain. Light breeze</p> -->
              <p class="detail">Humidity:  ${
                data.daily[tomorrowplus.getDay()].humidity
              }%</p>
              <p class="detail">Pressure: ${
                data.daily[tomorrowplus.getDay()].pressure
              } hPa</p>
              <p class="detail">Clouds: ${
                data.daily[tomorrowplus.getDay()].clouds
              }%</p>
              <p class="detail">Wind: ${
                data.daily[tomorrowplus.getDay()].wind_speed
              } m/s SSE</p>
            </div>
            <div class="img-degree-container">
            <img class = "cloud-img" src = "http://openweathermap.org/img/wn/${
              data.daily[tomorrowplus.getDay()].weather[0].icon
            }@4x.png" alt = "${
    data.daily[tomorrowplus.getDay()].weather[0].description
  }"/>
              <p class="temp">${Math.round(
                data.daily[tomorrowplus.getDay()].temp.day
              )} / ${Math.round(
    data.daily[tomorrowplus.getDay()].temp.night
  )} °C</p>
            </div>
          </div>

          <div class="day">
          <h1 class="date">${
            dayNames[tomorrowplusplus.getDay() - 1] +
            ", " +
            tomorrowplusplus.getDate() +
            " " +
            monthNames[tomorrowplusplus.getMonth()]
          }</h1>
          <div class="details">
            <!-- <p class="detail">Feels like 7°C. Light rain. Light breeze</p> -->
            <p class="detail">Humidity:  ${
              data.daily[tomorrowplusplus.getDay()].humidity
            }%</p>
            <p class="detail">Pressure: ${
              data.daily[tomorrowplusplus.getDay()].pressure
            } hPa</p>
            <p class="detail">Clouds: ${
              data.daily[tomorrowplusplus.getDay()].clouds
            }%</p>
            <p class="detail">Wind: ${
              data.daily[tomorrowplusplus.getDay()].wind_speed
            } m/s WSW</p>
            <!-- <p class="detail">UV: 0</p> -->
          </div>
          <div class="img-degree-container">
          <img class = "cloud-img" src = "http://openweathermap.org/img/wn/${
            data.daily[tomorrowplusplus.getDay()].weather[0].icon
          }@4x.png" alt = "${
    data.daily[tomorrowplusplus.getDay()].weather[0].description
  }"/>
<p class="temp">${Math.round(
    data.daily[tomorrowplusplus.getDay()].temp.day
  )} / ${Math.round(data.daily[tomorrowplusplus.getDay()].temp.night)} °C</p>
          </div>
        </div>

`;
  secondaryDetails.innerHTML = templateHTMLsecondary;
}

//
//   let units1 = "metric";
//   let lang1 = "en";
//   let key1 = "5209b666803238e6492b0f84bb620f41";
//   let url1 = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.results[0].geometry.location.lat}&lon=${data.results[0].geometry.location.lng}&appid=${key1}&units=${units1}&lang=${lang1}`;

//   fetch(url1)
//     .then((response) => {
//       if (!response.ok) throw new Error(response.statusText);
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       //weatherGenerator(data);
//     })
//     .catch(console.err);
// })

// AIzaSyBxhJWZ5Xs9C8gj2YkCgkQ6KUY31ZE7VYs

// WITH NAME
// fetch(
//   "https://maps.googleapis.com/maps/api/geocode/json?address=Berlin,+Germany&key=AIzaSyBxhJWZ5Xs9C8gj2YkCgkQ6KUY31ZE7VYs"
// )
//   .then((response) => {
//     if (!response.ok) throw new Error(response.statusText);
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//     openWeatherCall(
//       data.results[0].geometry.location.lat,
//       data.results[0].geometry.location.lng
//     );
//   })
//   .catch(console.err);
