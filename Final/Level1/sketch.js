var gravity = 3;
    var mgr = new SceneManager();
  // mgr.addScene ( OtherGame);
var  XPs; 
function Intro()
{

    var gravity = 3;
    var bomby;


    this.setup = function()  {
     createCanvas(1000,1000);
    // var mgr = new SceneManager();
 
    bottomwall = createSprite(600,450,5000,100);
    player = createSprite(100,400,50,50)
    Voucher = createSprite(500,200,200,100)
    bottomwall.immovable = true
    LL = createSprite(400,380,50,50)
    LL2 = createSprite(900,380,50,50)
    LL3 = createSprite(1600,380,50,50)
    LL4 = createSprite(2200,380,50,50)
    LL5 = createSprite(3000,380,50,50)
    
    
    
     XPs = new Group();
     for(var i=0; i<5; i++){
     var XP = createSprite(((i*30)+50),50, 10, 20);
    // badfish.setCollider("circle", -2,2,10,10)
    // badfish.setSpeed(random(-0.1,-1),0);
    XPs.add(XP);
  }for(var i = 0; i<XPs.length; i++) {
  // var bf = badfishes[i];
  // bf.addAnimation("badfishimage",badfishimage);
  // println(bf.position.x)
    };
  
   
    } 
    
    // end setup



    this.draw = function() {
   background(51);
  // camera.position.x = player.position.x;
  player.collide(bottomwall);
  
   for (var i = 0; i<XPs.length; i++) {
   XPs[i].position.x = ((i*30)-450) + player.position.x
   }
  if(keyIsDown(RIGHT_ARROW)) {
    player.velocity.x = 10;
  }
  else if(keyIsDown(LEFT_ARROW)) {
    player.mirrorX(-1);
    player.velocity.x = -10;
  }
  
  else if(keyIsDown(UP_ARROW)) {
    player.velocity.y = -2;
  }else {
    player.velocity.x = 0;
    player.velocity.y = gravity
  }
  
   if (player.overlap(LL) && XPs.length == 5){
      print("hit")
      XPs[0].remove();
  }
  
  if (player.overlap(LL2) && XPs.length == 4){
      print("hit")
      XPs[0].remove();
  }
  
  if (player.overlap(LL3) && XPs.length == 3){
      print("hit")
      XPs[0].remove();
  }
  
  if (player.overlap(LL4) && XPs.length == 2){
      print("hit")
      XPs[0].remove();
  }
  
  if (player.overlap(LL5) && XPs.length == 1){
      print("hit")
      XPs[0].remove();
  }
  
  
  drawSprites();
   camera.on();
    camera.position.x = player.position.x
    
    if (XPs.length == 0){
        this.sceneManager.showScene( Game );
      player.remove();
      Voucher.remove();
    }
    
  
}
}
    
    function Game()
{
    this.setup = function() {
      
    bottomwall2 = createSprite(600,450,3000,100);
    player2 = createSprite(100,400,100,100)
    bottomwall.immovable = true
    camera.on()
   
    }

    this.draw = function() {
         background(0);
          player2.collide(bottomwall2);;
       print("hey")
      drawSprites();
      // have whatever sad thing that happens when we reveal that it is hard getting a voucher
       camera.position.x = player2.position.x

   
       
    }
}