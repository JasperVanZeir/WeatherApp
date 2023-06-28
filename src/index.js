document.addEventListener("DOMContentLoaded", function () {
  const locationInput = document.getElementById("locationInput");

  locationInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      getWeatherData();
    }
  });

  function getWeatherData() {
    const location = locationInput.value.trim();
    const apiKeyLocation = "ad8cf43e40aa40b5b8a133930232806";
    const apiUrlLocation = `http://api.weatherapi.com/v1/forecast.json?key=${apiKeyLocation}&q=${location}&days=4&aqi=no&alerts=no`;
    console.log(apiUrlLocation);
    fetch(apiUrlLocation)
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          alert("Please enter a valid location");
        } else {
          console.log(data);
          const location = data.location.name;
          const country = data.location.country;
          const localTime = data.location.localtime;
          const localDate = data.location.localtime.split(" ")[0];
          const weather = data.current.condition.text;
          const temperature = data.current.temp_c;
          const windSpeed = data.current.wind_kph;
          const rain = data.current.precip_mm;
          const pressure = data.current.pressure_mb;
          const uv = data.current.uv;
          const humidity = data.current.humidity;
          const windDirection = data.current.wind_dir;
          const sunrise = data.forecast.forecastday[0].astro.sunrise;
          const sunset = data.forecast.forecastday[0].astro.sunset;

          displayWeatherData({
            location,
            country,
            localTime,
            localDate,
            weather,
            temperature,
            windSpeed,
            rain,
            pressure,
            uv,
            humidity,
            windDirection,
            sunrise,
            sunset,
          });
        }
      });
  }

  function displayWeatherData(data) {
    const location = document.getElementById("location");
    const country = document.getElementById("country");
    const localTime = document.getElementById("localTime");
    const temperature = document.getElementById("temperature");
    const weather = document.getElementById("weather");
    const windSpeed = document.getElementById("windSpeed");
    const rain = document.getElementById("rain");
    const pressure = document.getElementById("pressure");
    const uv = document.getElementById("uv");
    const humidity = document.getElementById("humidity");
    const windDirection = document.getElementById("windDirection");
    const weatherImage = document.getElementById("weatherImage");
    const uvImage = document.getElementById("uvImage");
    const monthYear = document.getElementById("monthYear");
    const date = new Date(data.localDate);
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const fullDate = date.toLocaleDateString('en-US', options);
    const Datum = document.getElementById("Datum");
    const pressureImage = document.getElementById("pressureImage");
    const time1 = document.getElementById("time1");
    const time2 = document.getElementById("time2");
    const time3 = document.getElementById("time3");
    const time4 = document.getElementById("time4");
    const rain1 = document.getElementById("rain1");
    const rain2 = document.getElementById("rain2");
    const rain3 = document.getElementById("rain3");
    const rain4 = document.getElementById("rain4");
    const sideContainer = document.getElementById("sideContainer");
    const sunrise = document.getElementById("sunrise");
    const sunset = document.getElementById("sunset");

    location.textContent = data.location;
    country.textContent = data.country;
    const localTimeFull = data.localTime;
    const localTimeShort = localTimeFull.slice(11, 16);
    localTime.textContent = localTimeShort;
    temperature.textContent = data.temperature;
    weather.textContent = data.weather;
    windSpeed.textContent = data.windSpeed;
    rain.textContent = data.rain;
    pressure.textContent = data.pressure;
    uv.textContent = data.uv;
    humidity.textContent = data.humidity;
    windDirection.textContent = data.windDirection;
    monthYear.textContent = data.localDate;
    Datum.textContent = fullDate;
    uvImage.src = `/src/icons/uv-index-${data.uv}.svg`;
    sunrise.textContent = convertTo24HourFormat(data.sunrise);
    sunset.textContent = convertTo24HourFormat(data.sunset);
    
    function convertTo24HourFormat(time) {
      // Create a new Date object with the provided time in AM/PM format
      const date = new Date(`January 1, 2023 ${time}`);
    
      // Get the time in 24-hour format
      const time24Hour = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    
      return time24Hour;
    }
    
    const currentTime = convertTo24HourFormat(localTimeShort);
    const sunriseTime = convertTo24HourFormat(data.sunrise);
    const sunsetTime = convertTo24HourFormat(data.sunset);
    
    if (currentTime > sunriseTime && currentTime < sunsetTime) {
      switch (data.weather) {
        case "Clear":
          weatherImage.src = "/src/icons/clear-day.svg";
          sideContainer.classList.add("clear")
          break;
        case "Partly cloudy":
          console.log(data.weather);
          weatherImage.src = "/src/icons/partly-cloudy-day.svg";
          sideContainer.classList.add("clouds")
          break;
        case "Sunny":
          weatherImage.src = "/src/icons/clear-day.svg";
          sideContainer.classList.add("clear")
          break;
        default:
          weatherImage.src = "/src/icons/not-available.svg";
          break;
    }
      console.log("Day");
    } else {
      switch (data.weather) {
        case "Clear":
          weatherImage.src = "/src/icons/clear-night.svg";
          sideContainer.classList.add("rain")
          break;
        case "Partly cloudy":
          console.log(data.weather);
          weatherImage.src = "/src/icons/partly-cloudy-night.svg";
          sideContainer.classList.add("clouds")
          break;
        case "Sunny":
          weatherImage.src = "/src/icons/clear-night.svg";
          sideContainer.classList.add("clear")
          break;
        default:
          weatherImage.src = "/src/icons/not-available.svg";
          break;
    }
      console.log("Night");
    }
    
    if (data.pressure < 1014){
      pressureImage.src = "/src/icons/pressure-low.svg";
    }
    else {
      pressureImage.src = "/src/icons/pressure-high.svg";
    }
  }
});
