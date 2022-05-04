import * as helperFunctions from "./helpers.js";

const searchForm = helperFunctions.getSelector("#searchForm");
const searchInput = helperFunctions.getSelector("#searchInput");
const unit = helperFunctions.getSelector("#unit");

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

unit.addEventListener("click", () => {
    const temp = helperFunctions.getSelector("#temp");
    const mainTemp = Number(temp.innerHTML);
    let newTemp = mainTemp;
    const whichUnit =  unit.innerHTML.includes("C") ? "C" : "F";

    if (whichUnit === "C") {
        unit.innerHTML = "&deg;F";
        newTemp = Math.round((mainTemp * 9/5) + 32);
        console.log(unit);
    } else {
        unit.innerHTML = "&deg;C";
        newTemp = Math.round((mainTemp - 32) * 5/9);
    }

    temp.innerHTML = newTemp;
});