# 🌦️ Weather App

A clean, responsive weather application built with **HTML**, **CSS**, and **JavaScript**.  
It fetches real‑time data from the **OpenWeatherMap API** and works on desktop & mobile.

---

## 🚀 Features

| | Description |
|---|---|
| 🔍 **City search** | Get current weather for any city by name. |
| 📍 **Geolocation** | One‑click button to use your current location (with graceful errors if permission is denied). |
| 🔄 **°C / °F toggle** | Instantly switch between Metric (°C / km h) and Imperial (°F / mph). |
| 🌡️ **Weather details** | Temperature, humidity, wind speed, and condition‑specific icon. |
| 💾 **Local storage** | Remembers your last searched city on page reload. |
| ❌ **Robust error handling** | Clear messages for invalid city, network failure, or blocked geolocation. |
| 🎨 **Mobile‑friendly UI** | Pure CSS – no frameworks – fully responsive. |

---

## 🌐 Live Demo

👉 **Try it here:**  
https://weather-app-chi-smoky-14.vercel.app/

*(Hosted on Vercel – loads instantly over HTTPS.)*


## 📦 Tech Stack

| Layer | Tech |
|-------|------|
| Markup | **HTML5** |
| Styling | **CSS3** |
| Logic | **Vanilla JavaScript** |
| Data | [OpenWeatherMap API](https://openweathermap.org/api) |
| Hosting | [Vercel](https://vercel.com) |

---

## 🛠️ Getting Started

### 📺 View Online  
Open the live link: https://weather-app-chi-smoky-14.vercel.app/

### 💻 Run Locally

```bash
# 1 · Clone
git clone https://github.com/your-username/WeatherApp.git
cd WeatherApp

# 2 · (Static) open index.html
#    – OR –
#    start a local server so geolocation works:
npx serve .
```

1. **Add your API key**  
   In `script.js`, replace:

   ```js
   const apiKey = "YOUR_API_KEY";
   ```

   Get a free key from [OpenWeatherMap](https://openweathermap.org/appid).

2. **Open `index.html`** in your browser (or the URL printed by `serve`).  
   Allow location permission when prompted – or type a city name.

---

## 🌍 Roadmap / Nice‑to‑Have

- 5‑day / hourly forecast  
- Dark‑mode toggle  
- PWA / “Add to Home Screen” support  
- IP‑based fallback when geolocation fails

PRs are welcome!

---

## 📄 License

![License](https://img.shields.io/badge/license-MIT-green.svg)

Released under the **MIT License** – do anything you like, just keep the notice.

---

## 🙏 Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) for free weather data  
- [Vercel](https://vercel.com) for painless hosting
