var path,boy,cash,diamonds,jewellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jewelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jewelleryG,swordGroup;
var gameover;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jewelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameoverImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;

//creating boy running
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  // creating groups
cashG=new Group();
diamondsG=new Group();
jewelleryG=new Group();
swordGroup=new Group();

}

function draw() {
 
  background(0);
  
  if(gameState===PLAY){
  boy.x = World.mouseX;
  
//code to reset the background
if(path.y > 400 ){
  path.y = height/2;
}

  edges= createEdgeSprites();
  boy.collide(edges);
  
    createCash();
    createDiamonds();
    createJewellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 100;      
    }
    else if(jewelleryG.isTouching(boy)) {
      jewelleryG.destroyEach();
      treasureCollection = treasureCollection+150;
      
    }
    else if(swordGroup.isTouching(boy)) {
      gameState = END;
      path.changeAnimation("path", pathImg);
      
      boy.addAnimation("SahilRunning",gameoverImg);
      boy.scale = 0.5;

      boy.x = 200;
      boy.y = 300;

      cashG.destroyEach();
      cashG.setVelocityYEach(0);

      jewelleryG.destroyEach();
      jewelleryG.setVelocityYEach(0);

      diamondsG.destroyEach();
      diamondsG.setVelocityYEach(0);
    }
  }
  else if (gameState === END){
    path.velocityY = 0;
    
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,50,30);
  

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJewellery() {
  if (World.frameCount % 410 == 0) {
  var jewellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jewellery.addImage(jewelleryImg);
  jewellery.scale=0.13;
  jewellery.velocityY = 3;
  jewellery.lifetime = 150;
  jewelleryG.add(jewellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}