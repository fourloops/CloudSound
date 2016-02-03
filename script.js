// -------------- GOOGLE API -----------------

var currentLocation;
var marker;

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

// -------------- SOUNDCLOUD API -----------------
