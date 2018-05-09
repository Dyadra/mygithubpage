var img;
var img2;
var PersonSprite;
var PersonSprite2;
var PersonSprite3;


var r, g, b;
var myCanvas;

function preload() {
  img = loadImage('img/ladder-green-md.png');
  img2= loadImage('img/person.png');
  // myFont = loadFont('img/AbrilFatface-Regular.ttf');
}


function setup() {
  var myCanvas = createCanvas(600, 400);
  myCanvas.parent('myContainer');
}
  
  PersonSprite = createSprite(155, 300,50,50);
  PersonSprite.addImage(img2);
  PersonSprite.scale = .3
  
  PersonSprite2 = createSprite(420, 300,50,50);
  PersonSprite2.addImage(img2);
  PersonSprite2.scale = .3
  
  PersonSprite3 = createSprite(680, 300,50,50);
  PersonSprite3.addImage(img2);
  PersonSprite3.scale = .3
  
 

  
}

function draw() {
  background(240);
    image(img, 95, 50);
    // image(img2, 50, 350, 50,50);
    image(img, 360, 50);
    image(img, 620, 50);
    
    
    strokeWeight(0);
    stroke(r, g, b);
    fill(r,g,b,120)
    ellipse(540, 30, 40, 40);
    
   
   
   drawSprites();
   
   
   if( PersonSprite.position.y < 250){
    PersonSprite.velocity.y =0
    // println("stop")
    
   }
   
   if( PersonSprite2.position.y < 150){
    PersonSprite2.velocity.y =0
    println("stop")
    
   }
   
   if( PersonSprite3.position.y < 50){
    PersonSprite3.velocity.y =0
    // println("stop")
    
   }
   if (mouseIsPressed){
     r = 226
      g = 192
      b = 68
   }else{
     r = 0
     b = 0
     g = 0 
   }
   
   
   textSize(20);
   fill(0, 102, 153);
   text('High Economic Segregation', 20, 380);
   
   
   textSize(32);
   text('(Low Mobility)', 50, 420);
   fill(0, 102, 153);
   
   textSize(20);
   text('Low Economic Segregation', 300, 380);
   fill(0, 102, 153);
   
   textSize(32);
   text('(Some Mobility)', 310, 420);
   fill(0, 102, 153);
   
   textSize(20);
   text('No Economic Segregation', 580, 380);
   fill(0, 102, 153);
   
   textSize(32);
   text('(High Mobility)', 600, 420);
   fill(0, 102, 153);
   
   
    fill(266, 196, 68, 200);
    textFont(myFont);
   textSize(32);
   text('Mobility Button', 280, 40);
  
   
    fill(0, 0, 0);
   textSize(25);
   translate(40, 45);
rotate(PI/2);
text("Socio-Economic Status", 0, 0);

    
}

function mousePressed() {
  // Check if mouse is inside the circle
  var d = dist(mouseX, mouseY, 500, 46);
  if (d < 50) {
    // PersonSprite.position.y = 250
    PersonSprite.velocity.y = -1
    println(PersonSprite.position.y)
    PersonSprite2.velocity.y = -1
    println(PersonSprite.position.y)
    PersonSprite3.velocity.y = -1
    println(PersonSprite.position.y)
    
     
  }
  

  
}

