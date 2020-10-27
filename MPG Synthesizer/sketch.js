///////////GUI variables/////////
var myFont = "";
var buttons = [];
var sliders = [];
var masterVolume;


/////////Sound variables////////

//audio context variables
var audio;
var isAudioInit;


//metronome variables
var timer, currentPhase, isTriggered, playhead;

//declare variables for click
var click, isClick, clickBeats;
var beep, isBeep, beepBeats;
var bass, isBass, bassBeats;
var hat, isHat, hatBeats;
var owl, isOwl, owlBeats;
var windblast, isWindblast, windblastBeats;
var echo, isEcho, echoBeats;
var tick, isTick, tickBeats;
var bang, isBang, bangBeats;

////////////////PITCH CONTROLS////////////
var pitchControl = new maximJs.maxiPitchShift();
//var timeStretching = new maxiJs.maxiTimeStretch();



//Load assets including sound here
function preload() {
    myFont = loadFont('assets/spaceage.otf');

}


function setup() {

    masterVolume = 0.5;
    
    pitchControl = 1;

    createCanvas(windowWidth, windowHeight);

    //create the GUI controls

    for (var y = 0; y < 3; y++) {
        for (var x = 0; x < 3; x++) {
            buttons.push(new Button(
                    300 + x * 120, //x position
                    200 + y * 120, //y position
                    100) // button size
            );
        }
    }

    for (var i = 0; i < 3; i++) {
        sliders.push(new VSlider(60 + i * 60, 250, 30, 200));
    }

    //This is where the button events are manipulated

    //I've made the first three but you will need to make the rest
    buttons[0].onPressed = button_0_Pressed;
    buttons[1].onPressed = button_1_Pressed;
    buttons[2].onPressed = button_2_Pressed;
    buttons[3].onPressed = button_3_Pressed;
    buttons[4].onPressed = button_4_Pressed;
    buttons[5].onPressed = button_5_Pressed;
    buttons[6].onPressed = button_6_Pressed;
    buttons[7].onPressed = button_7_Pressed;
    buttons[8].onPressed = button_8_Pressed;

    //This is where the slider events are manipulated

    //I've created one but you will need to create the others
    sliders[0].onSlide = slider_0_Moved;

    sliders[1].onSlide = slider_1_Moved;
    
//    sliders[2].onSlide = slider_2_Moved;
    
    
    
    
    isAudioInit = false;
    audio = new maximJs.maxiAudio();
    audio.play = audioOut;

    timer = new maximJs.maxiOsc(); //we will use this as a very accurate metronome
    playhead = 0;

    //initialise variables for click
    click = new maximJs.maxiSample();
    isClick = false;
    clickBeats = [
		1, 0, 0, 0,
		1, 0, 0, 0,
		1, 0, 0, 0,
		1, 0, 0, 0
	];

    beep = new maximJs.maxiSample();
    isBeep = false;
    beepBeats = [
		1, 0, 0, 0,
		1, 0, 0, 0,
		1, 0, 1, 0,
		1, 0, 1, 0
	];

    bass = new maximJs.maxiSample();
    isBass = false;
    bassBeats = [
		1, 0, 0, 0,
		1, 0, 0, 0,
		1, 0, 1, 0,
		1, 0, 1, 0
	];

    hat = new maximJs.maxiSample();
    isHat = false;
    hatBeats = [
		1, 1, 0, 1,
		1, 0, 1, 0,
		1, 0, 1, 0,
		1, 0, 1, 0
	];

    hellohat = [0.3, 0.3, 0, 0.9,
		0.8, 0.3, 0, 0.1,
		0.8, 0.3, 0, 0.5,
		0.8, 0.4, 0, 0.9];

    owl = new maximJs.maxiSample();
    isOwl = false;
    owlBeats = [
		1, 0, 1, 0,
		1, 1, 1, 1,
		1, 0, 1, 0,
		1, 1, 1, 1
	];

    windblast = new maximJs.maxiSample();
    isWindblast = false;
    windblastBeats = [
    		1, 0, 0, 0,
    		1, 0, 0, 0,
    		1, 0, 0, 0,
    		1, 0, 0, 0
    	];
    echo = new maximJs.maxiSample();
    isEcho = false;
    echoBeats = [
    		1, 0, 1, 0,
    		1, 0, 1, 0,
    		1, 0, 1, 0,
    		1, 0, 1, 0
    	];
    tick = new maximJs.maxiSample();
    isTick = false;
    tickBeats = [
    		1, 1, 0, 1,
    		1, 0, 1, 0,
    		1, 1, 0, 0,
    		1, 0, 1, 0
    	];

    bang = new maximJs.maxiSample();
    isBang = false;
    bangBeats = [
    		1, 0, 1, 0,
    		1, 0, 1, 0,
    		1, 0, 1, 0,
    		1, 0, 1, 0
    	];

}


function initAudio() {
    isAudioInit = true;
    audio.init();
    audio.loadSample("assets/click.mp3", click);
    audio.loadSample("assets/beep.mp3", beep);
    audio.loadSample("assets/bass.mp3", bass);
    audio.loadSample("assets/hat.mp3", hat);
    audio.loadSample("assets/owl.mp3", owl);
    audio.loadSample("assets/windblast.mp3", windblast);
    audio.loadSample("assets/tick.mp3", tick);
    audio.loadSample("assets/echo.mp3", echo);
    audio.loadSample("assets/bang.mp3", bang);



}


function audioOut() {

    var sampleOut = 0;

    //this sets up a metronome that ticks 8 times a second
    //the output goes from 0 -> 1 and then drops immediately back to 0
    currentPhase = timer.phasor(8);

    if (currentPhase < 0.5 && !isTriggered) {
        playhead = playhead + 1; //increment playhead

        if (playhead > 15) {
            playhead = 0; //set playhead back to zero to create a cycle of 16
        }

        isTriggered = true; //we set this so that playhead doesn't increment anymore for this cycle of currentPhase

        //this is where we trigger samples
        if (clickBeats[playhead] == 1) {
            click.trigger(); // reset to the beginning of sample
        }
        if (beepBeats[playhead] == 1) {
            beep.trigger(); // reset to the beginning of sample
        }
        if (bassBeats[playhead] == 1) {
            bass.trigger(); // reset to the beginning of sample
        }
        if (hatBeats[playhead] == 1) {
            hat.trigger(); // reset to the beginning of sample
        }
        if (owlBeats[playhead] == 1) {
            owl.trigger();
        }
        if (windblastBeats[playhead] == 1) {
            windblast.trigger();
        }
        if (echoBeats[playhead] == 1) {
            echo.trigger();
        }
        if (tickBeats[playhead] == 1) {
            tick.trigger();
        }

        if (bangBeats[playhead] == 1) {
            bang.trigger();
        }




    } else if (currentPhase > 0.5) {
        isTriggered = false; //reset the trigger ready for the next beat
    }

    //this is where we output the sounds
    var clickOut = click.playOnce(2.0);

    if (isClick) {
        sampleOut += clickOut;
    }

    this.output = sampleOut;

    var beepOut = beep.playOnce(1.5);

    if (isBeep) {
        sampleOut += beepOut;
    }
    this.output = sampleOut;

    var bassOut = bass.playOnce();

    if (isBass) {
        sampleOut += bassOut;
    }

    var hatOut = hat.playOnce() * hellohat[playhead];

    if (isHat) {
        sampleOut += hatOut;

    }
    var owlOut = owl.playOnce(2.0);

    if (isOwl) {
        sampleOut += owlOut;
    }

    var windblastOut = windblast.play(pitchControl);

    if (isWindblast) {
        sampleOut += windblastOut * pitchControl ;
    }

    var echoOut = echo.play(1.0);

    if (isEcho) {
        sampleOut += echoOut;
    }
    var tickOut = tick.play(pitchControl);

    if (isTick) {
        sampleOut += tickOut * pitchControl;
    }


    var bangOut = bang.play(2.0);

    if (isBang) {
        sampleOut += bangOut;
    }

    this.output = sampleOut * masterVolume;


}

//////////////////////////////////BUTTON EVENTS/////////////////////////////

function button_0_Pressed() {
    if (buttons[0].isActive) {
        isClick = true;
    } else {
        isClick = false;
    }

}

function button_1_Pressed() {
    if (buttons[1].isActive) {
        isBeep = true;
    } else {
        isBeep = false;
    }
}

function button_2_Pressed() {
    if (buttons[2].isActive) {
        isBass = true;
    } else {
        isBass = false;
    }
}


function button_3_Pressed() {
    if (buttons[3].isActive) {
        isHat = true;
    } else {
        isHat = false;
    }
}

function button_4_Pressed() {
    if (buttons[4].isActive) {
        isOwl = true;
    } else {
        isOwl = false;
    }
}

function button_5_Pressed() {
    if (buttons[5].isActive) {
        isWindblast = true;
    } else {
        isWindblast = false;
    }
}

function button_6_Pressed() {
    if (buttons[6].isActive) {
        isEcho = true;
    } else {
        isEcho = false;
    }
}

function button_7_Pressed() {
    if (buttons[7].isActive) { 
        isTick = true;
    } else {
        isTick = false;
    }
}

function button_8_Pressed() {
    if (buttons[8].isActive) {
        isBang = true;
    } else {
        isBang = false;
    }
}




//////////////////////////////////SLIDER EVENTS///////////////////////////////

function slider_0_Moved() {
    masterVolume = sliders[0].value;
}
function slider_1_Moved() {
    pitchControl = sliders[1].value;
}

//function slider_2_Moved() {
//    timeStretching = sliders[2].value;
//}




////////////////////////////////////////////////////////////////////////////////

function draw() {

    background(0);

    if (!isAudioInit) {
        push();
        textAlign(CENTER);
        textFont('Arial');
        fill(255);
        textSize(32);
        text("press any key to begin", width / 2, height / 2);
        pop();

        return;
    }


    fill('#ED225D');
    textFont(myFont);
    textSize(70);
    text('MPG', 10, 80);

    fill(255);
    stroke(255);

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].draw();
    }

    for (var i = 0; i < sliders.length; i++) {
        sliders[i].draw();
    }


}



//////////////////////////////////////EVENTS & CALLBACKS//////////////////////////////

function keyPressed() {
    if (!isAudioInit) {
        initAudio();
    }
}


function mousePressed() {


    if (!isAudioInit) return;

    //work out if a button has been pressed
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].isInside(mouseX, mouseY)) {
            buttons[i].press();
            break;
        }
    };

}

function mouseDragged() {

    if (!isAudioInit) return;

    for (var i = 0; i < sliders.length; i++) {
        if (sliders[i].isInside(mouseX, mouseY)) {
            sliders[i].slide(mouseY);
            break;
        }
    }
}


/////////////////////////////////////GUI//////////////////////////////////

//this is a constructor for the buttons

function Button(center_x, center_y, dim) {
    this.width = dim;
    this.height = dim;
    this.topLeft = createVector(center_x - this.width / 2, center_y - this.height / 2);
    this.bottomRight = createVector(center_x + this.width / 2, center_y + this.height / 2);
    this.isActive = false;
    this.onPressed = undefined;

    this.draw = function () {
        stroke(255);

        if (this.isActive) {
            if (frameCount % 10 > 5) {
                fill(255, 0, 0);
            } else {
                fill(100, 0, 0);
            }
        } else {
            fill(0, 255, 0);
        }

        rect(this.topLeft.x, this.topLeft.y, this.width, this.height)
    }

    this.isInside = function (x, y) {
        if (x > this.topLeft.x && x < this.bottomRight.x) {
            if (y > this.topLeft.y && y < this.bottomRight.y) {
                return true;
            }
        }

        return false;
    }

    this.press = function () {
        this.isActive = !this.isActive;
        if (this.onPressed != undefined) this.onPressed();
    }

}


//this is a constructor for the sliders

function VSlider(x, y, width, height) {
    this.width = width;
    this.height = height;
    this.topLeft = createVector(x, y);
    this.bottomRight = createVector(x + this.width, y + this.height);
    this.onSlide = undefined;
    this.value = 0.0;

    this.draw = function () {

        stroke(255);
        fill(100);
        rect(this.topLeft.x, this.topLeft.y, this.width, this.height);
        fill(150);

        rect
            (
                this.topLeft.x,
                this.bottomRight.y - this.height * this.value,
                this.width,
                this.height * this.value
            );
    }

    this.isInside = function (x, y) {
        if (x > this.topLeft.x && x < this.bottomRight.x) {
            if (y > this.topLeft.y && y < this.bottomRight.y) {
                return true;
            }
        }

        return false;
    }

    this.slide = function (y) {
        this.value = (this.bottomRight.y - y) / this.height;
        if (this.onSlide != undefined) this.onSlide();
    }

}
