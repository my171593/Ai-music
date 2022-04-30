scorerightwrist=0;
song="";
song1="";
song2status="";
song1status="";
leftwristx=0;
rightwristy=0;
leftwristy=0;
scoreleftwrist=0;
rightwristx=0;
function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
posenet=ml5.poseNet(video,modelLoaded);
posenet.on("pose",gotPoses);
}

function preload(){
song=loadSound("music.mp3");
song1=loadSound("music2.mp3");
}

function draw(){
image(video,0,0,600,500);
song1status=song.isPlaying();
song2status=song1.isPlaying();
fill("red");
stroke("red");
if(scorerightwrist>0.2){


circle(rightwristx,rightwristy,20);
song1.stop();
if(song1status==false){
song.play();
document.getElementById("status").innerHTML="song1playing";    
}
    }
if(scoreleftwrist>0.2){
circle(leftwristx,leftwristy,20);
song.stop();
if(song2status==false){
    song1.play();
    document.getElementById("status").innerHTML="song2playing";    
    }
}
}
 
function play(){
song.play();
song.setVolume(1);
song.rate(1);    
}

function modelLoaded(){
console.log("model is Loaded");
}

function gotPoses(results){
if(results.length>0){
console.log(results);
leftwristx=results[0].pose.leftWrist.x;
leftwristy=results[0].pose.leftWrist.y; 
rightwristx=results[0].pose.rightWrist.x;
rightwristy=results[0].pose.rightWrist.y;
scoreleftwrist=results[0].pose.keypoints[9].score;
console.log(scoreleftwrist); 
scorerightwrist=results[0].pose.keypoints[10].score;
console.log(scorerightwrist);    
}        
}