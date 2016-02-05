// -------------- GOOGLE API -----------------
// ------ Declares variables & creates google api script with secret key
var currentLocation,
    marker,
    hidden = false,
    weatherResult,
    day,
    response;
    googleScript = document.createElement('script');

googleScript.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=' + secretKeys.google + '&signed_in=true&callback=initMap');
document.body.appendChild(googleScript);

// ------ Creates map and adds click listener (initMap called by api script tag)

function initMap() {
    //creates the map centered on London with satellite view and a crosshair cursor
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {lat: 51.5072, lng: 0.1275 },
        mapTypeId: google.maps.MapTypeId.HYBRID,
        draggableCursor:'crosshair'
    });
    //Adds a click function to place marker and stores latitude and longitude of marker for use in weather api
    map.addListener('click', function(e) {
        placeMarkerAndPanTo(e.latLng, map);
        currentLocation = {
            lat: '' + e.latLng.lat(),
            lng: '' + e.latLng.lng()
        };
        weather();
    });
}

//------ Places marker on map and pans to given latitude/longitude -------------

function placeMarkerAndPanTo(latLng, map) {
    if(marker) { marker.setMap(null); }
    marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
    map.panTo(latLng);
}

// ------------ WEATHER API -----------------
// ----- Creates new XMLHttpRequest, assigns returned JSON object to response---

function weather(){
    var xhr = new XMLHttpRequest(),
        url = "http://api.openweathermap.org/data/2.5/weather?lat=" + currentLocation.lat + '&lon=' +currentLocation.lng + "&appid=" +  secretKeys.weather;
    //
    xhr.addEventListener("load",function() {
        //defines the json object
        response = JSON.parse(xhr.responseText);
        //if date.now is between sunrise and sunset (daytime) in local lat, long assign day as 'day' else 'night'
        day = Date.now()/1000 > response.sys.sunrise && Date.now()/1000 < response.sys.sunset ? 'day' : 'night';
        //extracts weather id from response object and parsing it using the getWeather function below
        weatherResult = getWeather(response.weather[0].id);
        //Updates the info div with location, temperature and weather
        updateInfo();
        //Calls cloudSound function passing it with the weather result variable eg. "rain", waiting half a second
        //to ensure asynchronous SoundCloud API runs at the right time
        setTimeout(cloudSound(weatherResult),500);
        //Toggle map function hides the map and shows info div, occurring after 1 second
        setTimeout(toggleMap,1000);
    });
    xhr.open("GET", url);
    xhr.send();
}

// ----- Translates returned weather ID to specific category --------
//getWeather changes the background depending on the weather and whether it is day or night
//and returns weather result as a string for cloudSound function above
function getWeather(id){
    if(id<233 || (id<782 && id>623) || id>=956){
        document.body.style.backgroundImage = day === 'day' ? "url(assets/extremeDay.jpg)" : "url(assets/extremeNight.jpg)";
        return "extreme";
    }
    else if(id<533){
        document.body.style.backgroundImage = day === 'day' ? "url(assets/rainDay.jpg)" : "url(assets/rainNight.jpg)";
        return "rain";
    }
    else if(id<623){
        document.body.style.backgroundImage = day === 'day' ? "url(assets/snowDay.jpg)" : "url(assets/snowNight.jpg)";
        return "snow";
    }
    else if(id<802 || (id>950 && id<956)){
        document.body.style.backgroundImage = day === 'day' ? "url(assets/clearSkyDay.jpg)" : "url(assets/clearSkyNight.jpeg)";
        return "clear sky";
    }
    else{
        document.body.style.backgroundImage = day === 'day' ? "url(assets/cloudySkyDay.jpg)" : "url(assets/cloudySkyNight.jpg)";
        return "cloudy sky";
    }
}

document.getElementsByClassName("hideButton")[0].addEventListener("click", toggleMap);
//toggleMap hides and unhides the map, the info div and the innerHTML of the hide/show button
function toggleMap(){
    hidden = hidden ? false : true;
    document.getElementsByClassName("map1")[0].classList.toggle("maphide");
    document.getElementsByClassName("info")[0].classList.toggle("infoShow");
    document.getElementsByClassName("hideButton")[0].innerHTML = hidden ? "SHOW MAP" : "HIDE MAP";
}
//updateInfo formats the info div and inputs weather info for the current location
function updateInfo(){
    document.getElementById('area').innerHTML = response.name + ', <em>' + response.sys.country + '<em>';
    document.getElementById('temp').innerHTML = "Temperature: <b>" + (Math.floor(response.main.temp - 273.15)) + '&#8451</b>';
    document.getElementById('condition').innerHTML = "Weather:<b> " + day + ', ' + response.weather[0].description + '</b>';
}
