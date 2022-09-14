// variable declarations
var apiKey = "3fd474903b34faba6e7cfec2532d9b01";
var userCityInputEl = document.querySelector("#user-city")
var cityName = userCityInputEl.textContent;
var submitButton = document.querySelector('#submit-button');


var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;



// submit click handler
var formSubmitHandler = function(event) {
    event.preventDefault();

    // get value from input element
    var userCity = userCityInputEl.value.trim();

    if (userCity) {
        console.log(userCity);
        getWeatherData(userCity);
    
    } else {
        alert('Please enter a valid city name.')
    }
};


// function to get current weather
var getWeatherData = function(userCity) {
    
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=" + apiKey + "&units=imperial";
    // var apiUrl = "" + lat + "&lon=" + lon + "&exclude=hourly.dily&appID=" + apiKey;

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    todaysWeather(data);
                    fiveDayForecast(data.coord.lat, data.coord.lon);
                })
            }
        })
};


// function to GET specific pieces of data from API response
var todaysWeather = function (weatherData) {
    
    var todaysTemp = weatherData.main.temp;
    var todaysWind = weatherData.wind.speed;
    var todaysHumidity = weatherData.main.humidity;
    var lat = weatherData.coord.lat;
    var lon = weatherData.coord.lon;

    // var displayData = [];

    // const tempObj = {temp: todaysTemp}
    // const windObj = {wind: todaysWind}
    // const humidityObj = {humidity: todaysHumidity}
    
    // displayData.push(tempObj);
    // displayData.push(windObj);
    // displayData.push(humidityObj);

    const displayObj = {
    humidity: todaysHumidity,
    wind: todaysWind,
    temp: todaysTemp
    }

   //console.log(displayData);
   console.log(displayObj);

   
    // get current time for stormglass.io Api request parameters
    const timeNow = new Date().getTime();
    const roundedTime = Math.floor(timeNow / 1000);
    // need to add logic to handle when to round up and when to round down
    console.log(roundedTime);
    
    // fetch to stormglass.io for uv index
    var stormglassApiKey = "fbc0e798-312f-11ed-b970-0242ac130002-fbc0e7fc-312f-11ed-b970-0242ac130002";
    const params = 'uvIndex';
    var stormglassApiUrl = `https://api.stormglass.io/v2/solar/point?lat=${lat}&lng=${lon}&params=${params}&start=${roundedTime}`
    
   
    // stormglass.io has a call limit of 10 per day uncomment out to test

    // fetch(stormglassApiUrl, {headers: {
    //     'Authorization': stormglassApiKey
    // }}).then(function(response) {
    //     if (response.ok) {
    //         response.json().then(function(data) {
    //             console.log(data);
    //             console.log(data.hours[0].uvIndex.noaa);
    //         })
    //     }
    // })
    
    console.log(`Latitude: ${lat}`);
    console.log(`Longitude: ${lon}`);
    console.log(`Today's Temp: ${todaysTemp}`);
    console.log(`Today's Wind: ${todaysWind}`);
    console.log(`Today's Humidity: ${todaysHumidity}`);

    //display results
    displayTodaysWeather(displayObj);
}

// function to get five day forecast
var fiveDayForecast = function (lat, lon) {
    
    // get current date - set to variable
    var today = new Date;
    var nextDay = 
    console.log(`nextDay = ${nextDay}`);
    
    var forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    
    fetch(forecastApiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);

                    var fiveDayArr = [];
                    fiveDayArr.push(data.list[0])
                    fiveDayArr.push(data.list[8])
                    fiveDayArr.push(data.list[16])
                    fiveDayArr.push(data.list[24])
                    fiveDayArr.push(data.list[32])

                    makeForecastCards(fiveDayArr);
                })
            }
    })
    
    
    // create an object or array of data???
    var fiveDayContainer = document.querySelector(`#five-day-card-container`);
    
    
}

var makeForecastCards = function (input) {
    console.log(input);

    // begin loop
    
    // create container for the day

    // create span for date

    // create  icon

    // create list item for temp

    // create list item for wind

    // create list item for humidity

    // append elements to the card

    // append card to card container

}


// display ALL results
// call displayTodaysWeather() inside of todaysWeather()
// call displayFiveDay() inside of the fiveDayForecast() function

// function to display today's weather
var displayTodaysWeather = function (results) {
    var cityNameDisplayEl = document.querySelector('#todays-weather-title');
    var userCityInputEl = document.querySelector("#user-city")
    var cityName = userCityInputEl.value;
    var todaysWeatherDisplayContainerEl = document.querySelector('#todays-weather-results');
    
    console.log(`cityName is ${cityName}`);
    cityNameDisplayEl.textContent = cityName;

    // create elements
    // create temp element
    var tempEl = document.createElement("li");
    tempEl.classList = "list-group-item transparent-background";
    // If ability to change between celcius and farenheit is added, update api query parameters also
    tempEl.textContent = `Temperature: ${results.temp}` + `\u00B0F`;
    // create wind element
    var windEl = document.createElement("li");
    windEl.classList = "list-group-item transparent-background";
    windEl.textContent = `Wind: ${results.wind} mph`;
    // create humidity element
    var humidityEl = document.createElement("li");
    humidityEl.classList = "list-group-item transparent-background";
    humidityEl.textContent = `Humidity: ${results.humidity} %`;

    //create UV index element
    var uvIndexEl = document.createElement("li");
    uvIndexEl.classList = "list-group-item transparent-background";
    uvIndexEl.textContent = `UV Index: `
    
    // append elements to todaysWeatherDisplayContainerEl
    todaysWeatherDisplayContainerEl.appendChild(tempEl);
    todaysWeatherDisplayContainerEl.appendChild(windEl);
    todaysWeatherDisplayContainerEl.appendChild(humidityEl);
    todaysWeatherDisplayContainerEl.appendChild(uvIndexEl);

};


// function to display 5 day forecast
var displayFiveDay = function () {

};



// event listener to submit button
submitButton.addEventListener('click', formSubmitHandler);