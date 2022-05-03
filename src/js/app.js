import * as helperFunctions from "./helpers.js";
window.addEventListener("load", () => {
    const {geolocation} = navigator;
    if (geolocation) {
        geolocation.getCurrentPosition(datas => {
            const {latitude, longitude} = datas.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=50a2062bcfb77a128cf34032800850f3&units=metric`;

            fetch(url)
                .then(resposne => {
                    if (!resposne.ok && resposne.status !== 200) {
                        return Promise.reject(resposne);
                    }
                    return resposne.json();
                })
                .then(data => {
                    const {main, name, weather} = data;
                    console.log(main, name, weather);
                    const [conditions] = weather;
                    const src = `http://openweathermap.org/img/wn/${conditions.icon}.png`

                    const cityName = helperFunctions.getSelector("#cityName");
                    const temp = helperFunctions.getSelector("#temp");
                    const icon = helperFunctions.getSelector("#icon");
                    const description = helperFunctions.getSelector("#description");
                    
                    cityName.innerHTML = name;
                    temp.innerHTML = Math.round(main.temp);
                    description.innerHTML = conditions.main;
                    icon.src = src;
                })
                .catch(error => console.log(error.status))
        });
    } else {
        console.log("not success");
    }
})