// my API key 	
//f99cedebbb9dfe2a651a496535864830



moment().format('L');


function searchCity(cityname) {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=f99cedebbb9dfe2a651a496535864830";
    var queryURLforcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&units=imperial&appid=f99cedebbb9dfe2a651a496535864830";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        console.log(queryURL);
        
        $("#current").empty();
       var mainDate = moment().format('L');
 

       
        var cityNameEl = $("<h2>").text(response.name);
        var displayMainDate = cityNameEl.append(" " + mainDate);
        var tempEL = $("<p>").text("Temperature: " + Math.floor(response.main.temp) + " F°");
        var humEl = $("<p>").text("Humidity: " + Math.floor(response.main.humidity)+"%");
        var windEl = $("<p>").text("Wind Speed: " + Math.floor(response.wind.speed)+"mph");
        
        
        var currentWeather = response.weather[0].main;
        var weatherType =$("<p>").text("Weather: "+ currentWeather);

        if (currentWeather === "Rain") {
            var currentIcon = $('<img>').attr("src", "rainy-7.svg");
            currentIcon.attr("style", "height: 100px; width: 100px");
        } else if (currentWeather=== "Clouds") {
            var currentIcon = $('<img>').attr("src", "cloudy-day-3.svg");
            currentIcon.attr("style", "height: 100px; width: 100px");
        } else if (currentWeather === "Clear") {
            var currentIcon = $('<img>').attr("src", "day.svg");
            currentIcon.attr("style", "height: 100px; width: 100px");
        }
         else if (currentWeather === "Drizzle") {
            var currentIcon = $('<img>').attr("src", "rainy-2.svg");
            currentIcon.attr("style", "height: 100px; width: 100px");
        }
         else if (currentWeather === "Snow") {
            var currentIcon = $('<img>').attr("src", "snowy-6.svg");
            currentIcon.attr("style", "height: 100px; width: 100px");
        }
        else if (currentWeather === "Thunderstorm") {
            var currentIcon = $('<img>').attr("src", "thunder.svg");
            currentIcon.attr("style", "height: 100px; width: 100px");
        }
        else if (currentWeather === "Mist") {
            var currentIcon = $('<img>').attr("src", "rainy-7.svg");
            currentIcon.attr("style", "height: 100px; width: 100px");
        }
        else if (currentWeather === "Tornado") {
            var currentIcon = $('<img>').attr("src", "thunder.svg");
            currentIcon.attr("style", "height: 100px; width: 100px");
        }
        else if (currentWeather === "Haze") {
            var currentIcon = $('<img>').attr("src", "cloudy-day-3.svg");
            currentIcon.attr("style", "height: 100px; width: 100px");
        }

       
        
        var newDiv = $('<div>');

        newDiv.append(displayMainDate, currentIcon, weatherType, tempEL, humEl, windEl);

        $("#current").html(newDiv);
        


var lat = response.coord.lat;
var lon = response.coord.lon;
var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?&appid=ecc0be5fd92206da3aa90cc41c13ca56&lat=" + lat  + "&lon=" + lon;


        $.ajax({
            url: queryURLUV,
            method: 'GET'
        }).then(function (response) {
            $('#uvl-display').empty();
            var uvlresults = Math.floor(response.value);
            
            var uvlEl = $("<button>");
            uvlEl.append("UV Index: " + uvlresults)
      
            $('#uvl-display').html(uvlEl);
            if( uvlresults <3 ){
                uvlEl.attr("style", "background-color: green");
            }
            else if(uvlresults >=3 && uvlresults<= 5 ){
                uvlEl.attr("style", "background-color: yellow");
            }
            else if(uvlresults >=6 && uvlresults<= 7 ){
                uvlEl.attr("style", "background-color: orange");
            }
            else if(uvlresults >=8 && uvlresults<= 10 ){
                uvlEl.attr("style", "background-color: red");
            }
            else if (uvlresults > 11){
                uvlEl.attr("style", "background-color: purple");
            }
        });
    });




    $.ajax({
        url: queryURLforcast,
        method: 'GET'
    }).then(function (response) {
        
        var results = response.list;
        
        $("#5day").empty();
       
        for (var i = 0; i < results.length; i += 8) {
            
            var fiveDayDiv = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 13rem;'>");
            
           
            var date = results[i].dt_txt;
            var pDate = date.substr(0,10)
            var temp = results[i].main.temp;
            var hum = results[i].main.humidity;
            var dateFormat = new Date(pDate);
            var mm =dateFormat.getMonth()+1;
            var yyyy =dateFormat.getFullYear();
            var dd =dateFormat.getDate()+1;

   
           
            var h5date = $("<h5 class='card-title'>").text(mm + "/" + dd +"/" + yyyy);
            var pTemp = $("<p class='card-text'>").text("Temp: " + Math.floor(temp)+ " F°");
            var pHum = $("<p class='card-text'>").text("Humidity " + Math.floor(hum)+"%");
            

            var weather = results[i].weather[0].main
            var pType =$("<p class='card-text'>").text("Weather: "+ weather );

            if (weather === "Rain") {
                var icon = $('<img>').attr("src", "rainy-7.svg");
                icon.attr("style", "height: 40px; width: 40px");
            } else if (weather === "Clouds") {
                var icon = $('<img>').attr("src", "cloudy-day-3.svg");
                icon.attr("style", "height: 40px; width: 40px");
            } 
             else if (weather === "Clear") {
                var icon = $('<img>').attr("src", "day.svg");
                icon.attr("style", "height: 40px; width: 40px");
            }
             else if (weather === "Drizzle") {
                var icon = $('<img>').attr("src", "rainy-2.svg");
                icon.attr("style", "height: 40px; width: 40px");
            }
             else if (weather === "Snow") {
                var icon = $('<img>').attr("src", "snowy-6.svg");
                icon.attr("style", "height: 40px; width: 40px");
            }
            else if (currentWeather === "Thunderstorm") {
                var icon = $('<img>').attr("src", "thunder.svg");
                icon.attr("style", "height: 40px; width: 40px");
            }
            else if (currentWeather === "Mist") {
                var icon = $('<img>').attr("src", "rainy-7.svg");
                icon.attr("style", "height: 40px; width: 40px");
            }
            else if (currentWeather === "Tornado") {
                var icon = $('<img>').attr("src", "thunder.svg");
                icon.attr("style", "height: 40px; width: 40px");
            }
            else if (currentWeather === "Haze") {
                var icon = $('<img>').attr("src", "cloudy-day-3.svg");
                icon.attr("style", "height: 40px; width: 40px");
            }

            
            fiveDayDiv.append(h5date);
            fiveDayDiv.append(icon);
            fiveDayDiv.append(pTemp);
            fiveDayDiv.append(pHum);
            fiveDayDiv.append(pType);
            $("#5day").append(fiveDayDiv);
        }

    });



}
pageLoad();

$("#select-city").on("click", function (event) {
    
    event.preventDefault();
    
    var cityInput = $("#city-input").val().trim();

    
    var textContent = $(this).siblings("input").val();
    var storearr = [];
    storearr.push(textContent);
    localStorage.setItem('cityName', JSON.stringify(storearr));
  
    searchCity(cityInput);
    pageLoad();
});


function pageLoad () {
    var lastSearch = JSON.parse(localStorage.getItem("cityName"));
    var searchDiv = $("<button class='btn border text-muted mt-1 shadow-sm bg-white rounded' style='width: 12rem;'>").text(lastSearch);
    var psearch = $("<div>");
    psearch.append(searchDiv)
    $("#searchhistory").prepend(psearch);
}


$("#searchhistory").on('click', '.btn', function(event) {
event.preventDefault();
    console.log($(this).text());
    searchCity($(this).text());

});
