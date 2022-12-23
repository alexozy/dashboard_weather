// Variable Declaration
var apiKey = "71d7a3ac04487b24c5d8fe8c53a8bf95";
var cityInput = document.getElementById('searchedC').value;
var dateDisplay = document.querySelector(".date1")
        setInterval(function(){
                dateDisplay.textContent = moment().format('LL')
        })



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
                document.querySelector(".degrees1").innerHTML = temp + " °F";
                document.querySelector(".humidity1").innerHTML = "Humidity: " + humidity + "%";
                document.querySelector(".emoji1").src = "https://openweathermap.org/img/wn/" + icon + ".png";
                document.querySelector(".wind1").innerHTML = "Wind Speed: " + speed + "mph";

        });
},
        fetchNextDay: function(city){
                var fiveDays = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=71d7a3ac04487b24c5d8fe8c53a8bf95"
                fetch(fiveDays)
                .then(function (response){
                return response.json()
                }).then(function (data){
                        console.log(data)
        // five day card innerHTML goes here
                 var plugDate = document.getElementsByClassName("date")
                //   forLoop to cycle through each date class and paste to card;
                //  alternate ways to write a forLoop
                 let i = 0;
                 let length = plugDate.length;
                 for(; i<length; (i++)){
                        var dates = moment.unix(`${data.list[i*8].dt}`).format('LL')
                        var dateP = plugDate[i]
                        dateP.innerHTML = dates

                 }  
                //  humidty Cards    
                 var plugHumidity = document.getElementsByClassName("humidity")
                //   let i = 0;
                //   let lengthH = plugHumidity.length;
                  for(i=0;i<plugHumidity.length; (i++)){
                        var humids =`Humidity: ${data.list[i*8].main.humidity}%`
                        var humidP = plugHumidity[i]
                        humidP.innerHTML = humids
                  }
                //   temp Cards
                var plugDegrees = document.getElementsByClassName("degrees")
                for(i=0;i<plugDegrees.length; (i++)){
                        var degreeS = (`${data.list[i*8].main.temp}°F`)
                        var degreeP = plugDegrees[i]

                        degreeP.innerHTML = degreeS
                  }
                //   emoji Cards
                var plugEmojis = document.getElementsByClassName("emoji")
                for(i=0;i<plugEmojis.length; (i++)){
                        var emojiS = (data.list[i*8].weather[0].icon)
                        var emojisP = ("https://openweathermap.org/img/wn/" + emojiS + ".png")
                        var emojiP = plugEmojis[i]
                        emojiP.src = emojisP
                  }
                //  wind Cards
                var plugWind = document.getElementsByClassName("wind")
                for(i=0;i<plugWind.length; (i++)){
                        var windS = `Wind Speed: ${data.list[i*8].wind.speed} MPH`;
                        var windP = plugWind[i]
                        windP.innerHTML = windS
                  }
                })
                

        
        },


        search: function () {
                this.fetchAttempt(document.querySelector("#searchedC").value)
                this.fetchNextDay(document.querySelector("#searchedC").value)
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
