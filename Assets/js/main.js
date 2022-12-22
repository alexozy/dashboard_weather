// Variable Declaration
var apiKey = "71d7a3ac04487b24c5d8fe8c53a8bf95";
var cityInput = document.getElementById('searchedC').value;
var dateDisplay = document.querySelector(".date")
        setInterval(function(){
                dateDisplay.textContent = moment().format ("MMMM Do YYYY")
        }),


// Global localStorage
// JSON.parse converts string back to array | short hand if statement for empty array = ||[]
//you want to getItem first, so the old stuff is saved (did this globally); you can also do within the function but locally is easier for the code.
var searchedHistory = JSON.parse(localStorage.getItem("searched")) || [];

// days vars (is there a way for me to create the elements instead of having them already set up in html?)
var currentDay = document.getElementById("toDay");
var firstDay = document.getElementById("day1");
var secondDay = document.getElementById("day2");
var thirdDay = document.getElementById("day3");
var fourthDay = document.getElementById("day4");
var fifthDay = document.getElementById("day5");


// search button append; strategy: grab local, go through it, display it
var displaySearchHistory = function () {
        // clearing saved history before adding something to it
        $(".saveHist").html('');
        for (i = 0; i < searchedHistory.length; i++) {
                //grabbing from an array using variable[i]
                var city = searchedHistory[i]
                var button = $("<button>").addClass("btn btn-primary btn-sm").text(city)
                $(".saveHist").append(button)
        }
};

// local storage clear
var clearLocalStorage = function () {
        localStorage.removeItem("searched");
        $(".saveHist").html('');
        searchedHistory = [];
}
$("#clearH").on('click', clearLocalStorage);

//API retrieval & display of data
// lat/lon https://api.openweathermap.org/data/2.5/weather?q=atlanta&units=imperial&appid=71d7a3ac04487b24c5d8fe8c53a8bf95

let WeatherStuff = {
        fetchAttempt: function (city){
        var currentDay = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=71d7a3ac04487b24c5d8fe8c53a8bf95" 
        fetch(currentDay).then(function (response) {
                
        return response.json()
        // this is the information for the FIRST weather card. the classes will be different for this one
        }).then(function (data) {
                var { name } = data;
                var { icon, description } = data.weather[0];
                var { temp, humidity } = data.main;
                var { speed } = data.wind;
                var { lon, lat } = data.coord;
                console.log(name, icon, temp, speed, lon, lat);
                document.querySelector(".cityN").innerText = name;
                document.querySelector(".degrees1").innerHTML = temp + "°F";
                document.querySelector(".humidity1").innerHTML = "Humidity:" + humidity + "%";

        });
},


        search: function () {
                this.fetchAttempt(document.querySelector("#searchedC").value)
        }
};

// target search button; html button #addCities
var searched = document.getElementById("searchedC");
// city saved to to search history (local storage setItem?)
$("form").submit(function (event) {
        event.preventDefault()
        var searchedCity = $(this).find("input").val();
        //make sure search history is always an array
        //add new search to the array of old stuff locationtoaddto.push(new thing you want to add)
        searchedHistory.push(searchedCity)
        //JSON.stringify turns the userinputs into a string. We use JSON.parse to return it back to an array we can use.
        localStorage.setItem("searched", JSON.stringify(searchedHistory));
        console.log(searchedCity)
        displaySearchHistory()
        WeatherStuff.search();
});

// create an if to target a specific time// would be


// // putting information on my cards
//         // pulling info from the API/JSON page
//         var {name} = data;
//         var {speed} = data.wind;
//         var {temp, humidity} = data.main;
//         var {lon,lat} = data.coord;
//         console.log(name, speed)

//         //querySelector (string concat within query selectors)
//         var cities = (city)
//         console.log (cities)
//         $(".card-header" + cities).text

//         var lat = data.coord.lat
//         var lon = data.coord.lon
//         var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey

//         fetch(fiveDay).then(function (response) {
//                 return response.json()
//         }).then(function (data) {
//                 // If statement goes here for specific time
//                 console.log(data)
//                 var day = 1
//                 // forLoop
//                 $(".temp" + day).text
//         })