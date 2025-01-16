const apiKey = "1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")

const weatherIcon = document.querySelector(".weather-icon")

function countryName(code) {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return regionNames.of(code);
    }
        
async function checkWeather(city){
    const response = await fetch(apiUrl +city + `&appid=${apiKey}`);

    if (response.status == 400) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".error p").innerHTML = "Please enter a valid city name.";
        document.querySelector(".weather").style.display = "none";
        }
        else if(response.status == 404){
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            document.querySelector(".error p").innerHTML = "Invalid city name.";
        } else {
            var data = await response.json();
            console.log(data)

            const unixTime = data.dt + data.timezone;

            const localTime = new Date(unixTime * 1000);

            document.querySelector(".city-name").innerHTML = data.name + ", " + countryName(data.sys.country);
            document.querySelector(".time").innerHTML = localTime.toDateString();
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector(".min-per").innerHTML = Math.round(data.main.temp_min) + "°c";
            document.querySelector(".max-per").innerHTML = Math.round(data.main.temp_max) + "°c";
            document.querySelector(".feels-per").innerHTML = Math.round(data.main.feels_like) + "°c";
            document.querySelector(".weather-name").innerHTML = data.weather[0].main;
            document.querySelector(".description").innerHTML = data.weather[0].description;
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";


            let weather = data.weather[0].main;
            switch(weather){
                case "Clouds":
                    weatherIcon.src = "images/clouds.png";
                    break;
                case "Clear":
                    weatherIcon.src = "images/clear.png";
                    break;
                case "Rain":
                    weatherIcon.src = "images/rain.png";
                    break;
                case "Drizzle":
                    weatherIcon.src = "images/drizzle.png";
                    break;
                case "Mist":
                    weatherIcon.src = "images/mist.png";
                    break;
                }
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";

            }
        }
        
    searchBtn.addEventListener("click", ()=> {
        console.log(searchBox.value);            checkWeather(searchBox.value);
    })