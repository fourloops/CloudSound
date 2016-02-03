function weather(city) {
    var xhr = new XMLHttpRequest(),
        url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid="+secretKeys.weather;
    xhr.open("GET",url,false);
    xhr.send();
    return JSON.parse(xhr.responseText);
}
