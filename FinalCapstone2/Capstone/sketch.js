var Video;
var gravity = 2
var interval;
var timer;
var counter = 0
var badie;
var badie2;
var badie3
var a = (255, 255, 255)
var badies1;
var badies2;
var badies3;
x = 50
var myfont;
var stage = 0
var c;
// things to do
//FIX BAD GUYS NUMBER TWO
//ADD SOUND INTERACTIONS WITH BAD GUYS
//UPDATE SCORE ISSUES
//ADD SPEECH BUBBLES!!
//USER TESTING

var img;
var img2;
function preload() {
  
  score = loadJSON("music/breath.json");
  img = loadImage("img/LEVEL1BG.png");
  img2 = loadImage("img/UpdatedBackground.jpg");
  // Sad1 = loadImage("img/SadiesIntros.jpg");
  // Sad2 = loadImage("img/SadiesIntros2.jpg");
  // Sad3 = loadImage("img/SadiesIntros3.jpg");
  // Sad4 = loadImage("img/SadiesIntros4.jpg");
  // Sad5 = loadImage("img/SadiesIntros5.jpg");

  ground = loadImage("img/rockyfloor.png")
  ground2= loadImage("img/ground2.png")
  steps = loadImage("img/ground.png")
  myfont= loadFont('Fonts/timer.ttf');
  player1 = loadSpriteSheet('img/playermove.png',24,48,3);
  player_animation1 = loadAnimation(player1);
  badies1 = loadSpriteSheet('img/badies1.png',48,48,3);
  badies_animation1 = loadAnimation(badies1);
  badiesimage = loadSpriteSheet('img/badies2.png',48,46,3);
  badies_animation2 = loadAnimation(badiesimage);
  badiesimage3 = loadSpriteSheet('img/badies3.png',48,46,3);
  badies_animation3 = loadAnimation(badiesimage3);
  doggie = loadSpriteSheet('img/dog.png',48,50,3);
  dog_animation1 = loadAnimation(doggie);
  // badie2 =  loadImage("img/badies2.png")
  // badie3 =  loadImage("img/badies3.png")
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
  background(255,0,0);
  bottomwall = createSprite(width/2,660,width*2,100);
  bottomwall.addAnimation("Ground", ground);
  bottomwall.scale = 3
  otherwall = createSprite(1600,275,width,50);
  otherwall.addAnimation("ground2", ground2);
  otherwall.scale = .7
  otherwall2 = createSprite(3000,660,width,50);
  otherwall2.addAnimation("Ground", ground);
  otherwall2.scale = 3
  // watertower = createSprite(1000,400,100,600)
  // watertower2 = createSprite(2200,400,100,600)
  step1 = createSprite(4100,500, 200, 100)
  step1.addAnimation("steps", steps);
  step1.scale = .1
  step2 = createSprite(4200,400, 200, 100)
  step2.addAnimation("steps", steps);
  step2.scale = .1
  step3 = createSprite(4300,300, 200, 100)
  step3.addAnimation("steps", steps);
  step3.scale = .1
  step4 = createSprite(4400,200, 200, 100)
  step4.addAnimation("steps", steps);
  step4.scale = .1
  step5 = createSprite(4500,100, 200, 100)
  step5.addAnimation("steps", steps);
  step5.scale = .1
  dog = createSprite(-150,height-70, 50,50);
  dog.addAnimation("doggie", doggie);
  dog.scale = 1.5
  
  


  
   player = createSprite(50,600,50,50)
   player.addAnimation("player1", player1)
   player.scale = 2

   bottomwall.immovable = true
   otherwall.immovable = true
   otherwall2.immovable = true

   
   badies = new Group();
  
   for(var i=0; i<4; i++)
  {var badie = createSprite(random(900,1200), random(420,410), 50, 70);
    badie.setCollider("circle", -2,2,10,10)
    badie.addAnimation("badies1",badies1)
   badies.add(badie)
  }
  
   
  badies2 = new Group();
  
   for(var i=0; i<4; i++)
  {var badie2 = createSprite(random(3400,2900), random(420,410), 50, 70);
   badie2.setCollider("circle", -2,2,10,10)
   badie2.addAnimation("badiesimage",badiesimage)
   badies2.add(badie2)
   
  }
  
   badies3 = new Group();
  
   for(var i=0; i<4; i++)
  {var badie3 = createSprite(random(2000,1200), 115, 50, 70);
   badie3.setCollider("circle", -2,2,10,10)
   badie3.addAnimation("badiesimag3",badiesimage3)
   badies3.add(badie3)
  }
  

  

  timer = createP('timer')
  setInterval(timeIt,1000);
  stage = 0;
}


function timeIt(){
  timer.html(counter)
 if (stage == 1){
   counter++
 } 
 
 if(counter == 200){
   restart()
 }
}



function draw() {
  
  
  

  if(mouseIsPressed && stage === 0){
    stage = 1; 
  }
  if (stage == 1){
  Tone.Transport.start();
  background(0,0,0);
  image(img,0,-490,width*2,height*2)
  image(img,2000,-490,width*2,height*2)
  textSize(50 + counter/2);
  fill(a);
  textFont(myfont)
  text( 200 - counter, player.position.x + 300, 100)
  camera.position.x = player.position.x;
  player.collide(bottomwall);
  player.collide(otherwall);
  player.collide(otherwall2);
  player.collide(step1);
  player.collide(step2);
  player.collide(step3);
  player.collide(step4);
  player.collide(step5);
  player.collide(otherwall2);
  player.collide(dog);
  badies2.collide(dog)
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
  
  if (player.position.y > 600 ) {
    println("is it working");
    restart();
  }
  
  if (counter > 200){
    restart();
  }
  
  if(player.position.y < 0 && player.position.x > 4000){
    println("position");
    stage = 3;
  }
  
  for(var i = 0; i <badies3.length; i++){
    var b3 = badies3[i];
    b3.displace(player);
    b3.displace(b3);
    b3.scale = 4;
    if (b3.position.x > 1500){ 
    b3.mirrorX(1);
    b3.setSpeed(random(-1,-3), 0);
    }else if(b3.position.x < 1200 ) {
      b3.mirrorX(-1);
      b3.setSpeed(random(1,4), 0);
    }else{
     }
    }
  
  
   for(var i = 0; i<badies.length; i++) {
    var b = badies[i];
    b.displace(player);
    b.displace(b);
    b.scale = 3;
    if(b.position.x > 500){
    b.mirrorX(1);
    b.setSpeed(random(-1,-4), 0);
    }else if(b.position.x < 200){
    b.mirrorX(-1);
    b.setSpeed(random(1,4), 0);
    }else{
    }
   }
   
    
    for(var i = 0; i<badies2.length; i++) {
    var b2 = badies2[i];
    b2.displace(player);
    b2.displace(b2);
    b2.scale = 3;
    if (b2.position.x > 3000){ 
    b2.mirrorX(1);
    b2.setSpeed(random(-1,-4), 0);
    }else if(b2.position.x < 2800){
    b2.mirrorX(-1);
    b2.setSpeed(random(1,4), 0);
    }else{
    }
  }
    
  

  if (player.position.x > 1500){
     dog.position.x = 3500
     dog.mirrorX(-1)
  }
  
  
  if (counter > 100){
    a = color(counter, 0, 0)
    textSize(50 + counter);
  } 

 drawSprites();
  camera.on();
  println(player.position.x);
  
  // end stage 1
  
  }else if (stage == 3){
    clearInterval();
    background(0, 126, 255);
    textSize(44)
    fill(255)
    textFont(myfont)
    text("STAGE 2",camera.position.x,camera.position.y)
     if(mouseIsPressed && stage === 3){
    stage = 4; 
        }
       if (stage == 4){
      // background(0,0,0);
    
      
       
       window.location.href = 'Level2/index.html';

      
      
         
         
       }
// level 4
// println(stage)
}  

// println(counter)
}

function playNote(time, event) {
  
  var messedUpNote = Tone.Frequency(event.name).eval();
  // Tone.Frequency(event.name).add(20);
  synth.triggerAttackRelease(messedUpNote, event.duration, time, event.velocity);
}
  

      // println(player.position.x)
function restart(){
  allSprites.clear()
  bottomwall = createSprite(width/2,660,width*2,100);
  bottomwall.addAnimation("Ground", ground);
  bottomwall.scale = 3
  otherwall = createSprite(1600,275,width,50);
  otherwall.addAnimation("ground2", ground2);
  otherwall.scale = .7
  otherwall2 = createSprite(3000,660,width,50);
  otherwall2.addAnimation("Ground", ground);
  otherwall2.scale = 3
  step1 = createSprite(4100,500, 200, 100)
  step1.addAnimation("steps", steps);
  step1.scale = .1
  step2 = createSprite(4200,400, 200, 100)
  step2.addAnimation("steps", steps);
  step2.scale = .1
  step3 = createSprite(4300,300, 200, 100)
  step3.addAnimation("steps", steps);
  step3.scale = .1
  step4 = createSprite(4400,200, 200, 100)
  step4.addAnimation("steps", steps);
  step4.scale = .1
  step5 = createSprite(4500,100, 200, 100)
  step5.addAnimation("steps", steps);
  step5.scale = .1
  dog = createSprite(-150,height-70, 50,50);
  dog.addAnimation("doggie", doggie);
  dog.scale = 1.5
  
  


  
   player = createSprite(50,600,50,50)
   player.addAnimation("player1", player1)
   player.scale = 2

   bottomwall.immovable = true
   otherwall.immovable = true
   otherwall2.immovable = true

   
   badies = new Group();
  
   for(var i=0; i<4; i++)
  {var badie = createSprite(random(900,1200), random(420,410), 50, 70);
    badie.setCollider("circle", -2,2,10,10)
    badie.addAnimation("badies1",badies1)
   badies.add(badie)
  }
  
   
  badies2 = new Group();
  
   for(var i=0; i<4; i++)
  {var badie2 = createSprite(random(3400,2900), random(420,410), 50, 70);
   badie2.setCollider("circle", -2,2,10,10)
   badie2.addAnimation("badiesimage",badiesimage)
   badies2.add(badie2)
   
  }
  
   badies3 = new Group();
  
   for(var i=0; i<4; i++)
  {var badie3 = createSprite(random(2000,1200), 150, 50, 70);
   badie3.setCollider("circle", -2,2,10,10)
   badie3.addAnimation("badiesimag3",badiesimage3)
   badies3.add(badie3)
  }
  

  

  timer = createP('timer')
  setInterval(timeIt,1000);
  // setTimeout(restart,2000);
  stage = 1
}

