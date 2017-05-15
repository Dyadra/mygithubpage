var synth;
var score;
var parts;
var part;
var r, g, b;
var gravity = 2;
var fishes;
var x;
var badguys;
var foward = true
var badies, badie;
// try gamedev tutorial to get players to turn around.


function preload() {
  personimage = loadSpriteSheet('chars/playermove.png', 24, 40, 3);
  personanimation = loadAnimation('chars/playermove.png')
  score = loadJSON("score.json", loaded, error);


}

function setup() {
  createCanvas(1000, 500);
  synth = new Tone.PolySynth(4, Tone.Synth, {
    "oscillator": {
      "type": "sine"
    },
    "envelope": {
      "attack": 0.03,
      "decay": 0.1,
      "sustain": 0.2,
      "release": 0.6
    }
  }).toMaster();
  Tone.Transport.bpm.value = score.header.bpm;
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
  

  bottomwall = createSprite(width / 2, height, width * 2, 100);
  bottomwall2 = createSprite(2800, height, width * 2, 100);
  wall2 = createSprite(400, 300, 600, 100);
  waterfall = createSprite(1500, height + 200, 100, 100);

  friend = createSprite(-200, height - 80, 80, 80)
  player = createSprite(0, height - 80, 50, 50)
  player.addAnimation("personimage", personimage);
  player.scale = 2
  bottomwall.immovable = true
  bottomwall2.immovable = true


  olives = new Group();

  for (var i = 0; i < 3; i++) {
    var olive = createSprite(([i] * 175) + 200, 200, 100, 20);
    olive.setCollider("circle", -2, 2, 10, 10)
    olives.add(olive);

  }



  fishes = new Group();

  for (var i = 0; i < 10; i++) {
    var fish = createSprite(camera.position.x, random(height - 80, 200), 10, 20);
    fish.setCollider("circle", -2, 2, 10, 10)
    fish.setSpeed(random(-0.1, -5), 0)


    fishes.add(fish);

  }

  badies = new Group();

  for (var i = 0; i < 7; i++) {
    badie = createSprite(random(2000, 2900), 400, 50, 70);
    badie.setCollider("rectangle", -2, 2, 10, 10)
      // badie2.addAnimation("badiesimage",badiesimage)
    badies.add(badie)
  }


  Tone.Transport.start();


}



function playNote(time, event) {

  var messedUpNote = Tone.Frequency(event.name).eval();
  synth.triggerAttackRelease(messedUpNote, event.duration, time, event.velocity);
}

function draw() {
  // if(r != undefined){
  //   background(r, g, b);
  // }
    
  println("r: " + r);
  // console.log(r);
}

function loaded(d) {
  score = d;
}

function error(err) {
  println("error while loading score");
}

function draw() {
  background(0, 0, 0);
  player.collide(bottomwall);
  player.collide(bottomwall2);
  player.collide(wall2);



  // for(var i = 0; i<fishes.length; i++){
  // var f = fishes[i]
  // if(f.position.x  < player.position.x + 300  ){
  // f.setSpeed(random(1,5),0);
  // println("they passes")
  // }else if(f.position.x   > player.position.x - 300 ) {
  // println("they aint passed")
  // f.setSpeed(random(-2,-5),0);
  // }else{
  // }
  // }

  if (foward = true) {
    //do something, and eventually set flag to false
    flag = false;
  } else {
    //do something else
  }



  if (keyIsDown(RIGHT_ARROW)) {
    //flip horizontally
    player.mirrorX(1);
    //negative x velocity: move left
    player.velocity.x = 10;
    player.addAnimation('personimage');
  } else if (keyIsDown(LEFT_ARROW)) {

    //unflip 

    player.mirrorX(-1);
    player.velocity.x = -10;
    // player.addAnimation('personimage');
  } else if (keyIsDown(UP_ARROW)) {
    // player.mirrory(1);

    player.velocity.y = -2;

  } else {
    //if close to the mouse, don't move
    player.velocity.x = 0;
    player.velocity.y = gravity
  }

  if (keyIsDown(ENTER)) {
    var sprite = createSprite(player.position.x, player.position.y, random(10, 70), random(10, 70));
    sprite.setCollider("circle", 0, 0, 40, 40);
    // powers.add(sprite)
    sprite.velocity = new p5.Vector(random(-5, 5), random(-1, -5));

  }

  if (player.position.x > 1350) {
    waterfall.velocity.y = -3
  }

  if (player.bounce(friend, Blur)) {
    println("my function should be called")
  }

  for (var i = 0; i < badies.length; i++) {
    var b = badies[i];
  
    b.displace(player);
    b.overlap(b);
    // b.scale = 2.5;
    if (b.position.x > 2500) {
      b.mirrorX(1)
      b.setSpeed(-4, 0);
      println("something")
    } else if (b.position.x < 1900) {
      b.mirrorX(-1);
      b.setSpeed(4, 0);
      println("something else")
    } else {}
  }








  drawSprites();
  camera.position.x = player.position.x;
  camera.on();

  println(player.position.x)



}

function Blur(player, friend) {
  println("ok ok")
  filter(THRESHOLD);

}

function toggleMovemment () {
  if (Moveback) Moveback = false
}

function loop() {
  
  if(Moveback){
    speed--
  }else{
    speed++
  }
  
  
}