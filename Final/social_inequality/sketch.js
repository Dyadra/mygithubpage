var theta = 0.0;
var rectangle;
var Monies;
var r;


function setup() {
  createCanvas(500,500)
  
  rectangle = createSprite(250, 410, 400, 10);
  
   Monies = new Group();
     for(var i=0; i<4; i++){
     var monie = createSprite(random(350,400),(i*30)+300, 10, 20);
    monie.setCollider("circle", -2,2,2,12)
    monie.velocity.y = 0.5;
    Monies.add(monie);
  }for(var i = 0; i<Monies.length; i++) {
  // var bf = badfishes[i];
  // bf.addAnimation("badfishimage",badfishimage);
  // println(bf.position.x)
    };
}

function draw() {
  background(0)
   triangle(210, 475, 238, 420, 266, 475);
   
   Monies.collide(rectangle);
  // rect
   
   
   if (mouseIsPressed){
    // rect(50, 410, 400, 10);
     theta = theta + .05
     rectangle.rotation = -10;
     Monies.position.y = 300
     print(theta)
   }else{
     rectangle.rotation = 10;
   }
   
   
   
   
   
   drawSprites();
   
   
   
}