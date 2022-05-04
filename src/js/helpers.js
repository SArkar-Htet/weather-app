const getSelector = selector => document.querySelector(selector);

const getCurrentWeather = (datas) => {
    console.log(datas);
    let url;
    if (typeof datas == "object") {
        const {latitude, longitude} = datas.coords;
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=50a2062bcfb77a128cf34032800850f3&units=metric`;
    } else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${datas}&appid=50a2062bcfb77a128cf34032800850f3&units=metric`;
    }
    const cityName = getSelector("#cityName");
    const temp = getSelector("#temp");
    const icon = getSelector("#icon");
    const description = getSelector("#description");

    fetch(url)
        .then(resposne => {
            if (!resposne.ok && resposne.status !== 200) {
                return Promise.reject(resposne);
            }
            return resposne.json();
        })
        .then(data => {
            const {main, name, weather} = data;
            const [conditions] = weather;
            const src = `http://openweathermap.org/img/wn/${conditions.icon}.png`
            console.log(data);
        
            cityName.innerHTML = name;
            temp.innerHTML = Math.round(main.temp);
            description.innerHTML = conditions.main;
            icon.src = src;
        })
        .catch(error => console.log(error.status));
}

// const getCityWeather = (city) => {
//     console.log(city);
// }

export {getSelector, getCurrentWeather};