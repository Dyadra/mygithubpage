var keyBlocks;
var fishes;
var apples;
var apple;
var badfishes;
var badfishes2;
var seawoods;

var sequence; 
var index = [];
var indexed_sequence = [];

var markov = [];
var index_size;
var pitches = [];

var keys;
var toneLoop;
var currentPitch;
var score;

var rock1;
var rock2;
var rock3;
var God1;
var God2;
var God_animation2;
var water;

var was_over,is_over;
var was_over_badfishes,is_over_badfishes;
var was_over_badfishes2,is_over_badfishes2;
var was_over_seaweeds,is_over_seaweeds;


var g;
var waterWall2;
var bg;



function preload() {
  score = loadJSON("beyonce.json");
  rock1 = loadImage("Rocks/rock1.png");
  buddha1 = loadImage("Rocks/buddha1.png");
  buddha2 = loadImage("Rocks/buddha2.png");
  rock1 = loadImage("Rocks/rock1.png");
  rock2 = loadImage("Rocks/rock2.png");
  rock3 = loadImage("Rocks/rock3.png");
  tree  = loadImage("foliage/tree.png");
  shrub  = loadImage("foliage/shrub.png");
  shrub2  = loadImage("foliage/shrub2.png");
  fruit = loadImage("foliage/200_s.png");
  ground  = loadImage("foliage/ground.png");
  ground2  = loadImage("Rocks/water.png");
  ground3  = loadImage("foliage/ground-assets/tile.png");
  God1 = loadSpriteSheet('chars/godimage.png',120,120,3);
  God_animation = loadAnimation(God1);
  God2 = loadSpriteSheet('chars/seamonster.png',70,120,3);
  God_animation2 = loadAnimation(God2);
  personimage = loadSpriteSheet('chars/main.png',48,40,3);
  SoberDude = loadSpriteSheet('chars/playermove.png',24,48,3);
  personanimation= loadAnimation('chars/main.png')
  SoberAnimation = loadAnimation(SoberDude)
  personstationary= loadImage('chars/stationary.png',35,40,3);
  // fishimage = loadSpriteSheet('animals/jelly.png',35,40,3);
  // fish_animation= loadAnimation(fishimage)
  badfishimage = loadSpriteSheet('animals/badfishy.png',38,40,3);
  badfish_animation= loadAnimation(badfishimage)
  badfishimage2 = loadSpriteSheet('animals/badfishy2.png',38,40,3);
  badfish_animation2= loadAnimation(badfishimage2)
  seasweedimage = loadSpriteSheet('foliage/seaweed.png',48,50,13);
  seaweed_animation= loadAnimation(seasweedimage);
  seasweedimagenormal = loadImage('foliage/seaweed_normal.png');
  bgImg = loadImage("foliage/background.png");



}


var bass = new Tone.MonoSynth({
			"volume" : -10,
			"envelope" : {
				"attack" : 0.1,
				"decay" : 0.003,
				"release" : 0.0002,
			},
			"filterEnvelope" : {
				"attack" : 0.005,
				"decay" : 0.1,
				"baseFrequency" : 300,
				"octaves" : 2
			}
		}).toMaster();
		
		var fmSynth = new Tone.FMSynth({
		  	"envelope" : {
				"attack" : 0.001,
				"decay" : 0.003,
				"release" : 0.0002,
		  	}
		}).toMaster();

		var osc = new Tone.Oscillator(100, "sine").toMaster()
		var osc2 = new Tone.Oscillator(100, "sawtooth6").toMaster()
		var noiseSynth = new Tone.NoiseSynth().toMaster();
      
		
		var boxSprite1,boxSprite2,boxSprite3,boxSprite4,boxSprite5,boxSprite6,boxSprite7,boxSprite8;
		var player_sprite;
		var x = -300;
	
		
  var direction = 0;
	var jump = 20;
	var jumping = false;
	 
	var gravity = 5;
	
	var distortion = new Tone.Distortion(0.5).toMaster();

		


function setup() {
  // pixelDensity(0.5);
  createCanvas(800,300);

  sequence = [];
  //load first track into sequence
  for(var i = 0; i < score.tracks[0].notes.length; i++){
    var note = score.tracks[0].notes[i];
    sequence.push(note.midi);
  }
  println(sequence);
  keys = new Tone.PolySynth(3, Tone.Synth);
  keys.toMaster();
  
  index_size = 0;
  
  //process sequence
  // var new_item = true;
  
  //step 1: analyze sequence
  for(var i =0; i < sequence.length; i++){
    new_item = true;
    //check if item is new. if not, point to existing index
    for(var j = 0; j < index_size; j++){
      if(sequence[i] == index[j]){
        new_item = false;
        indexed_sequence[i] = [j];
      }
    }
    if(new_item){
      index[index_size] = sequence[i];
      indexed_sequence[i] = index_size;
      index_size++;
    }
  }
  
  println("raw sequence: "+ sequence);
  println("index: " + index);
  println("indexed sequence: " + indexed_sequence);
  
  //step 2: create transition matrix
  //create table
  for(var i = 0; i < index_size; i++){
    markov[i] = [];
  }
  
  for(var i = 0; i < indexed_sequence.length; i++){ //for each unique pitch
    var current = indexed_sequence[i];
    var next_pos = (i + 1) % indexed_sequence.length;
    var next = indexed_sequence[next_pos];
    
    // if(markov[current] == undefined){
    //   markov[current] = [];
    // }
    
    markov[current].push(next);
  }
  
  //print transition table
  for(var i = 0; i < markov.length; i++){
    println(markov[i]);
  }
  
  //step 3: create melody
  var melodyLength = 100;
  var currentIndex = parseInt(random(0, markov.length)); //start anywhere
  
  
  for(var i = 0; i < melodyLength; i++){
    var transitionPos = parseInt(random(0, markov[currentIndex].length));
    var nextIndex = markov[currentIndex][transitionPos];
    currentIndex = nextIndex;
    
    pitches.push(index[currentIndex]);
  
  }
  
  println("generated melody: " + pitches);
  currentPitch = 0;
  //play back melody
  
  //triggered every eighth note. 
  toneLoop =  new Tone.Loop(function(time){
    
    var pitch = Tone.Frequency( pitches[currentPitch], "midi").eval();
  	keys.triggerAttackRelease(pitch, "16n");
  	currentPitch = (currentPitch + 1) % pitches.length;
  	
  }, "8n").start(0);
  
  synth = new Tone.PolySynth(4, Tone.Synth, {
    "oscillator": {
      "type": "sawtooth6"
    },
    "envelope": {
      "attack": 0.03,
      "decay": 0.1,
      "sustain": 0.2,
      "release": 0.6
    }
  }).toMaster();
  
  keyBlocks = new Group ()
  backgroundSprite= createSprite(0,100,2000,300)
    backgroundSprite.addAnimation("bgImg", bgImg);
    // water.shapeColor = color(154,209,212);
  waterFloor = createSprite(950,650,500,10);
  waterFloor2 = createSprite(1200,750,1000,10);
  waterFloor3 = createSprite(1720,750,5000,10);
  waterWall = createSprite(760,600,10,600);
  waterWall.shapeColor = color(154,209,212);
  waterWall2 = createSprite(1200,600,10,600);
  waterWall2.shapeColor = color(154,209,212);
  waterTop = createSprite(950,350,500,10);
  waterTop.shapeColor = color(154,209,212);
  newSprite =  createSprite(-2730,100,150,500)
  TranSprite = createSprite(-180, 200, 100, 100);
  NPCSprite= createSprite(-180, 210,60,200)
  NPCSprite.addAnimation("God", God1);
  NPCSprite.scale = 1.5
  boxSprite1 = createSprite(-1050, 260, 50, 100);
  boxSprite1.addAnimation("buddha1", buddha1);
  boxSprite2 = createSprite(-700, 260, 50, 100);
  boxSprite3 = createSprite(-750, 260, 50, 100);
  boxSprite4 = createSprite(-800, 260, 50, 100);
  boxSprite5 = createSprite(-850, 260, 50, 100);
  boxSprite6 = createSprite(-900, 260, 50, 100);
  boxSprite7 = createSprite(-950, 260, 50, 100);
  boxSprite8 = createSprite(-1000, 260, 50, 100);
  water = createSprite(800,600,500,300);
  water.addAnimation("ground2", ground2);
  water.scale = 3;
  floorSprite= createSprite(-200, 570, 1200, 100);
  floorSprite.addAnimation("Ground", ground);
  floorSprite.scale = 1.3;
  floorSprite2=createSprite(1580, 400);
  floorSprite2._internalHeight = 10;
  floorSprite2.addAnimation("Ground2", ground2);
  floorSprite2.scale = .7;
  floorSprite3= createSprite(-1920, 530, 1200, 100);
  floorSprite3.addAnimation("Ground3", ground3);
  floorSprite3.scale = 2.5;
  floorSprite4= createSprite(2470, 440, 1200, 100);
  floorSprite4.addAnimation("Ground", ground);
  floorSprite4.scale = .7;







  
  rockSprite= createSprite(400, height, 70, 70);
  rockSprite.addAnimation("rock1", rock1);
  rockSprite.setCollider("circle",0,0,60);
  rockSprite2=createSprite(500, height, 70, 70);
  rockSprite2.addAnimation("rock2", rock2);
  rockSprite2.setCollider("circle",0,0,60);
  rockSprite3=createSprite(640, height, 70, 50);
  rockSprite3.addAnimation("rock3", rock3);
  rockSprite3.setCollider("circle",0,0,60);
  treeSpriteTop= createSprite(-2000,-2,300,150)
  treeSprite= createSprite(-2000,100,70,300)
  treeSprite.addAnimation("tree", tree);
  treeSprite.scale = 0.7
  bushSprite= createSprite(1500,height,140,100)
  bushSprite.addAnimation("shrub", shrub);
  bushSprite.scale = 0.3
  bushSprite2= createSprite(1700,height,140,100)
  bushSprite2.addAnimation("shrub2", shrub2);
  bushSprite2.scale = 0.25
  NPCSprite2= createSprite(2400,650,30,200)
  NPCSprite2.addAnimation("God2", God2);
  NPCSprite2.scale = 2

 
  


  player_sprite = createSprite(100, 240, 50, 94);
  player_sprite.addAnimation("SoberDude",SoberDude);
  player_sprite.addAnimation("personimage",personimage);
  player_sprite.addAnimation("personstationary",personstationary);
 	player_sprite.position.x = -2200;
 	player_sprite.scale = 2.2
  // player_sprite.velocity.y = 12;
  //change the color of the placeholder
   player_sprite.immovable = false;
   floorSprite.immovable = true;
   floorSprite2.immovable = true;
  floorSprite3.immovable = true;
    floorSprite4.immovable = true;
   waterWall2.immovable = true;
   waterWall.immovable = true
   waterTop.immovable = true
   waterFloor.immovable = true
   waterFloor2.immovable = true
   NPCSprite.immovable = true
   NPCSprite2.immovable = true




  
  keyBlocks.add(boxSprite1);
  keyBlocks.add(boxSprite2);
  keyBlocks.add(boxSprite3);
  keyBlocks.add(boxSprite4);
  keyBlocks.add(boxSprite5);
  keyBlocks.add(boxSprite6);
  keyBlocks.add(boxSprite7);
  keyBlocks.add(boxSprite8);
  
  keyBlocks.immovable = true;
  
  // add different parameteres for things in a group
  // for(var i = 0; i<keyBlocks.length; i++) {
  // var g = keyBlocks[i];
  // g.addAnimation("God", God1);
  // }
  
  evils = new Group();
  
   for(var i=0; i<6; i++)
  { var evilboys = createSprite(random(2000,3000),260, 100, 50);
    evilboys.setCollider("circle", -2,2,10,10)
   evils.add(evilboys);
   
   
   
  
      
    }

  
  
  for(var i = 0; i<keyBlocks.length; i++) {
  var g = keyBlocks[i];
  
  g.addAnimation("buddha1", buddha1);
  g.addAnimation("buddha2", buddha2)
  };

  fishes = new Group();
  
  // for(var i=0; i<7; i++)
  // { var fish = createSprite(random(725,1177), random(400,600), 10, 20);
    // fish.setCollider("circle", -2,2,10,10)
    // fish.setSpeed(random(2,3), -5);
    // fish.addAnimation("img",fishimage);
      // fishes.bounce(waterWall2);
      // fishes.bounce(waterWall);
      // fishes.bounce(waterTop);
      
      
      


   
  // fishes.add(fish);

  // }
  // for(var i = 0; i<fishes.length; i++) {
  // var f = fishes[i];
  
  // f.addAnimation("fishimage",fishimage);
  
  // println("im cute")
  // f.addAnimation("buddha2", buddha2)
  // };
  
  badfishes = new Group();
  
   for(var i=0; i<5; i++)
  { var badfish = createSprite(random(1228,2300), random(450,700), 10, 20);
    badfish.setCollider("circle", -2,2,10,10)
    badfish.setSpeed(random(-0.1,-1),0);
    
   
   badfishes.add(badfish);

  }
  for(var i = 0; i<badfishes.length; i++) {
  var bf = badfishes[i];
  
  bf.addAnimation("badfishimage",badfishimage);
      println(bf.position.x)


    };
    
     
  badfishes2 = new Group();
  
   for(var i=0; i<5; i++)
  { var badfish2 = createSprite(random(1228,1900), random(450,700), 10, 20);
    badfish2.setCollider("circle", -2,2,10,10)
    badfish2.setSpeed(random(-.1,-5),0);
   
   badfishes2.add(badfish2);

  }
  for(var i = 0; i<badfishes2.length; i++) {
  var bf2 = badfishes2[i];
  
  bf2.addAnimation("badfishimage2",badfishimage2);
    bf2.scale = (random(.2,2))

    };
  
  apples = new Group();
  
   for(var i=0; i<7; i++)
  { var apple = createSprite(random(-2000,-1800), random(0, 100), 20, 20);
  
   apple.setCollider("circle", -2,2,20,20)
   apple.setSpeed(0, 90);   
   apples.add(apple);
  }
  for(var i = 0; i<apples.length; i++) {
  var a = apples[i];
  
  a.addAnimation("fruit",fruit);
  a.scale = .7
};
  
  seaweeds = new Group();
  
   for(var i=0; i<10; i++)
  { var seaweedSprite = createSprite(random(1700,2100),700,80,80);
    seaweedSprite.setCollider("circle", -2,2,10,10)
   seaweeds.add(seaweedSprite);

  }
  for(var i = 0; i<seaweeds.length; i++) {
  var sw = seaweeds[i]
  sw.addAnimation("seasweedimagenormal", seasweedimagenormal)
  sw.addAnimation("seasweedimage",seasweedimage);

    };


 

 Tone.Transport.start();
 stage = 0

}

function draw() {
  
  if(player_sprite.position.x < 3500 && stage === 0){
    stage = 1; 
  }
  
  if (stage == 1){
  // if (stage == 1){
   textSize(100);
   text("word", -2000, -200);
   background(193,205,226)
   keys.connect(distortion)
   player_sprite.velocity.y = gravity;
   player_sprite.collide(floorSprite);
   player_sprite.collide(floorSprite2);
   player_sprite.collide(floorSprite3);
   player_sprite.collide(floorSprite4);
   player_sprite.collide(waterFloor2);
   player_sprite.collide(waterFloor3);
   player_sprite.overlap(bushSprite);
   player_sprite.overlap(bushSprite2);
   player_sprite.collide(newSprite);
   
    
   
   if (player_sprite.bounce(NPCSprite2,GoAway)){
     println("my function should be called")
   }
   
  
   if (player_sprite.bounce(evils)){
     filter(GRAY);
   }


  
  rockSprite.debug = mouseIsPressed;
  rockSprite2.debug = mouseIsPressed;
  rockSprite3.debug = mouseIsPressed;

 if (player_sprite.overlap(apples,Movement)){
    println("apples touching")
    // apples.setSpeed(-1,90 )
    // bass.triggerAttackRelease("A4","2n")
    
  }
  
  if (player_sprite.overlap(seaweeds)){
    println("he touching da weed")
   for(var i = 0; i<seaweeds.length; i++) {
    var sw = seaweeds[i]
     sw.changeAnimation("seasweedimage",  seasweedimage)
     sw.scale = 2
    // osc.start();

     
   };
     
     
  }else{
    for(var i = 0; i<seaweeds.length; i++) {
    var sw = seaweeds[i]
     sw.changeAnimation("seasweedimagenormal",  seasweedimagenormal)
      sw.scale = 2.5
      // osc.stop();
    }
     
  }
  
  
  
  
   
  fishes.bounce(waterFloor);
  // fishes.bounce(waterWall);
  fishes.bounce(waterWall2);
  fishes.bounce(waterWall);
  fishes.bounce(waterTop);
   fishes.debug = true
  
  for(var i = 0; i<badfishes.length; i++){
    var bf = badfishes[i]
    if (bf.position.x < 760){
     bf.position.x = 2500
    }
  }
  
  for(var i = 0; i<badfishes2.length; i++){
    var bf2 = badfishes2[i]
    if (bf2.position.x < 780){
     bf2.position.x = 2500
    }
  }
  
  for(var i = 0; i <evils.length; i++) {
    var e = evils[i];
    e.displace(player_sprite);
    e.immovable = true
    e.displace(e);
    // b3.scale = 2.5;
    if (e.position.x > 3000){ 
    // e.mirrorX(-1);
    e.setSpeed(random(-1,-3), 0);
    }else if(e.position.x < 2500 ) {
      // e.mirrorX(-1);
      e.setSpeed(random(1,4), 0);
    }else{
     }
    }
  
  
   
   if (keyIsDown(RIGHT_ARROW)){
       player_sprite.velocity.x = 10;
       player_sprite.mirrorX(1);
       player_sprite.changeAnimation('personimage');

   }else if (keyIsDown(LEFT_ARROW)){
    player_sprite.velocity.x = -4;
     player_sprite.mirrorX(-1);
     player_sprite.changeAnimation('personimage');

   }else if (keyIsDown(UP_ARROW)){
     player_sprite.velocity.y = -4;
     jumping = true;
     println("should be jumping")
   }else{ 
     player_sprite.velocity.x = 0;
     player_sprite.changeAnimation('personstationary');
   }
   
   if (player_sprite.position.x < -180 ){
     player_sprite.changeAnimation('SoberDude')
   }
   
   if (player_sprite.collide(boxSprite1,bouncyKeys)){
     bass.triggerAttackRelease("A3","2n");
     println("collision")
    // boxSprite1.changeAnimation("rock1", rock1);
   }else{
     boxSprite1.changeAnimation("buddha1", buddha1);
   }
   
   if (player_sprite.collide(boxSprite2,bouncyKeys)){
     bass.triggerAttackRelease("B3","2n");
   }else{
     boxSprite2.changeAnimation("buddha1", buddha1);
   }
   
   if (player_sprite.collide(boxSprite3,bouncyKeys)){
     bass.triggerAttackRelease("C3","2n");
   }else{
     boxSprite3.changeAnimation("buddha1", buddha1);
   }
   
   if (player_sprite.collide(boxSprite4,bouncyKeys)){
     bass.triggerAttackRelease("D3","2n");
   }else{
     boxSprite4.changeAnimation("buddha1", buddha1);
   }
   if (player_sprite.collide(boxSprite5,bouncyKeys)){
     bass.triggerAttackRelease("E3","2n");
   }else{
     boxSprite5.changeAnimation("buddha1", buddha1);
   }
   if (player_sprite.collide(boxSprite6,bouncyKeys)){
     bass.triggerAttackRelease("F3","2n");
   }else{
     boxSprite6.changeAnimation("buddha1", buddha1);
   }
   if (player_sprite.collide(boxSprite7,bouncyKeys)){
     bass.triggerAttackRelease("G3","2n");
   }else{
     boxSprite7.changeAnimation("buddha1", buddha1);
   }
   if (player_sprite.collide(boxSprite8,bouncyKeys)){
     bass.triggerAttackRelease("G#3","2n");
   }else{
     boxSprite8.changeAnimation("buddha1", buddha1);
   }
   
   if ( player_sprite.overlap(water)){
    // println("its over lapping the water")
     distortion.distortion = 0
  }else{
      distortion.distortion = 0.5
  }
  
  
   
 
    if (player_sprite.collide(rockSprite)){
    // player_sprite.bounce(rockSprite)
     noiseSynth.triggerAttackRelease("4n");
     noiseSynth.set("noise.type", "white");
     println("noise synth is playing")
   }
   
    if (player_sprite.collide(rockSprite2)){
    // player_sprite.bounce(rockSprite)
     noiseSynth.triggerAttackRelease("4n");
     noiseSynth.set("noise.type", "brown");
     println("noise synth is playing")
   }
   
    if (player_sprite.collide(rockSprite3)){
    // player_sprite.bounce(rockSprite)
     noiseSynth.triggerAttackRelease("4n");
     noiseSynth.set("noise.type", "pink");
     println("noise synth is playing")
   }
  
  
  if ( player_sprite.overlap(fishes)){
  
  
  }
  
   if ( player_sprite.overlap(bushSprite)){
    println("lil bushes")
   osc.start();
  }else{
    osc.stop();
  }
  
    if ( player_sprite.overlap(bushSprite2)){
    println("lil bushes")
    osc2.start();
  }else{
    osc2.stop();
  }
  
   is_over = player_sprite.overlap(fishes);
  if(was_over == false && is_over == true){
      println("they touching")
      bass.triggerAttackRelease("A4",0.5)
   
  }
  was_over = is_over;
  
  is_over_badfishes = player_sprite.overlap(badfishes);
  if(was_over_badfishes == false && is_over_badfishes == true){
      println("they touching")
      bass.triggerAttackRelease("C4",0.5)
   
  }
  was_over_badfishes = is_over_badfishes;
  
   is_over_badfishes2 = player_sprite.overlap(badfishes2);
  if(was_over_badfishes2 == false && is_over_badfishes2 == true){
      println("they touching")
      bass.triggerAttackRelease("B4",0.5)
   
  }
  was_over_badfishes2 = is_over_badfishes2;
  
  is_over_seaweeds = player_sprite.overlap(seaweeds);
  if(was_over_seaweeds == false && is_over_seaweeds == true){
      println("they touching")
      synth.triggerAttackRelease("B4", 0.5)
   
  }
  was_over_seaweeds = is_over_seaweeds;
  
    
    println(player_sprite.position.x)
   drawSprites();
    // camera.on()
    
    
    if (player_sprite.position.x < -1900){
      camera.position.x = -2400
    }else{
      camera.position.x = player_sprite.position.x;

    }

    if(player_sprite.position.y > -100 ){
    camera.position.y = player_sprite.position.y

    } 
    
    if (player_sprite.position.x < 200){
      camera.position.y = 200
      println("no backgrounds")
    }
     if (player_sprite.position.x > 3500 && stage == 1){
      stage = 2;
    }
    
     
    // if (player_sprite.position.x > 2200){
    // player_sprite.position.x = -400
    // }
    
    // if (player_sprite.position.x < -500){
    // player_sprite.position.x = -400
    // }
    
    if (player_sprite.position.x > -180){
        // TranSprite.velocity.x = 
        
        NPCSprite.position.x = 2000
        // filter(INVERT);
    }
    
   
  }else if (stage == 2 ){
    // println("da stage");
      // allSprites.clear();
    background(0, 0, 0);
    
    window.location.href = 'DruggiesLevel2/index.html';

    player_sprite.position.x = -2000
   partySprite= createSprite(0,100,50,300)
    println("stage 2" + player_sprite.position.x)
  }
 }

   

function Movement(player_sprite,apple){
  apple.addSpeed(2,90 )
  fmSynth.triggerAttackRelease(random(-500,500), "2n");
  
}

function bouncyKeys(player_sprite,keyBlocks) {
    player_sprite.velocity.y = -90
    keyBlocks.changeAnimation("buddha2", buddha2)
}

function GoAway(player_sprite,NPCSprite2) {
  println("ok ok")
}

function mousePressed() {
     resizeCanvas(windowWidth, windowHeight);
     println(windowWidth)
}
