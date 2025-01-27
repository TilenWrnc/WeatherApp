const input = document.querySelector("#user-input");
const btn = document.querySelector(".submit-button");
const leftSide = document.querySelector(".left-side");
const rightSide = document.querySelector("#right-side");
const futureWeather = document.querySelectorAll(".future-weather")
const weatherIcon = document.querySelector(".weather-icon");

async function getData() {
    let userinput = await input.value;
    if (userinput == "") {
        alert("Please type in the city!")
    } else {
        console.log(userinput);
    const data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userinput}?key=FLHRMDNCYW59F4MLDHZSWRYHC`, {mode: 'cors'});
    const dataJson = await data.json();
    console.log(dataJson);
    console.log(dataJson.currentConditions.conditions);
    return dataJson;
    }
}   

const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
let currentDate = new Date();
let day = days[currentDate.getDay()];
let month = months[currentDate.getMonth()];
let year = currentDate.getFullYear();
let futureDay = currentDate.getDay();
let dayTracker = 1;


function displayItems(dataJson) {
    leftSide.innerHTML = `
        <p class="location">${dataJson.resolvedAddress.toUpperCase()}</p>
        <p>${day}, ${month} ${year}</p>
        <p class="temp"> <i class="fa-solid fa-temperature-full"></i> ${Math.ceil((dataJson.currentConditions.temp  - 32) / 1.8)} °C</p>
        <p>${dataJson.currentConditions.conditions.toUpperCase()}</p>
        <p><i class="fa-solid fa-wind"></i> ${Math.ceil(dataJson.currentConditions.windspeed * 1.609)} KM/H</p>
        <p>HUMIDITY: ${Math.ceil(dataJson.currentConditions.humidity)} %</p>
    `;
    leftSide.style.background = "linear-gradient(to right, rgb(116, 184, 230), rgb(108, 196, 247))"

    if (dataJson.currentConditions.conditions == "Clear") {
        weatherIcon.src = "https://openweathermap.org/img/wn/01d@2x.png"
    }else if (dataJson.currentConditions.conditions == "Partially cloudy") {
        weatherIcon.src = "https://openweathermap.org/img/wn/02d@2x.png";
    }else if (dataJson.currentConditions.conditions == "Overcast") {
        weatherIcon.src = "https://openweathermap.org/img/wn/03d@2x.png";
    }else if (dataJson.currentConditions.conditions == "Rain, Partially cloudy") {
        weatherIcon.src = "https://openweathermap.org/img/wn/10d@2x.png";
    }else if (dataJson.currentConditions.conditions == "Thunderstorm") {
        weatherIcon.src = "https://openweathermap.org/img/wn/11d@2x.png";
    }else if (dataJson.currentConditions.conditions == "Snow") {
        weatherIcon.src = "https://openweathermap.org/img/wn/13d@2x.png";
    }
    weatherIcon.style.opacity = "1";
                          
}

btn.addEventListener("click", async () => {
    const dataJson = await getData();
    futureDay = currentDate.getDay();
    dayTracker = 1;
    displayItems(dataJson);

    futureWeather.forEach((futureForecast) => {
        if(futureDay < 6) {
            futureDay++;
        } else {
            futureDay = 0;
        }
        futureForecast.innerHTML = `
            <p>${days[futureDay]}</p>
            <p>${dataJson.days[dayTracker].conditions}</p>
            <p>${Math.ceil((dataJson.days[dayTracker].temp  - 32) / 1.8)} °C</p>
        `
        futureForecast.style.background = "linear-gradient(to right, rgb(55, 200, 236), rgb(108, 196, 247))";
        futureForecast.style.border = "1px solid blue";
        dayTracker++;

    })
});



