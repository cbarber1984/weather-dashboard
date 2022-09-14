// variable declarations
var apiKey = "3fd474903b34faba6e7cfec2532d9b01";
var userCityInputEl = document.querySelector("#user-city")
var cityName = userCityInputEl.textContent;
var submitButton = document.querySelector('#submit-button');
var cityNameDisplayEl = document.querySelector('#todays-weather-title');

var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

var weatherHistory = function(element) {
    var cityName = element.dataset.city;
    cityNameDisplayEl.textContent = cityName;
    getWeatherData(cityName);
}

var displayCity = function(input) {
    cityNameDisplayEl.textContent = input;
}

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

    var historyDisplayEl = document.querySelector("#history-display");
    var historyButtonEl = document.createElement("button");
    historyButtonEl.textContent = userCity;
    historyButtonEl.setAttribute("type", "button");
    historyButtonEl.setAttribute("data-city", userCity);
    historyButtonEl.setAttribute("onclick", "weatherHistory(this)");
    historyButtonEl.classList = "btn btn-light";
    historyDisplayEl.appendChild(historyButtonEl);

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
                    displayCity(userCity);
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
    var cardContinerEl = document.querySelector("#five-day-card-container")
    cardContinerEl.innerHTML = "";
    // begin loop

    for (let i = 0; i < input.length; i++) {
        // create container for the day
        //var cardContinerEl = document.querySelector("#five-day-card-container")

        // create col
        var colEl = document.createElement("div");
        colEl.classList = "col"
        
        // create card
        var cardEl = document.createElement("div");
        cardEl.classList = "card forecast-card";
        
        // create card body
        var cardBodyEl = document.createElement("div");
        cardBodyEl.classList = "list-group list-group-flush forecast-data";
        
        
        // create h2 for date & append to card body
        var cardTitleEl = document.createElement("h2");
        cardTitleEl.classList = "card-title"
        var unixTimestamp = input[i].dt;
        var date = new Date(unixTimestamp * 1000);
        var dateToDisplay = date.toLocaleString("en-US", {month: "numeric", day: "numeric"});
        cardTitleEl.textContent = dateToDisplay;
        
        
        // create ul list-group
        var cardListEl = document.createElement("ul");
        cardListEl.classList = "list-group list-group-flush forecast-data"
        
        
        //DRY idea... since so many elments have the same class attributes, should I write a helper function to apply them at once
        // var addListClasses = function (element) {
        //     element.classlist = "list-group-item transparent-background card-data";
        // };
        
       // var listClasses = "list-group-item transparent-background card-data";

        // create list item for temp & append to cardListEl
        var cardTempEl = document.createElement("li");
        cardTempEl.classList = "list-group-item transparent-background card-data";
        
        cardTempEl.textContent = "Temp: " + input[i].main.temp;
        cardListEl.appendChild(cardTempEl);
        
        // create  img for icon & append to cardListEl
        var cardImgEl = document.createElement("img");
        cardImgEl.classList = "list-group-item transparent-background card-data";
        cardImgEl.setAttribute("width", "50px")
        cardImgEl.setAttribute("height", "50px")
        cardImgEl.setAttribute("alt", "weather icon")
        cardImgEl.setAttribute("src", `http://openweathermap.org/img/wn/${input[i].weather[0].icon}@2x.png`);
        cardListEl.appendChild(cardImgEl);
        
        
        // create list item for wind & append to cardListEl
        var cardWindEl = document.createElement("li")
        cardWindEl.classList = "list-group-item transparent-background card-data";
        cardWindEl.textContent = `Wind: ${input[i].wind.speed} mph`;
        cardListEl.appendChild(cardWindEl);
        
        
        // create list item for humidity & append to cardListEl
        var cardHumidityEl = document.createElement("li");
        cardHumidityEl.classList = "list-group-item transparent-background card-data";
        cardHumidityEl.textContent = `Humidity: ${input[i].main.humidity}%`;
        cardListEl.appendChild(cardHumidityEl);
        
        // create list item for UV index & append to cardListEl
        // var cardUvIndexEl = document.createElement("li");
        // cardUvIndexEl.classList = "list-group-item transparent-background card-data"
        // cardUvIndexEl.textContent = `UV Index: `;

        

        // append elements to the card body
        cardBodyEl.appendChild(cardTitleEl);
        cardBodyEl.appendChild(cardListEl);
                
        // append card body to card
        cardEl.appendChild(cardBodyEl);
        
        // append card to col
        colEl.appendChild(cardEl);
        
        // append col to col container
        cardContinerEl.appendChild(colEl);
    }

}


// display ALL results
// call displayTodaysWeather() inside of todaysWeather()
// call displayFiveDay() inside of the fiveDayForecast() function

// function to display today's weather
var displayTodaysWeather = function (results) {
    
    // setup variables
    // var cityNameDisplayEl = document.querySelector('#todays-weather-title');
    var userCityInputEl = document.querySelector("#user-city")
    var todaysWeatherDisplayContainerEl = document.querySelector('#todays-weather-results');
    
    // Clear existing data
    cityNameDisplayEl.textContent = "";
    todaysWeatherDisplayContainerEl.innerHTML = "";


    // Get new data
    // var cityName = userCityInputEl.value;
    // console.log(`cityName is ${cityName}`);
    // cityNameDisplayEl.textContent = cityName;

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

// function to call weather history
// add create button function to getWeatherData() function that also adds data attribute of userCity to button
// onclick, pass userCity to getWeatherData() function



// event listener to submit button
submitButton.addEventListener('click', formSubmitHandler);