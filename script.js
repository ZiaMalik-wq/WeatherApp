const apiKey = "REMOVED";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const cityName = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind");
const errorBox = document.querySelector(".error");
const weatherBox = document.querySelector(".weather");

const setWeatherIcon = (condition) => {
    const icons = {
        Clouds: "clouds.png",
        Clear: "clear.png",
        Rain: "rain.png",
        Drizzle: "drizzle.png",
        Mist: "mist.png",
        Snow: "snow.png",
    };
    const icon = icons[condition] || "clear.png";
    weatherIcon.src = `images/${icon}`;
};

async function checkWeather(city) {
    try {
        if (!city) throw new Error("Please enter a city name.");

        const response = await fetch(apiURL + city + `&appid=${apiKey}`);
        if (!response.ok) throw new Error("City not found.");

        const data = await response.json();

        cityName.textContent = data.name;
        temperature.textContent = Math.round(data.main.temp) + "°C";
        humidity.textContent = data.main.humidity + "%";
        windSpeed.textContent = data.wind.speed + " km/h";
        setWeatherIcon(data.weather[0].main);

        weatherBox.style.display = "block";
        errorBox.style.display = "none";
    } catch (error) {
        errorBox.style.display = "block";
        errorBox.querySelector("p").textContent = error.message;
        weatherBox.style.display = "none";
    }
}

searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});

searchBox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value.trim());
    }
});
