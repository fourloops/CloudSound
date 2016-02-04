// global variables for buttons controlling audio-stream
var back   = document.getElementById("back");
var pause  = document.getElementById("pause");
var resume = document.getElementById("resume");
var next   = document.getElementById("next");
var world  = document.getElementById("world");

// event listeners
var weatherQuery = {
    "clear sky": {tags:["sunny", "sun", "sunshine", "hot", "warm", "bright", "cloudless"]},
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

function getTracks(weather){
    var query     = weatherQuery[weather];
    var allTracks = [];
    for (var i = 0; i<query.tags.length; i++) {
        var tag = query.tags[i];
        console.log(tag);
        SC.get('/tracks',{
            q:  tag
        }).then(function(tracks){
                    // pushh all tracks to allTracks
            for(j=0;j<tracks.length;j++){
                allTracks.push(tracks[i]);
            }
        });
    }
    return allTracks;
}



// WARNING needs to run based on weather result!!

function play(songObj){
    var trackId = songObj.id;
    var trackUrl = '/tracks/'+trackId;
    console.log(trackUrl);
    SC.stream(trackUrl).then(function(player){
      player.play();
    });

    // SC.stream(trackUrl, function(sound) {
    //     SC.sound = sound;
    // });
    // SC.sound.play();

}
