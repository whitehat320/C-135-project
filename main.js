objects = [];
status = "";
video = " ";
search_object = "";

document.getElementById("number_of_objects").innerHTML = search_object + " Not Found";

var msg = new SpeechSynthesisUtterance('Hello World');
window.speechSynthesis.speak(msg);

function preload(){

}

function search(){
    search_object = document.getElementById('input').value;
    console.log(search_object);
}

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video,0,0,480,380);
    if (status != ""){
        objectDetector.detect(video, gotResult);
        search_object = document.getElementById("input").innerHTML;
        console.log(search_object);
        for (i=0; i<objects.length; i++){
            var name = objects[i].label;
    if (object[i].label = search_object){
        console.log("Object found");
        document.getElementById("number_of_objects").innerHTML = search_object + " Found";
        fill("#00FF00");
        percent = floor(objects[i].confidence*100);
        text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
        noFill();
        stroke("#00FF00");
        rect(objects[i].x, objects[i].y, objects[i].width,objects[i].height)

    } else{

            fill("#00FF000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("#00FF00");
            rect(objects[i].x, objects[i].y, objects[i].width,objects[i].height);
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log('model loaded');
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results){
      if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
