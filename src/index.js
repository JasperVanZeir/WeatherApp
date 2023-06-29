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
    const apiUrlLocation = `http://api.weatherapi.com/v1/forecast.json?key=${apiKeyLocation}&q=${location}&days=7&aqi=no&alerts=no`;
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
          const time1 = data.forecast.forecastday[0].date.split('-').slice(1).join('-').substring(0, 5);
          const time2 = data.forecast.forecastday[1].date.split('-').slice(1).join('-').substring(0, 5);
          const time3 = data.forecast.forecastday[2].date.split('-').slice(1).join('-').substring(0, 5);
          const time4 = data.forecast.forecastday[3].date.split('-').slice(1).join('-').substring(0, 5);          
          const rain1 = data.forecast.forecastday[0].day.daily_chance_of_rain;
          const rain2 = data.forecast.forecastday[1].day.daily_chance_of_rain;
          const rain3 = data.forecast.forecastday[2].day.daily_chance_of_rain;
          const rain4 = data.forecast.forecastday[3].day.daily_chance_of_rain;
          const tempDay1 = data.forecast.forecastday[0].day.avgtemp_c;
          const tempDay2 = data.forecast.forecastday[1].day.avgtemp_c;
          const tempDay3 = data.forecast.forecastday[2].day.avgtemp_c;
          const tempDay4 = data.forecast.forecastday[3].day.avgtemp_c;
          const tempDay5 = data.forecast.forecastday[4].day.avgtemp_c;
          const tempDay6 = data.forecast.forecastday[5].day.avgtemp_c;
          const tempDay7 = data.forecast.forecastday[6].day.avgtemp_c;
          const DateDay1 = data.forecast.forecastday[0].date;
          const DateDay2 = data.forecast.forecastday[1].date;
          const DateDay3 = data.forecast.forecastday[2].date;
          const DateDay4 = data.forecast.forecastday[3].date;
          const DateDay5 = data.forecast.forecastday[4].date;
          const DateDay6 = data.forecast.forecastday[5].date;
          const DateDay7 = data.forecast.forecastday[6].date;

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
            time1,
            time2,
            time3,
            time4,
            rain1,
            rain2,
            rain3,
            rain4,
            tempDay1,
            tempDay2,
            tempDay3,
            tempDay4,
            tempDay5,
            tempDay6,
            tempDay7,
            DateDay1,
            DateDay2,
            DateDay3,
            DateDay4,
            DateDay5,
            DateDay6,
            DateDay7,

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
    const value1 = document.getElementById("value1");
    const value2 = document.getElementById("value2");
    const value3 = document.getElementById("value3");
    const value4 = document.getElementById("value4");


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
    time1.textContent = data.time1;
    time2.textContent = data.time2;
    time3.textContent = data.time3;
    time4.textContent = data.time4;
    rain1.textContent = data.rain1 + '%';
    rain2.textContent = data.rain2 + '%';
    rain3.textContent = data.rain3 + '%';
    rain4.textContent = data.rain4 + '%';
    value1.style.width = data.rain1 + '%';
    value2.style.width = data.rain2 + '%';
    value3.style.width = data.rain3 + '%';
    value4.style.width = data.rain4 + '%';
    let tempDay1 = data.tempDay1;
    let tempDay2 = data.tempDay2;
    let tempDay3 = data.tempDay3;
    let tempDay4 = data.tempDay4;
    let tempDay5 = data.tempDay5;
    let tempDay6 = data.tempDay6;
    let tempDay7 = data.tempDay7;
    let DateDay1 = data.DateDay1;
    let DateDay2 = data.DateDay2;
    let DateDay3 = data.DateDay3;
    let DateDay4 = data.DateDay4;
    let DateDay5 = data.DateDay5;
    let DateDay6 = data.DateDay6;
    let DateDay7 = data.DateDay7;
  

    
    var options2 = {
      series: [
        {
          name: 'Temperature',
          data: [tempDay1, tempDay2, tempDay3, tempDay4, tempDay5, tempDay6, tempDay7]
        }
      ],
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false // Hide the toolbar functions at the top right corner
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: [
          DateDay1,
          DateDay2,
          DateDay3,
          DateDay4,
          DateDay5,
          DateDay6,
          DateDay7
        ],
        labels: {
          style: {
            colors: '#9ca2ae', // Set the color of x-axis labels to gray
            fontSize: '1.125rem', // Set the font size of x-axis labels
            fontWeight: '500' // Set the font weight of x-axis labels
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#9ca2ae', // Set the color of y-axis labels to gray
            fontSize: '1.125rem', // Set the font size of y-axis labels
            fontWeight: '500' // Set the font weight of y-axis labels
          }
        }
      },
      markers: {
        size: 5, // Set the size of the circles
        colors: ['#008ffb'], // Set the color of the circles (orange in this example)
        strokeColors: ['#ffffff'], // Set the stroke color of the circles (white in this example)
        strokeWidth: 2, // Set the stroke width of the circles
        hover: {
          size: 8 // Set a smaller size for the circles when hovering
        }
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy',
        },
        y: {
          formatter: function (value) {
            return value + '°C'; // Append units to the y-axis values
          }
        },
        style: {
          fontSize: '1rem',
          fontFamily: 'Arial, sans-serif',
          background: '#f8f8f8',
          color: '#333333',
          border: '1px solid #dddddd',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          padding: '12px'
        },
        marker: {
          show: false
        }
      },
      
      grid: {
        borderColor: '#f9fafb' // Set the color of the grid lines to light gray
      }
    };
    
    var chart = new ApexCharts(document.querySelector("#chart"), options2);
    chart.render();
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
    const backgroundOption = ["thunderstorm", "drizzle", "rain", "snow", "clear", "clouds"]
    if (currentTime > sunriseTime && currentTime < sunsetTime) {
      switch (data.weather) {
        case "Sunny":
          weatherImage.src = "/src/icons/clear-day.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("clear");
          break;
        case "Partly cloudy":
          weatherImage.src = "/src/icons/partly-cloudy-day.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("clouds");
          break;
        case "Cloudy":
          weatherImage.src = "/src/icons/cloudy.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("clouds");
          break;
        case "Overcast":
          weatherImage.src = "/src/icons/overcast-day.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("clouds");
          break;
        case "Mist":
          weatherImage.src = "/src/icons/mist.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("clouds");
          break;
        case "Patchy rain possible":
          weatherImage.src = "/src/icons/partly-cloudy-day-drizzle.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("drizzle");
          break;
        case "Patchy snow possible":
          weatherImage.src = "/src/icons/partly-cloudy-day-snow.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("snow");
          break;
        case "Patchy sleet possible":
          weatherImage.src = "/src/icons/partly-cloudy-day-sleet.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("snow");
          break;
        case "Patchy freezing drizzle possible":
          weatherImage.src = "/src/icons/partly-cloudy-day-hail.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("snow");
          break;
        case "Thundery outbreaks possible":
          weatherImage.src = "/src/icons/thunderstorms-day.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("thunderstorm");
          break;
        case "Blowing snow":
          weatherImage.src = "/src/icons/snow.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("snow");
          break;
        case "Blizzard":
          weatherImage.src = "/src/icons/snow.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("snow");
          break;
        case "Fog":
          weatherImage.src = "/src/icons/partly-cloudy-day-fog.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("clouds");
          break;
        case "Freezing fog":
          weatherImage.src = "/src/icons/fog.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("clouds");
          break;
        case "Patchy light drizzle":
          weatherImage.src = "/src/icons/partly-cloudy-day-drizzle.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("drizzle");
          break;
        case "Light drizzle":
          weatherImage.src = "/src/icons/partly-cloudy-day-drizzle.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("drizzle");
          break;
        case "Freezing drizzle":
          weatherImage.src = "/src/icons/partly-cloudy-day-hail.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("snow");
          break;
        case "Heavy freezing drizzle":
          weatherImage.src = "/src/icons/hail.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("snow");
          break;
        case "Patchy light rain":
          weatherImage.src = "/src/icons/partly-cloudy-day-drizzle.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("drizzle");
          break;
        case "Light rain":
          weatherImage.src = "/src/icons/partly-cloudy-day-drizzle.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("drizzle");
          break;
        case "Moderate rain at times":
          weatherImage.src = "/src/icons/partly-cloudy-day-rain.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Moderate rain":
          weatherImage.src = "/src/icons/partly-cloudy-day-rain.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Heavy rain at times":
          weatherImage.src = "/src/icons/rain.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Heavy rain":
          weatherImage.src = "/src/icons/rain.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Light freezing rain":
          weatherImage.src = "/src/icons/partly-cloudy-day-hail.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("snow");
          break;
        case "Moderate or heavy freezing rain":
          weatherImage.src = "/src/icons/hail.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("snow");
          break;
        case "Light sleet":
          weatherImage.src = "/src/icons/partly-cloudy-day-sleet.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("snow");
          break;
        case "Moderate or heavy sleet":
          weatherImage.src = "/src/icons/sleet.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("snow");
          break;
        case "Patchy light snow":
          weatherImage.src = "/src/icons/partly-cloudy-day-snow.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("snow");
          break;
        case "Light snow":
          weatherImage.src = "/src/icons/partly-cloudy-day-snow.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("snow");
          break;
        case "Patchy moderate snow":
          weatherImage.src = "/src/icons/partly-cloudy-day-snow.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("snow");
          break;
        case "Moderate snow":
          weatherImage.src = "/src/icons/partly-cloudy-day-snow.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("snow");
          break;
        case "Patchy heavy snow":
          weatherImage.src = "/src/icons/snow.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("snow");
          break;
        case "Heavy snow":
          weatherImage.src = "/src/icons/snow.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("snow");
          break;
        case "Ice pellets":
          weatherImage.src = "/src/icons/partly-cloudy-day-hail.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("snow");
          break;
        case "Light rain shower":
          weatherImage.src = "/src/icons/partly-cloudy-day-drizzle.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("drizzle");
          break;
        case "Moderate or heavy rain shower":
          weatherImage.src = "/src/icons/rain.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Torrential rain shower":
          weatherImage.src = "/src/icons/rain.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Light sleet showers":
          weatherImage.src = "/src/icons/partly-cloudy-day-sleet.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("snow");
          break;
        case "Moderate or heavy sleet showers":
          weatherImage.src = "/src/icons/sleet.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("snow");
          break;
        case "Light snow showers":
          weatherImage.src = "/src/icons/partly-cloudy-day-snow.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("snow");
          break;
        case "Moderate or heavy snow showers":
          weatherImage.src = "/src/icons/snow.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("snow");
          break;
        case "Light showers of ice pellets":
          weatherImage.src = "/src/icons/partly-cloudy-day-hail.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("snow");
          break;
        case "Moderate or heavy showers of ice pellets":
          weatherImage.src = "/src/icons/hail.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("snow");
          break;
        case "Patchy light rain with thunder":
          weatherImage.src = "/src/icons/thunderstorms-day-rain.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("thunderstorm");
          break;
        case "Moderate or heavy rain with thunder":
          weatherImage.src = "/src/icons/thunderstorms-rain.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("thunderstorm");
          break;
        case "Patchy light snow with thunder":
          weatherImage.src = "/src/icons/thunderstorms-day-snow.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("thunderstorm");
          break;
        case "Moderate or heavy snow with thunder":
          weatherImage.src = "/src/icons/thunderstorms-snow.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("thunderstorm");
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
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Partly cloudy":
          weatherImage.src = "/src/icons/partly-cloudy-night.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Cloudy":
          weatherImage.src = "/src/icons/cloudy.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Overcast":
          weatherImage.src = "/src/icons/overcast.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Mist":
          weatherImage.src = "/src/icons/mist.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Patchy rain possible":
          weatherImage.src = "/src/icons/partly-cloudy-night-drizzle.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Patchy snow possible":
          weatherImage.src = "/src/icons/partly-cloudy-night-snow.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Patchy sleet possible":
          weatherImage.src = "/src/icons/partly-cloudy-night-sleet.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Patchy freezing drizzle possible":
          weatherImage.src = "/src/icons/partly-cloudy-night-drizzle.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Thundery outbreaks possible":
          weatherImage.src = "/src/icons/thunderstorms-night-rain.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Blowing snow":
          weatherImage.src = "/src/icons/snow.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Blizzard":
          weatherImage.src = "/src/icons/snow.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Fog":
          weatherImage.src = "/src/icons/fog.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Freezing fog":
          weatherImage.src = "/src/icons/fog.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Patchy light drizzle":
          weatherImage.src = "/src/icons/partly-cloudy-night-drizzle.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Light drizzle":
          weatherImage.src = "/src/icons/partly-cloudy-night-drizzle.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Freezing drizzle":
          weatherImage.src = "/src/icons/partly-cloudy-night-drizzle.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Heavy freezing drizzle":
          weatherImage.src = "/src/icons/partly-cloudy-night-drizzle.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Patchy light rain":
          weatherImage.src = "/src/icons/partly-cloudy-night-drizzle.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Light rain":
          weatherImage.src = "/src/icons/partly-cloudy-night-drizzle.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Moderate rain at times":
          weatherImage.src = "/src/icons/partly-cloudy-night-drizzle.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Moderate rain":
          weatherImage.src = "/src/icons/rain.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Heavy rain at times":
          weatherImage.src = "/src/icons/rain.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Heavy rain":
          weatherImage.src = "/src/icons/rain.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Light freezing rain":
          weatherImage.src = "/src/icons/partly-cloudy-night-drizzle.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Moderate or heavy freezing rain":
          weatherImage.src = "/src/icons/partly-cloudy-night-drizzle.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Light sleet":
          weatherImage.src = "/src/icons/partly-cloudy-night-sleet.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Moderate or heavy sleet":
          weatherImage.src = "/src/icons/partly-cloudy-night-sleet.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Patchy light snow":
          weatherImage.src = "/src/icons/partly-cloudy-night-snow.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Light snow":
          weatherImage.src = "/src/icons/partly-cloudy-night-snow.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Patchy moderate snow":
          weatherImage.src = "/src/icons/partly-cloudy-night-snow.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Moderate snow":
          weatherImage.src = "/src/icons/snow.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Patchy heavy snow":
          weatherImage.src = "/src/icons/snow.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Heavy snow":
          weatherImage.src = "/src/icons/snow.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Ice pellets":
          weatherImage.src = "/src/icons/partly-cloudy-night-sleet.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Light rain shower":
          weatherImage.src = "/src/icons/partly-cloudy-night-drizzle.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });

          sideContainer.classList.add("rain");
          break;
        case "Moderate or heavy rain shower":
          weatherImage.src = "/src/icons/rain.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Torrential rain shower":
          weatherImage.src = "/src/icons/rain.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Light sleet showers":
          weatherImage.src = "/src/icons/partly-cloudy-night-sleet.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Moderate or heavy sleet showers":
          weatherImage.src = "/src/icons/partly-cloudy-night-sleet.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Light snow showers":
          weatherImage.src = "/src/icons/partly-cloudy-night-snow.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Moderate or heavy snow showers":
          weatherImage.src = "/src/icons/snow.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Light showers of ice pellets":
          weatherImage.src = "/src/icons/partly-cloudy-night-sleet.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Moderate or heavy showers of ice pellets":
          weatherImage.src = "/src/icons/partly-cloudy-night-sleet.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Patchy light rain with thunder":
          weatherImage.src = "/src/icons/thunderstorm.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Moderate or heavy rain with thunder":
          weatherImage.src = "/src/icons/thunderstorm.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Patchy light snow with thunder":
          weatherImage.src = "/src/icons/thunderstorm.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
          break;
        case "Moderate or heavy snow with thunder":
          weatherImage.src = "/src/icons/thunderstorm.svg";
          backgroundOption.forEach(className => {
            sideContainer.classList.remove(className);
          });
          sideContainer.classList.add("rain");
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
