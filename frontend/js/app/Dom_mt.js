var canvas = document.getElementById('mood_canvas'),
    app = document.getElementById('app'),
    trigger = document.getElementById('trigger'),
    text = document.getElementById('moodText'),
    saveMoodContainer = document.getElementById('saveMood');



var cWidth = app.clientWidth , cHeight = app.clientHeight;

console.log(cWidth,cHeight);


// Three set _> normalisieren des koortinatensystems : client auf 200p !

var ViewPointX = 200 / cWidth,   ViewPointY = 200 / cHeight;

var grad1 = {
    hue: 0,
    saturation: 70,
    light: 70,
    alpha: 1
}
var grad2 = {
    hue: 40,
    saturation: 70,
    light: 70,
    aplha: 1
}

var mouseDirection = {
    oldX: 0,
    oldY: 0,
    right: false,
    down: false
}

var posX,posY;
var c1,c2;

var thresh = 150;

var mood = {
    x: 0,
    y: 0,
    happy: 0,
    sad: 0,
    neutral: 0,
    scared: 0
}

var deltaX = parseInt( posX * ViewPointX ),
    deltaY = parseInt( posY * ViewPointY );

var triggerState = false;

function update(){
    deltaX = parseInt( posX * ViewPointX );
    deltaY = parseInt( posY * ViewPointY );
    //checkMouseDirection(mouseDirection,deltaX,deltaY);
    //console.log(posX,posY,deltaX,deltaY);
    if(!triggerState){
        moveCircle();
        canvas.style.backgroundPositionX = -400 + (-posX*1.5) +'px';
        canvas.style.backgroundPositionY = -300 + (-posY*1.5) +'px';
    }
}



//problem for moodtracker
canvas.addEventListener('mousemove',function(e){
    posX = e.clientX - app.offsetLeft;
    posY = e.clientY - app.offsetTop;
    update();
});

canvas.addEventListener('click',function(){
    if(!triggerState){
        getMood();
        toggleMood();
        trigger.style.backgroundColor = '#fff';
        triggerState = !triggerState;
    }else{
        trigger.style.backgroundColor = 'transparent';
        triggerState = !triggerState;
    }
})

function getMood(){
    mood.x = deltaX;
    mood.y = deltaY;
    mood.happy = 100 - deltaY;
    mood.sad = -100 + deltaY;
    mood.neutral = 100 - deltaX;
    mood.scared = -100 + deltaX;

    console.log(mood);
}

function showMood(){

}

function toggleMood(){
        saveMoodContainer.classList.toggle('hidden');
}


function calculateColor(){

    c1 = "hsl(" + grad1.red + "," + grad1.green + "," + grad1.blue + "," + grad1.alpha + ")";
    c2 = "hsl(" + grad1.red + "," + grad1.green + "," + grad1.blue + "," + grad1.alpha + ")";

    if( deltaY < 100 ){
        changeColor(grad1, deltaX );
        changeColor(grad2, deltaX );
        text.innerHTML = "happy";
    }
    if( deltaX > 130  ){
        changeColor(grad1, deltaY);
        changeColor(grad2, deltaY);
        text.innerHTML = "angry";
    }
    if( deltaX > 100  && deltaY > 100 ){
        changeColor(grad1, deltaY );
        changeColor(grad2,  deltaY );
        text.innerHTML = "sad";
    }

    if( deltaX < 70  ){
        changeColor(grad1,  deltaX );
        changeColor(grad2,  deltaX );
        text.innerHTML = "neutral";
    }

}

function changeColor( obj, dX, dY){

    var x = parseInt(dX/thresh);
    var y = parseInt(dY/thresh);

    if(mouseDirection.down){
       obj.hue -= x ;

    }
    if(!mouseDirection.down){
       obj.hue += x ;

    }

    if(mouseDirection.right){
       obj.hue -= x ;
    }
    if(!mouseDirection.right){
       obj.hue += x ;

    }
}

/*
function changeGradient(gradBegin,gradEnd){
    //console.log(canvas.style.background);
    canvas.style.background = "linear-gradient( hsl( " + gradBegin.hue +"," + gradBegin.saturation + "%," +gradBegin.light + "%)," +
        "hsl( " + gradEnd.hue + "," + gradEnd.saturation + "%," + gradEnd.light + "%))" ;
}
*/
function moveCircle(){
    trigger.style.left = (posX -10 )  + "px";
    trigger.style.top = (posY -10 ) + "px";
}

function checkMouseDirection(oldPos,newX,newY){
    if(oldPos.oldX < newX){
        oldPos.right = true;
        //console.log("right");
    }else{
        oldPos.right = false;
    }
    if(oldPos.oldY < newY){
        oldPos.down = true;
        //console.log("down");
    }else{
        oldPos.down = false;

    }
    oldPos.oldX = newX;
    oldPos.oldY = newY;

}
