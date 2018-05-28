//Get user latitude and longitude

var myLongitude = 0;
var myLatitude = 0;
var weather_html;
//spin js plugin
var opts = {
    lines: 13 // The number of lines to draw
    , length: 45 // The length of each line
    , width: 14 // The line thickness
    , radius: 50 // The radius of the inner circle
    , scale: 1 // Scales overall size of the spinner
    , corners: 1 // Corner roundness (0..1)
    , color: '#FFF' // #rgb or #rrggbb or array of colors
    , opacity: 0.25 // Opacity of the lines
    , rotate: 0 // The rotation offset
    , direction: 1 // 1: clockwise, -1: counterclockwise
    , speed: 1 // Rounds per second
    , trail: 60 // Afterglow percentage
    , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
    , zIndex: 2e9 // The z-index (defaults to 2000000000)
    , className: 'spinner' // The CSS class to assign to the spinner
    , top: '50%' // Top position relative to parent
    , left: '50%' // Left position relative to parent
    , shadow: true // Whether to render a shadow
    , hwaccel: false // Whether to use hardware acceleration
    , position: 'absolute' // Element positioning
}
var spinner = new Spinner(opts).spin()

document.getElementById("weather").appendChild(spinner.el);

function gotLocation(loc){
    myLongitude = loc.coords.longitude;
    myLatitude = loc.coords.latitude;

    if (myLatitude !== 0 && myLongitude !== 0){
        getWeatherJSON(function (data) {
            getWeather(data);
        });
        var geocoder = new google.maps.Geocoder();
        var latlong = new google.maps.LatLng(myLatitude,myLongitude);

        geocoder.geocode({
            'latLng': latlong
        }, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                var myPlace = "<h2 class=\"address\">" + results[2].formatted_address + "</h2>";
                document.getElementById('map').innerHTML = myPlace;
            }
        });
    }


}

function failedToGetLocation(message) {
    document.getElementById('weather').innerHTML = "<h1>Getting Location has failed.</h1> <br> <h2>Please reload this page or use a differnet browser</h2>";
}



//Weather JSON call

function getWeatherJSON(dataPassed) {

    var forecaseIoKey = "bb81f8ffe386f2380d9c827715f05b09";
    var JSONurl = "https://api.forecast.io/forecast/"+ forecaseIoKey +"/" + myLatitude + "," + myLongitude + "?units=si";

    $.ajax({
        dataType: "jsonp",
        url: JSONurl,
        success: dataPassed
    });

    console.log(JSONurl);
}


function printLocation(data){

    document.getElementById('weather').innerHTML = weather_html;
}
function getWeather(data) {


    weather_html = "<h1 class=\"summary\">" + data.currently.summary + "</h1>";
    weather_html += "<img class=\"weatherImage\" src=\"img/" + data.currently.icon + ".png\">"
    weather_html += "<h2 class=\"currentTemp\">" + data.currently.temperature + "&deg;C</h2>";
    document.getElementById('weather').innerHTML = weather_html;
};

//wait for the Lat and Long to be grabbed






navigator.geolocation.getCurrentPosition(gotLocation, failedToGetLocation);


//Google Maps



