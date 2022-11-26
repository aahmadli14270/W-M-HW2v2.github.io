"use strict";
navigator.geolocation.getCurrentPosition(
  function (position) {
    // console.log(position);
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(latitude, longitude);

    const map = L.map("map").setView([latitude, longitude], 6);

    L.tileLayer(
      "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(map);

    L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
      .openPopup();
  },
  function () {
    alert(
      "Couldn't get your current location... Please give location permission."
    );
  }
);
