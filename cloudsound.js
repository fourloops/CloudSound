// global variables for buttons controlling audio-stream
var back   = document.getElementById("back");
var pause  = document.getElementById("pause");
var resume = document.getElementById("resume");
var next   = document.getElementById("next");
var world  = document.getElementById("world");

// event listeners
var weatherQuery = {
    "clear sky":['jazz'],
    "few clouds":[""],
    "scattered clouds":[],
    "broken clouds":[],
    "shower rain":[],
    "rain":[],
    "thunderstorm":[],
    "snow":[],
    "mist":[]
};


//search tags

SC.initialize({
  client_id: secretKeys.soundcloud || prompt("soundcloud user key please")
});

function getTracks(tags){
    var secretKey = secretKeys.soundcloud || prompt("soundcloud user key please");
    var url = 'https://api.soundcloud.com/tracks?client_id='+secretKey+'&genres='+tags;
    var xhr = new XMLHttpRequest();

    // xhr.onreadystatechange = function() {
    //     // if(xhr.readyState === 4 && xhr.status === 200) {
    //
    //     // }
    // };
    xhr.open('GET',url,false);
    xhr.send();
    return JSON.parse(xhr.responseText);
}

function cloudQuery(weatherResult){
    var res = [];
    for (var meteo in weatherQuery) {
        if (meteo === weatherResult) {
            var tags = weatherQuery[meteo];
            for (var i = 0; i<tags.length; i++) {
                res = res.concat(getTracks(tags[i]));
            }
        }
    }
    return res;
}

// WARNING needs to run based on weather result!!

function play(songObj){
    var trackUrl = songObj.uri.replace("https://api.soundcloud.com","")+'/';
    SC.stream(trackUrl).then(function(player){
      player.play();
    });
    
    // SC.stream(trackUrl, function(sound) {
    //     SC.sound = sound;
    // });
    // SC.sound.play();

}

function resume(){
    // necessary??
    var current = '/tracks/219980056/';
    play(current);
}






// // find all sounds of buskers licensed under 'creative commons share alike'
// SC.get('/tracks', {
//   q: 'buskers', license: 'cc-by-sa'
// }).then(function(tracks) {
//     var track1 = tracks[0];
//     console.log(track1);
// });


// //search bpm
//
// SC.initialize({
//   client_id: 'YOUR_CLIENT_ID'
// });
//
// // find all tracks with the genre 'punk' that have a tempo greater than 120 bpm.
// SC.get('/tracks', {
//   genres: 'punk', bpm: { from: 120 }
// }).then(function(tracks) {
//   console.log(tracks);
// });


// // player no widget
//
// SC.initialize({
//   client_id: 'YOUR_CLIENT_ID'
// });
//
// // stream track id 293
