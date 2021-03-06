// global variables for buttons controlling audio-stream
var back   = document.getElementById("back");
var pause  = document.getElementById("pause");
var resume = document.getElementById("resume");
var next   = document.getElementById("next");
var song = document.getElementById("currentSong");

// event listeners
var weatherQuery = {
    "clear sky":    {tags:["sunny", "sun", "optimistic", "sunshine", "hot", "warm", "bright", "cloudless", "positive", "flying", "upbeat"]},
    "cloudy sky":   {tags:["cloudy", "clouds", "melancholic", "broody", "grey", "overcast", "threatening", "menacing", "depressed", "uncertain", "nostalgic"]},
    "snow":         {tags:["white", "christmas", "snow", "cold", "frozen", "freeze", "snowflake", "dreamy", "atmospheric", "reflective", "playful"]},
    "extreme":      {tags:["sandstorm", "storm", "hurricane", "tornado", "windy", "anger", "fury", "shithappens"]},
    "rain":         {tags:["wet", "sad", "tears", "breakup", "heartbreak", "rain", "shower", "cry", "crying", "lonely"]}
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
                if( tracks[j].original_format === 'mp3'){
                    allTracks.push(tracks[j]);
                }
            }
        });
    }
    shuffle(allTracks);
    console.log('shuffled');
}

function shuffle(array) {
  var currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    var randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex --;

    // And swap it with the current element.
    var temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function stream(songObj,counter){
    song.innerHTML = "";

    var songLink        = document.createElement("a");
    songLink.innerHTML  = songObj.title;
    songLink.href       = songObj.permalink_url;
    songLink.target     = "_blank";
    song.appendChild(songLink);

    var trackId = songObj.id;
    var trackUrl = '/tracks/'+trackId;

    SC.stream(trackUrl).then(function(player){
        function play(){
            setTimeout(function(){
                player.play();
            },500);
            pause.classList.remove("paused");
            resume.classList.add("paused");
        }
        player.seek(0);
        play();
        console.log(songObj.id);
        pause.addEventListener('click',function(){
            player.pause();
            resume.classList.remove("paused");
            pause.classList.add("paused");
        });
        resume.addEventListener('click',function(){
            play();
        });
        function changeSong(){
            player.pause();
            player.seek(songObj.duration);
            setTimeout(function(){
                stream(allTracks[counter]);
                console.log(counter+"n.1");
            },500);
        }

        function nextTrack(){
            if(counter < allTracks.length){
                counter++;
                changeSong();
            }
        }
        function prevTrack(){
            if(counter > 0){
                counter--;
                changeSong();
            }
        }
        next.addEventListener('click',function(){
            nextTrack();
        });
        back.addEventListener('click',function(){
            prevTrack();
        });

    });
}

function cloudSound(weatherResult){
    getTracks(weatherResult);
    setTimeout (function(){
        stream(allTracks[0],0);
    }, 1000);
}
