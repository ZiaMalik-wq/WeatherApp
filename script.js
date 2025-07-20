// API and Global State Variables
const apiKey = "136890a82f59013c0fc13e341aebcaa0";
const apiBaseURL = "https://api.openweathermap.org/data/2.5/weather?";

let currentUnit = "metric";
let lastSearch = { type: null, value: null };

// DOM Element Selectors
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search .search-btn");
const geoButton = document.querySelector(".search .geo-btn");
const weatherIcon = document.querySelector(".weather-icon");
const cityNameEl = document.querySelector(".city");
const temperatureEl = document.querySelector(".temp");
const humidityEl = document.querySelector(".humidity");
const windSpeedEl = document.querySelector(".wind");
const errorBox = document.querySelector(".error");
const weatherBox = document.querySelector(".weather");
const unitSwitch = document.querySelector("#unit-switch");
const unitLabels = document.querySelectorAll(".unit-label");

const setWeatherIcon = (condition) => {
    const icons = {
        Clouds: "clouds.png", Clear: "clear.png", Rain: "rain.png",
        Drizzle: "drizzle.png", Mist: "mist.png", Snow: "snow.png",
    };
    weatherIcon.src = `images/${icons[condition] || "clear.png"}`;
};

// Updates the UI with the fetched weather data
const updateUI = (data) => {
    const tempUnit = currentUnit === "metric" ? "°C" : "°F";
    const windUnit = currentUnit === "metric" ? "km/h" : "mph";

    cityNameEl.textContent = data.name;
    temperatureEl.textContent = `${Math.round(data.main.temp)}${tempUnit}`;
    humidityEl.textContent = `${data.main.humidity}%`;
    windSpeedEl.textContent = `${data.wind.speed} ${windUnit}`;
    setWeatherIcon(data.weather[0].main);

    weatherBox.style.display = "block";
    errorBox.style.display = "none";
    localStorage.setItem("lastCity", data.name);
};

const showError = (message) => {
    errorBox.querySelector("p").textContent = message;
    errorBox.style.display = "block";
    weatherBox.style.display = "none";
};

async function fetchWeatherData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.status === 404 ? "Location not found." : "An error occurred.");
        }
        const data = await response.json();
        updateUI(data);
        return data;
    } catch (error) {
        showError(error.message);
        return null; 
    }
}

async function getWeatherByCity(city) {
    if (!city) {
        showError("Please enter a city name.");
        return;
    }
    const url = `${apiBaseURL}q=${city}&units=${currentUnit}&appid=${apiKey}`;
    const data = await fetchWeatherData(url);
    if (data) {
        lastSearch = { type: 'city', value: city };
    }
}

async function getWeatherByCoords(lat, lon) {
    const url = `${apiBaseURL}lat=${lat}&lon=${lon}&units=${currentUnit}&appid=${apiKey}`;
    const data = await fetchWeatherData(url);
    if (data) {
        lastSearch = { type: 'coords', value: { lat, lon } };
    }
}

const handleGeoSuccess = (position) => {
  const { latitude, longitude } = position.coords;
  getWeatherByCoords(latitude, longitude);
};

const handleGeoError = (error) => {
  let msg = "Unable to retrieve your location.";
  if (error?.code === error.PERMISSION_DENIED) {
    msg = "Location permission denied. Please allow access or search for a city.";
  } else if (error?.code === error.POSITION_UNAVAILABLE) {
    msg = "Location unavailable. Try again later or search for a city.";
  } else if (error?.code === error.TIMEOUT) {
    msg = "Location request timed out. Please try again.";
  } else {
    msg += " Please grant permission or search for a city.";
  }
  showError(msg);
};

searchButton.addEventListener("click", () => {
    getWeatherByCity(searchBox.value.trim());
});


searchBox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        getWeatherByCity(searchBox.value.trim());
    }
});


geoButton.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      handleGeoSuccess,
      handleGeoError,
      { enableHighAccuracy: false, timeout: 10000 }
    );
  } else {
    showError("Geolocation is not supported by your browser. Please search for a city instead.");
  }
});


// Unit toggle switch change
unitSwitch.addEventListener("change", () => {
    currentUnit = unitSwitch.checked ? "imperial" : "metric";
    
    // Update labels' active state
    unitLabels.forEach(label => label.classList.toggle('active'));

    if (lastSearch.type === 'city') {
        getWeatherByCity(lastSearch.value);
    } else if (lastSearch.type === 'coords') {
        getWeatherByCoords(lastSearch.value.lat, lastSearch.value.lon);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
        getWeatherByCity(lastCity);
    }
});