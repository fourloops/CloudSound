// -------------- GOOGLE API -----------------

var currentLocation;
var marker;
var apiResult;
var weatherResult;
var day;

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: 51.5072, lng: 0.1275 }
  });

  map.addListener('click', function(e) {
    placeMarkerAndPanTo(e.latLng, map);
    currentLocation = {
        lat: 'lat=' + e.latLng.lat(),
        lng: '&lon=' + e.latLng.lng()
    }
  });

function placeMarkerAndPanTo(latLng, map) {
    if(marker) marker.setMap(null);
    marker = new google.maps.Marker({
        position: latLng,
        map: map
  });
  map.panTo(latLng);

}

// ------------ WEATHER API -----------------

function weather() {
    var xhr = new XMLHttpRequest(),
        url = "http://api.openweathermap.org/data/2.5/weather?lat=" + currentLocation.lat + '&lon=' +currentLocation.lng + "&appid=" +  secretKeys.weather;
    xhr.open("GET",url,false);
    xhr.send();
    return JSON.parse(xhr.responseText);
}
function getWeather(id){
    if(id<233 || (id<782 && id>623) || id>=956){return "extreme";}
    else if(id<533){return "rain";}
    else if(id<623){return "snow";}
    else if(id<802 || (id>950 && id<956)){return "clear sky";}
    else{return "cloudy sky";}
}
function getTime(sunrise, sunset){
    return Date.now()>sunrise && Date.now()<sunset ? true : false;
}

function changeLocation(){
    apiResult = weather().weather[0].id;
    weatherResult = getWeather(apiResult);
    day = Date.now() > weather().sys.sunrise && Date.now() < weather().sys.sunset ? true : false;
}

// -------------- SOUNDCLOUD API -----------------
