import * as helperFunctions from "./helpers.js";

const searchForm = helperFunctions.getSelector("#searchForm");
const searchInput = helperFunctions.getSelector("#searchInput");
const cityName = helperFunctions.getSelector("#cityName");
const temp = helperFunctions.getSelector("#temp");
const icon = helperFunctions.getSelector("#icon");
const description = helperFunctions.getSelector("#description");

window.addEventListener("load", () => {
    const {geolocation} = navigator;
    if (geolocation) {
        geolocation.getCurrentPosition(datas => {
            helperFunctions.getCurrentWeather(datas);
        });
    }
});

searchForm.addEventListener("submit", (e) => {
    const city = searchInput.value;
    if (city.length > 1) {
        helperFunctions.getCurrentWeather(city);
    }
    e.preventDefault();
});