var apiKey = '71d7a3ac04487b24c5d8fe8c53a8bf95';

// This is Global localStorage
// // JSON.parse converts string back to array | short hand if statement for empty array = ||[]
//you want to getItem first, so the old stuff is saved (did this globally); you can also do within the function but locally is easier for the code
var searchedHistory = JSON.parse(localStorage.getItem("searched")) || [];

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
});

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

// API function for retrieval & display of requested the data:

function weatherStuff (event){
    event.preventDefault()
// save what user searches to cityInput, allows APIs to use, and will push to the array to store in local
    var cityInput = document.getElementById('searchCity').value;
    searchedHistory.push(cityInput);
    localStorage.setItem('lsCities', JSON.stringify(searchedHistory));
    console.log(localStorage);

// fetch weather

fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&units=imperial&appid=71d7a3ac04487b24c5d8fe8c53a8bf95')
.then(function(response){
    return response.json ()
})
.then (function(data){
    for (i=2; i <=6; i++){
        var day = data.list [(i-2)* 8];
        var degrees = document.querySelector('.degrees'+i);
        // placing on the card
        degrees.innerHTML = day.main.temp;
        var humidity = document.querySelector('.humidity'+i);
        humidity.innerHTML = day.main.humidity;
        var date = document.querySelector('.date'+ i);
        date.innerHTML = day.dt_txt;
    }
})

};

// you need to call your function!
var searchProcess = document.getElementById('letsGo');
searchProcess.addEventListener('submit', weatherStuff)