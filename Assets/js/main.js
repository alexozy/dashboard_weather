// Variable Declaration
var apiKey = "71d7a3ac04487b24c5d8fe8c53a8bf95";
// Global localStorage
var searchedHistory = JSON.parse(localStorage.getItem("searched"))||[];

// days vars (is there a way for me to create the elements instead of having them already set up in html?)
var currentDay = document.getElementById("toDay");
var firstDay = document.getElementById("day1");
var secondDay = document.getElementById("day2");
var thirdDay = document.getElementById("day3");
var fourthDay = document.getElementById("day4");
var fifthDay = document.getElementById("day5");

// target search button
// html button #addCities
var searched = document.getElementById("searchedC");

// $("#addCities").on("click",function () {
        //         var value =$(this).sibling("#searchedC").val();
        //         console.log(value)
        //         var key = $(this).parent.attr("id");
        //         localStorage.setItem(key,value);
        
        // });
        
// city saved to to search history (local storage setItem?)
$("form").submit( function (event) {
         event.preventDefault()
       var searchedCity = $(this).find("input").val();
//        you want to getItem first, so the old stuff is saved
// JSON.parse converts string back to array | short hand if statement for empty array = ||[]
//        var searchedHistory = JSON.parse(localStorage.getItem("searched"))||[];
//        make sure search history is always an array
//        add new search to the array of old stuff locationtoaddto.push(new thing you want to add)
       searchedHistory.push(searchedCity)
//        JSON.stringify turns the inputs into a string. We use JSON.parse to return it back to an array we can use.
       localStorage.setItem("searched", JSON.stringify(searchedHistory));
       console.log(searchedCity)
       displaySearchHistory()
});

// search button append
// grab local, go through it, display it
var displaySearchHistory = function(){
        // clearing saved history before adding something to it
        $(".saveHist").html('');
   for(i=0;i<searchedHistory.length;i++){
//        grabbing from an array
var city = searchedHistory[i]
var button = $("<button>").addClass("btn btn-primary btn-sm").text(city)
$(".saveHist").append(button)
   }

};
// local storage clear
var clearLocalStorage = function(){
        localStorage.removeItem("searched");
        $(".saveHist").html('');
        searchedHistory=[];
}
$("#clearH").on('click', clearLocalStorage);


// saving array to local storage
// save city to local storage first, then create a function to get city names from localS
// have that append/dynamically add buttons


// local storage getItem saved to button

// search history to append history results

//API retrieval & display of data
