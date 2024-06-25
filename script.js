const now_playing=document.querySelector('.now-playing')
const track_art=document.querySelector('.track-art')
const track_name=document.querySelector('.track-name')
const track_artist=document.querySelector('.track-artist')
const random=document.querySelector('.random-track')
const prev=document.querySelector('.prev-track')
const play =document.querySelector('.play-pause')
const next=document.querySelector('.next-track')
const seek=document.querySelector('.seek_slider')
const volume_slider =document.querySelector('.volume_slider')
const time=document.querySelector('.time')
const curr_duration=document.querySelector('.duration')
let wave=document.getElementById('wave')
let curr_track=document.createElement('audio')
let icon=document.querySelector('.fa-random')
let track_index=0;
let isplaying=false;
let israndom=false;
let updatetime;
const darkmode=document.getElementById('darkModeToggle')
const list=[
    {
img:'asset/arjan.jpg'
        ,name:' arjan vailley'
        ,artist : 'Bhupinder Babbal',
music:'music/Arjan.mp3'
    },
    {
        img:'asset/apa1.jpg'
        ,name:' Apa-Fer-Milangae'
        ,artist : 'Savi Kahlon',
music:'music/Apa-Fer.mp3'
    },
    {
        img:'asset/splendorr.jpg'
        ,name:' Splendor'
        ,artist : 'Harsh Likhari',
music:'music/Splendor.mp3'
    },
    {
        img:'asset/lalkara.jpg'
                ,name:' Lalkara'
                ,artist : 'Diljit Dosanjh',
        music:'music/lalkara.mp3'
            },
            {
                img:'asset/Khutti.jpg'
                        ,name:' Khutti'
                        ,artist : 'Diljit Dosanjh',
                music:'music/Khutti - Diljit Dosanjh.mp3'
                    },
]

loadtrack(track_index)

function loadtrack(track_index){
    clearInterval(updatetime)
    reset()
    curr_track.src=list[track_index].music
curr_track.load()

track_art.style.backgroundImage="url(" + list[track_index].img+")"

track_name.textContent=list[track_index].name;

track_artist.textContent=list[track_index].artist
now_playing.textContent="playing music "+(track_index+ 1)+" of "+ list.length
updatetime=setInterval(setUpdate, 1000)
curr_track.addEventListener('ended',nextTrack)

darkmode.addEventListener('click',random_bg_color())
}
function random_bg_color(){
    let hex=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e']
 
    function populate(a){
        for(let i=0;i<8;i++){
            let x=Math.round(Math.random() *14)
            let y=hex[x]
            a+=y
        }
        return a;
    }
    let color1=populate('#')
    let color2=populate('#')
    let angle='to right'
    let gradient='linear-gradient('+angle+','+color1+ ',' +color2 + ")"
    document.body.style.background=gradient
}
function reset(){
    time.textContent="00:00"
    curr_duration.textContent='00:00'
    seek.value=0
}
function randomTrack(){
    israndom?pauserandom():playrandom()
}
function playrandom(){
    israndom=true;
icon.classList.add('randomActive')
}
function pauserandom(){
    israndom=false
    icon.classList.remove('randomActive')
}
function repeatTrack(){
     let curr_index=track_index
     loadtrack(curr_index)
     playTrack()
}
function playpauseTrack(){
    isplaying ? pauseTrack(): playTrack()
}
function playTrack(){
    curr_track.play()
    isplaying=true;
    track_art.classList.add('rotate')
    wave.classList.add('loader');
   play.innerHTML='<i class="fa fa-pause-circle fa-3x"></i>    '
}
function pauseTrack(){
    curr_track.pause()
    isplaying=false
    track_art.classList.remove('rotate')
    wave.classList.remove('loader')
    play.innerHTML='<i class="fas fa-play-circle fa-3x"></i>    '
}
function nextTrack(){
    if(track_index<list.length-1 && israndom===false){
        track_index+=1;

    }else if(track_index < list.length-1 && israndom===true){
        let random_index=Number.parseInt(Math.random() * list.length)
        track_index=random_index
    }else{
        track_index=0
    }
    loadtrack(track_index)
    playTrack()
}
function prevTrack(){
if(track_index > 0){
    track_index-=1

}else{
    track_index=list.length-1
}
loadtrack(track_index)
playTrack()
}
function seekTo(){
    let seekto=curr_track.duration * (seek.value/100)
    curr_track.currentTime=seekto
}
function setVolume(){
    curr_track.volume=volume_slider.value/100
}
function setUpdate(){
    let seekPosition=0;
    if(!isNaN(curr_track.duration)){
        seekPosition=curr_track.currentTime*(100/curr_track.duration)
        seek.value=seekPosition
        let currMin=Math.floor(curr_track.currentTime/60)
        let cursec=Math.floor(curr_track.currentTime-currMin*60)
        let durmin=Math.floor(curr_track.duration/60)
        let dursec=Math.floor(curr_track.duration - durmin* 60)
        if(cursec<10){cursec='0'+cursec}
        if(dursec<10){dursec='0'+dursec}
        if(currMin<10){currMin='0'+currMin}
        if(durmin<10){durmin='0'+durmin}
        time.textContent=currMin+":"+cursec
        curr_duration.textContent=durmin+":"+durmin
    }
}
