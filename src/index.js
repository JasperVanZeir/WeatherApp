document.addEventListener('DOMContentLoaded', function() {
    const locationInput = document.getElementById("locationInput");

    locationInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            console.log(locationInput.value);
            const Locatie = locationInput.value.trim();
            const apiKey = "df2fa2d0bf8a03f553968d514aaad017";
            const apiURLCoords = `https://api.openweathermap.org/geo/1.0/direct?q=${Locatie}&limit=1&appid=${apiKey}`;
            fetch(apiURLCoords)
                .then(res => res.json())
                .then(locationData => {
                    if (locationData.length === 0) {
                        alert("Locatie niet gevonden");
                        return;
                    } else {
                        const lat = locationData[0].lat;
                        const lon = locationData[0].lon;
                        const apiURLWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

                        fetch(apiURLWeather)
                            .then(res => res.json())
                            .then(weatherData => {
                                console.log(weatherData);

                                let countyCode = weatherData.city.country;
                                const apiURLCountry = `https://restcountries.com/v2/alpha/${countyCode}`;

                                fetch(apiURLCountry)
                                    .then(response => response.json())
                                    .then(countryData => {
                                        console.log(countryData);
                                        let country = document.getElementById("country");
                                        country.textContent = countryData.name;
                                    })
                                    .catch(error => {
                                        console.error('Error:', error);
                                    });
                                let temp = document.getElementById("temperature");
                                temp.innerHTML = weatherData.list[0].main.temp;
                                let location = document.getElementById("location");
                                location.innerHTML = weatherData.city.name;
                                let windSpeed = document.getElementById("windSpeed");
                                windSpeed.textContent = weatherData.list[0].wind.speed;
                                let rainChance = document.getElementById("rainChance");
                                const rainChanceValue = weatherData.list[0].pop * 100;
                                rainChance.textContent = `${rainChanceValue}`;

                                let pressure = document.getElementById("pressure");
                                pressure.textContent = weatherData.list[0].main.pressure;
                                let description = document.getElementById("description");
                                description.textContent = weatherData.list[0].weather[0].main;
                                let sideContainer = document.getElementById("sideContainer");

                                // Remove all existing weather classes from sideContainer
                                sideContainer.classList.remove("thunder", "drizzle", "rain", "snow", "clear", "clouds");
                                
                                if (description.textContent === "Thunderstorm") {
                                    weatherImage.src = "/src/icons/thunderstorms.svg";
                                    sideContainer.classList.add("thunder");
                                } else if (description.textContent === "Drizzle") {
                                    weatherImage.src = "/src/icons/drizzle.svg";
                                    sideContainer.classList.add("drizzle");
                                } else if (description.textContent === "Rain") {
                                    weatherImage.src = "/src/icons/rain.svg";
                                    sideContainer.classList.add("rain");
                                } else if (description.textContent === "Snow") {
                                    weatherImage.src = "/src/icons/snow.svg";
                                    sideContainer.classList.add("snow");
                                } else if (description.textContent === "Clear") {
                                    weatherImage.src = "/src/icons/clear-day.svg";
                                    sideContainer.classList.add("clear");
                                } else if (description.textContent === "Clouds") {
                                    weatherImage.src = "/src/icons/cloudy.svg";
                                    sideContainer.classList.add("clouds");
                                }
                                
                                let time1 = document.getElementById("time1");
                                time1.textContent = weatherData.list[1].dt_txt.slice(11, 16);
                                let time2 = document.getElementById("time2");
                                time2.textContent = weatherData.list[2].dt_txt.slice(11, 16);
                                let time3 = document.getElementById("time3");
                                time3.textContent = weatherData.list[3].dt_txt.slice(11, 16);
                                let time4 = document.getElementById("time4");
                                time4.textContent = weatherData.list[4].dt_txt.slice(11, 16);
                                let rain1 = document.getElementById("rain1");
                                const rain1Value = weatherData.list[1].pop * 100;
                                rain1.textContent = `${rain1Value.toFixed(0)}%`;
                                const value1 = document.querySelector("#value1");
                                value1.style.width = `${rain1Value.toFixed(0)}%`;

                                let rain2 = document.getElementById("rain2");
                                const rain2Value = weatherData.list[2].pop * 100;
                                rain2.textContent = `${rain2Value.toFixed(0)}%`;
                                const value2 = document.querySelector("#value2");
                                value2.style.width = `${rain2Value.toFixed(0)}%`;

                                let rain3 = document.getElementById("rain3");
                                const rain3Value = weatherData.list[3].pop * 100;
                                rain3.textContent = `${rain3Value.toFixed(0)}%`;
                                const value3 = document.querySelector("#value3");
                                value3.style.width = `${rain3Value.toFixed(0)}%`;

                                let rain4 = document.getElementById("rain4");
                                const rain4Value = weatherData.list[4].pop * 100;
                                rain4.textContent = `${rain4Value.toFixed(0)}%`;
                                let cityName = weatherData.city.name;
                                const value4 = document.querySelector("#value4");
                                value4.style.width = `${rain4Value.toFixed(0)}%`;


                                let sunriseTime = document.getElementById("sunriseTime");
                                const sunriseTimestamp = weatherData.city.sunrise;  
                                const sunriseDate = new Date(sunriseTimestamp * 1000);  
                                const sunriseHours = sunriseDate.getUTCHours();  
                                const sunriseMinutes = sunriseDate.getUTCMinutes();


                                sunriseTime.textContent = sunriseHours + ":" + sunriseMinutes;
                                let sunsetTime = document.getElementById("sunsetTime");
                                const sunsetTimestamp = weatherData.city.sunset;  
                                const sunsetDate = new Date(sunsetTimestamp * 1000); 
                                const sunsetHours = sunsetDate.getUTCHours();  
                                const sunsetMinutes = sunsetDate.getUTCMinutes();  
                                sunsetTime.textContent = sunsetHours + ":" + sunsetMinutes;

                                let sunriseAgo = document.getElementById("sunriseAgo");
                                const sunriseAgoTimestamp = weatherData.city.sunrise;
                                let sunsetAgo = document.getElementById("sunsetAgo");
                                const sunsetAgoTimestamp = weatherData.city.sunset;
                                const apiURLTime = `https://timezone.abstractapi.com/v1/current_time/?api_key=2962f2fb42ed482fa286d2de4a785050&location=${cityName}`;
                                fetch(apiURLTime)
                                    .then(response => response.json())
                                    .then(timeData => {
                                        console.log(timeData);
                                        let time = document.getElementById("time");
                                        const datetime = timeData.datetime;
                                        const timePart = datetime.slice(11, 16);
                                        const [hour, minute] = timePart.split(":");

                                        time.textContent = hour + ":" + minute;
                                                                            
                                       
                                        const sunriseTime = new Date(sunriseAgoTimestamp * 1000);
                                        const currentTime1 = new Date(datetime);
                                        const timeDiffMilliseconds1 = currentTime1 - sunriseTime;
                                        const timeDiffHours1 = Math.floor(timeDiffMilliseconds1 / 3600000);
                                        
                                        sunriseAgo.textContent = timeDiffHours1 + " hours ago";
                                        
                                        const sunsetTime = new Date(sunsetAgoTimestamp * 1000);
                                        const currentTime2 = new Date(datetime);
                                        const timeDiffMilliseconds2 = sunsetTime - currentTime2;
                                        const timeDiffHours2 = Math.floor(timeDiffMilliseconds2 / 3600000);
                                        
                                        sunsetAgo.textContent = "In " + timeDiffHours2 + " hours";
                                        
                                        
                                    })
                            })
                            .catch(error => {
                                console.error("Fout bij ophalen weerdata:", error);
                            });
                    }

                })
                .catch(error => {
                    console.error("Fout bij ophalen locatiedata:", error);
                });
        }
    });
});