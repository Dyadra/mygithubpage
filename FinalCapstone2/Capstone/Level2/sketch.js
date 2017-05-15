var bgimg;
var img2;
var gravity = 3
function preload() {
  score = loadJSON("breath.json");
  bgImg = loadImage("img/UpdatedBackground.jpg");
  player1 = loadSpriteSheet('img/playermove.png',24,48,3);
  player_animation1 = loadAnimation(player1);
  
}




  
  function setup() {
    synth = new Tone.PolySynth(4, Tone.Synth, {
    "oscillator": {
      "type": "square"
    },
    "envelope": {
      "attack": 0.03,
      "decay": 0.1,
      "sustain": 0.2,
      "release": 0.6
    }
  }).toMaster();
  Tone.Transport.bpm.value = 90
  Tone.Transport.timeSignature = score.header.timeSignature;

  parts = [];
  for(var i = 0; i < score.tracks.length; i++){
    var notes = score.tracks[i].notes;
    
    if(score.tracks[i].name == "Viola"){
      parts[i] = new Tone.Part(playViola, notes).start(0);
    }
    else{
      parts[i] = new Tone.Part(playNote, notes).start(0);
    }
  }
  
  var notes = score.tracks[0].notes;
  part = new Tone.Part(playNote, notes).start(0);
  
  createCanvas(1000,500);
  // image(img,0,-490,width*2,height*2)
   backgroundSprite= createSprite(500,100,2000,300)
  backgroundSprite.addAnimation("bgImg", bgImg)
  player = createSprite(0,400,50,50)
  Jen = createSprite(0,500,50,50)
  bottomwall = createSprite(600,450,3000,100);
  player.addAnimation("player1", player1)
  player.scale = 2
  bottomwall.immovable = true


}

function draw() {
  camera.position.x = player.position.x;
  player.collide(bottomwall);
  
  if(keyIsDown(RIGHT_ARROW)) {
    //flip horizontally
     player.mirrorX(1);
    //negative x velocity: move left
    player.velocity.x = 4;
  }
  else if(keyIsDown(LEFT_ARROW)) {
    
    //unflip 
    player.mirrorX(-1);
    player.velocity.x = -4;
  }
  
  else if(keyIsDown(UP_ARROW)) {
    // player.mirrory(1);
    player.velocity.y = -2;
    
  }else {
    //if close to the mouse, don't move
    player.velocity.x = 0;
    player.velocity.y = gravity

  }
  
  
 
 

   drawSprites();
  camera.on();
  println(player.position.x);
  
}

function playNote(time, event) {
  
  var messedUpNote = Tone.Frequency(event.name).eval();
  // Tone.Frequency(event.name).add(20);
  synth.triggerAttackRelease(messedUpNote, event.duration, time, event.velocity);
}