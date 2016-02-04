// global variables for buttons controlling audio-stream
var back   = document.getElementById("back");
var pause  = document.getElementById("pause");
var resume = document.getElementById("resume");
var next   = document.getElementById("next");
var world  = document.getElementById("world");

// event listeners
var weatherQuery = {
    "clear sky":    {tags:["sunny", "sun","optimistic", "sunshine", "hot", "warm", "bright", "cloudless"]},
    "cloudy sky":   {tags:["cloudy","clouds","melancholic","broody","cumulus","overcast"]},
    "snow":         {tags:["white","christmas","snow","cold","frozen","freeze","snowflake"]},
    "extreme":      {tags:["sandstorm","storm","hurricane","tornado","windy"]},
    "rain":         {tags:["wet","sad","tears","breakup","heartbreak","rain","shower"]}
};


//search tags

SC.initialize({
  client_id: secretKeys.soundcloud || prompt("soundcloud user key please")
});

var allTracks;

function getTracks(weather){
    var query     = weatherQuery[weather];
    allTracks = [];
    for (var i = 0; i<query.tags.length; i++) {
        var tag = query.tags[i];
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

var counter = 0;
// WARNING needs to run based on weather result!!
function stream(songObj){
    var trackId = songObj.id;
    var trackUrl = '/tracks/'+trackId;
    SC.stream(trackUrl).then(function(player){
        player.play();
        pause.addEventListener('click',function(){
            player.pause();
        });
        resume.addEventListener('click',function(){
            player.play();
        });
        function nextTrack(){
            counter++;
            stream(allTracks[counter]);
        }
        next.addEventListener('click',function(){
            console.log(songObj.duration);
            player.seek(songObj.duration);
            nextTrack();
        });
    });
}
