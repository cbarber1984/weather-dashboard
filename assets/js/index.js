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
    
    // rewrite to take in the user city as a parameter !!
    
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=" + apiKey;

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data)
                })
            }
        })
};

// function to display ALL results
// call todaysWeather() and fiveDayWeather()

// function to display today's weather
// var todaysWeather = function (userCity) {}

// function to display 5 day forecast
// var fiveDayForecast = function (userCity) {}


// event listener to submit button
submitButton.addEventListener('click', formSubmitHandler);