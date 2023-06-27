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
                                if (description.textContent === "Thunderstorm") {
                                    weatherImage.src = "/src/icons/thunder.svg";
                                } else if (description.textContent === "Drizzle") {
                                    weatherImage.src = "/src/icons/rainy-3.svg";
                                } else if (description.textContent === "Rain") {
                                    weatherImage.src = "/src/icons/rainy-6.svg";
                                } else if (description.textContent === "Snow") {
                                    weatherImage.src = "/src/icons/snowy-6.svg";
                                } else if (description.textContent === "Clear") {
                                    weatherImage.src = "/src/icons/day.svg";
                                } else if (description.textContent === "Clouds") {
                                    weatherImage.src = "/src/icons/cloudy.svg";
                                }
                                let cityName = weatherData.city.name;
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