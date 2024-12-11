document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message"); 

  const API_KEY = "5f56d525d1619d0a2cd2eac4ce55588e"; // OpenWeather API key

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
      const weatherData = await fetchWeatherData(city); // Fetch weather data
      displayWeatherData(weatherData); // Display weather info
    } catch (error) {
      showError(); // Show error message if city is not found
    }
  });

  // Fetch weather data from the OpenWeather API
  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    return data;
  }

  // Display weather data 
  function displayWeatherData(data) {
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature: ${main.temp}`;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;

    // Show weather info and hide error message
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  // Show error message if the city not found
  function showError() {
    // Hide weather info and show the error message
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});


//All right reserved by Syed 