var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = 'play';

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
 background("black");
  //tower creations 
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  //ghost creations
  ghost = createSprite(300,300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.5;
  ghost.setCollider("rectangle",0,0,200,270);
  
  //Groups
  doorsGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
  background("black");
  drawSprites();

     if(gameState==="play"){

      spookySound.play();

      if(tower.y > 400){
        tower.y = 300;
      }
       //keybinds
      if(keyDown("LEFT_ARROW")){
        ghost.x = ghost.x -6;
      }

      if(keyDown("RIGHT_ARROW")){
        ghost.x = ghost.x +6;
      }

      if(keyDown("SPACE")){
        ghost.velocityY = -3;
      }

    
      ghost.velocityY = ghost.velocityY + 0.5;

      if(ghost.y >600 || doorsGroup.isTouching(ghost)){
        gameState = "end";

      }

      obstacles()
    }

    if(gameState==="end"){
     background("black");
      //spooky music
      spookySound.stop();
    
      //ghost Endstate
      ghost.velocityY = 0;
      ghost.velocityX = 0;
      
      invisibleBlockGroup.visible = false;

      //GAME OVER text
      textSize(30);
      fill("red");
      text("GAME OVER", 210,300);

      doorsGroup.setLifetimeEach(-1);
      climberGroupGroup.setLifetimeEach(-1);
      invisibleBlockGroup.setLifetimeEach(-1);

     
     doorsGroup.setVelocityXEach(0);
     climberGroupGroup.setVelocityXEach(0);  
     invisibleBlockGroup.setVelocityXEach(0);
      //destroying Sprites
      tower.destroy();
      ghost.destroy();
       
    }
  }

function obstacles(){

  //framecount doors

    if(frameCount %240 === 0){
     doors = createSprite(random(60,520),10,10,10);
     doors.addImage(doorImg);
     doors.velocityY = 2;
     doors.Lifetime = 300;
     doors.radiu
     doorsGroup.add(doors);
  
  //framecount climber
     climber = createSprite(10,70,10,10);
     climber.addImage(climberImg);
     climber.x = doors.x;
     climber.velocityY = 2;
     climber.Lifetime = 300;
     climberGroup.add(climber);

  //framecount invisibleBlock
     invisibleBlock = createSprite(10,80,50,10);
     invisibleBlock.x = doors.x;
     invisibleBlock.Lifetime = 300;
     invisibleBlock.velocityY = 2;
     invisibleBlock.visible = false;
     invisibleBlockGroup.add(invisibleBlock)

     //depth
    doors.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;

    climber.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
  }
}