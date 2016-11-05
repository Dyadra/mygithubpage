var shapey;
var viewer;
var distance;
var distance2;
var x = 0;
var y = 0;
var newSlider;
var cool;
var sampler = new Tone.Sampler("Samples/smasher.wav").toMaster();
var kick = new Tone.Sampler("Samples/kick.wav").toMaster();
var coolsynth = new Tone.GrainPlayer("Samples/coolsynth.mp3").toMaster();
var other = new Tone.GrainPlayer("Samples/coolsynth.mp3").toMaster();
var autoPanner = new Tone.AutoPanner("4n").toMaster().start();
//var m = map(mouseX,0,200,900,1000)




var showBox = false;

var bg =  20

var bass = new Tone.MonoSynth({
			"volume" : -10,
			"envelope" : {
				"attack" : 0.1,
				"decay" : 0.3,
				"release" : 2,
			},
			"filterEnvelope" : {
				"attack" : 0.005,
				"decay" : 0.1,
				"baseFrequency" : 300,
				"octaves" : 2
			}
		}).toMaster();

function setup(){
   createCanvas(1200, 1000, WEBGL);
    background(bg);
   var fs = fullscreen();
   fullscreen(!fs);
   
   newSlider = createSlider(20, 150,70 );
   newSlider.position(20, 20);
   
 
  shapey = loadModel('Samples/icosahedron.obj');
  disco = loadModel('Samples/disco.obj')
		
// SNARE DRUM
		//var snare = new Tone.NoiseSynth({
		//	"envelope" : {
		//		"attack" : 0.001,
		///		"decay" : 0.4,
		//		"sustain" : 0
		//	},
		//	"filterEnvelope" : {
		//		"attack" : 0.001,
		//		"decay" : 0.1,
		//		"sustain" : 0
		//	}
	//	}).toMaster();
	//	var snarePart = new Tone.Loop(function(time){
	//		snare.triggerAttack(time);
	//	}, "1n").start("4n");
// 	Piano
		var piano = new Tone.PolySynth(4, Tone.Synth, {
			"volume" : -10,
		}).toMaster()
		var FChord = ["F4", "A4", "C4",];
		var dChord = ["D4", "F4", "A4",];
		var bChord = ["B4", "D4", "F#4",];
		var pianoPart = new Tone.Part(function(time, chord){
			piano.triggerAttackRelease(chord, "8n", time);
		}, [["0:0:0", bChord], ["0:1", bChord], ["0:1", FChord], ["0:1:3", dChord], ["0:2:2", FChord], ["0:3", dChord], ["0:3:2", bChord]]).start("2m");
		pianoPart.loop = true;
		
	
	
	
}

function mousePressed(){
  // box(100, 300, 400);
   x = mouseX;
   y = mouseY;
  var distance = dist(x, y, 0, 20, 20, 20); 
  if (distance < 800 && distance > 700){
  Tone.Transport.start("+0.00")
  bg = (122);
    if (bg = 122){
    showBox = true;
    //box(100, 200, 600);
    //box(100, 100, 100);
  }
 
 }
  

}


function keyTyped() {
   
   
   if (key === 'a') {
    
		var bassPart = new Tone.Sequence(function(time, note){
			bass.triggerAttackRelease(note, "16n", time);
		}, ["C4", ["C3", ["C3", "E4"]], "D3", "D2", "A4","A3"]).start(0);
		bass.volume.value = -10
		println("bassplay")
     
   } else if (key === 'z'){
      bass.volume.value = -50
      println("z click")
    }
   
		
  }
  

  function draw(){
  background(bg);
 var radius = width * 1.5;
 var distance2 = dist(mouseX, mouseY, 20, 20, 20, 20); 
 var cool = newSlider.value();

 //orbitControl();
 //var dirY = (mouseY/height);
// var dirX = (rotateX(radians(rotationX));
  //camera(dirX, -dirY,10)

  
  
  camera(0, 0, 0);
  //camera(mouseX,mouseY, 0);
  
  //push();
  //scale(100.0,100.0,100,.0)
  //translate(-400, -300, 50);
  //model(shapey)
  //pop();
  
  //if (mouseIsPressed && mouseY < 430 && mouseY > 270){
   // println("working")
    
		
	    //if (mouseIsPressed && mouseY < 430 && mouseY > 270 && bass.triggerAttack == true ){
	    //  bass.triggerRelease();}
		 //println(Tone.Transport.bpm.value);
  
   Tone.Transport.bpm.value = cool;
  
  
  
  
  push();
  //fill(0)
  rotateZ(frameCount * 0.03);
  normalMaterial();
  sphere(80,20,20,20);

 
  pop();
  rotateY(frameCount * 0.001 * cool);
 for(var i = -10; i < 20; i++){
    for(var j = -2; j < 40; j++){
      push();
      var a = j/50 * PI;
      var b = i/10 * PI;
      translate(sin(3 * a) * radius * sin(b), cos(b) * radius / 1 , cos(2 * a) * radius * sin(b));    
      scale(20.0,20.0,20.0)
      //fill(random(255,255,255))
      model(shapey);
    
      
      pop();
      
    }
  }


  if(showBox){
   push();
    if  (bass.volume.value > -11 ) {
      
     rotateZ(frameCount * 0.03);
     println("rotating")
    } 
     translate(-200, -100, 20);
     
       //directionalLight(150, 100, 0, -50, 100, 0);
       ambientMaterial(202,231, 285);
       sphere(10,10, 20,10);
     pop()
     
     push()
     rotateY(frameCount * 0.001 * cool);
     directionalLight(50, 100, 0, -50, 100, 0)
     ambientMaterial(202,231, 255);
     translate(-200,-200,0);
     box(10, 20, 20);
     box(10, 30, 10);
     if (key === 's'){
     bg = 255
     println("sampler")
	   sampler.triggerAttack(-1);
     normalMaterial();
     scale(2.0,2.0,2.0)
      box(10, 20, 20);
      box(10, 30, 10);}
     pop()

  }
  
  push()
     rotateY(frameCount * 0.001 * cool);
     ambientMaterial(202,231, 255);
     translate(200,200,0);
     box(10, 20, 20);
     box(10, 30, 10);
     if (key === 'd'){
     println("kick")
     bg = (random(255),random(255),random(255))
	   kick.triggerAttack(-1);
     normalMaterial();
     scale(2.0,2.0,2.0)
      box(10, 20, 20);
      box(10, 30, 10);
     pop()

  }
  
   push()
     rotateY(frameCount * 0.001 * cool);
     ambientMaterial(202,231, 255);
     translate(200,-600,0);
     box(10, 20, 20);
     box(10, 30, 10);
     if (key === 'f'){
     bg = (random(255),random(255),random(255))
     println(random((255),(255),(255)))
	   coolsynth.start();
	   coolsynth.playbackRate = cool/75;
     normalMaterial();
     scale(2.0,2.0,2.0)
      box(10, 20, 20);
      box(10, 30, 10);
     pop()

  }
  
   push()
     rotateY(frameCount * 0.001 * cool);
     ambientMaterial(202,231, 255);
     translate(200,-600,0);
     box(10, 20, 20);
     box(10, 30, 10);
     if (key === 'g'){
     bg = (random(255),random(255),random(255))
     println(random((255),(255),(255)))
	   other.start();
	   other.playbackRate = cool/75;
     normalMaterial();
     scale(2.0,2.0,2.0)
      box(10, 20, 20);
      box(10, 30, 10);
     pop()

  }



}
  
  
		




