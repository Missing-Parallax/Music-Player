let playBtn=document.querySelector(".play-pause");
let progress=document.querySelector('.timeline');
let restart=document.querySelector(".play-begin");
let vol=document.querySelector("#vol-slider")
let mute=document.querySelector(".mute");
let full=document.querySelector(".full");
let loop=document.querySelector(".loop");
let CT=document.querySelector(".current-time");
let TT=document.querySelector(".total-time");
let songs=[
    {
        name: "One Love.mp3",
        cover: "One Love.jpg",
        id:"1"
    }
]

let audio=new Audio("./assets/songs/One Love.mp3")

playBtn.addEventListener('click',()=>{
    if(audio.paused) audio.play();
    else audio.pause();
    playBtn.children[0].classList.toggle("fa-play");
    playBtn.children[0].classList.toggle("fa-pause");
})

audio.addEventListener('timeupdate',()=>{

    let totalMinute=Math.floor(audio.duration/60);
    let totalSecond=Math.floor(audio.duration%60);
    if(totalSecond<10) TT.innerText=`${totalMinute}:0${totalSecond}`;
    else TT.innerText=`${totalMinute}:${totalSecond}`;

    let currentMinute=Math.floor(audio.currentTime/60);
    let currentSecond=Math.floor(audio.currentTime%60);
    if(currentSecond<10) CT.innerText=`${currentMinute}:0${currentSecond}`;
    else CT.innerText=`${currentMinute}:${currentSecond}`;

    let curr=(audio.currentTime/audio.duration)*100;
    progress.value=curr;
    if(curr==100){
        progress.value=0;
        audio.currentTime=0;
        playBtn.children[0].classList.remove("fa-pause");
        playBtn.children[0].classList.add("fa-play");
    }
})

progress.addEventListener('change',()=>{
    audio.currentTime=(progress.value/100)*audio.duration;
    audio.play();
    playBtn.children[0].classList.add("fa-pause");
    playBtn.children[0].classList.remove("fa-play");
})

restart.addEventListener('click',()=>{
    audio.currentTime=0;
})

vol.addEventListener('change',()=>{
    audio.volume=(vol.value/100);
})

mute.addEventListener('click',()=>{
    audio.volume=0;
    vol.value=0;
})
full.addEventListener('click',()=>{
    audio.volume=1;
    vol.value=100;
})

loop.addEventListener('click',()=>{
    audio.loop=!audio.loop;
    if(audio.loop) loop.style.color="black";
    else loop.style.color="rgb(103, 102, 109)";
})

