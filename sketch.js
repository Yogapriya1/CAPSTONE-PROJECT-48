var path,rocket,stars1,stars2,stars3,astroids;
var pathImg,rocketImg,stars1Img,stars2Img,stars3Img,astroidsImg;
var Score = 0;
var stars1G,stars2G,stars3G,astroidsGroup;

var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("path1.png");
  rocketImg = loadAnimation("rocket.png");
  stars1Img = loadImage("stars1.png");
  stars2Img = loadImage("stars2.png");
  stars3Img = loadImage("stars3.png");
  astroidsImg = loadImage("astroid.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(700,500);

path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 10;



rocket = createSprite(width/2,height-30);
rocket.addAnimation("RocketRunning",rocketImg);
rocket.scale=0.12;
//rocket.debug = true
rocket.setCollider ("rectangle", 10,10,200,850)
  
gameover = createSprite(width/2,height/2- 50);
gameover.addAnimation("RocketRunning",endImg) 
gameover.visible = false
  
stars1G=new Group();
stars2G=new Group();
stars3G=new Group();
astroidsGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  rocket.x = World.mouseX;
  
  edges= createEdgeSprites();
  rocket.collide(edges);
  

  if(path.y > height){
    path.y = height/2;
  }
  
    createStars1();
    createStars2();
    createStars3();
    createAstroids();

    if (stars1G.isTouching(rocket)) {
      stars1G.destroyEach();
      Score=Score+1;
    }
    else if (stars2G.isTouching(rocket)) {
      stars2G.destroyEach();
      Score=Score+2;
      
    }else if(stars3G.isTouching(rocket)) {
      stars3G.destroyEach();
      Score=Score+3;
      
    }else{
      if(astroidsGroup.isTouching(rocket)) {
        gameState=END
        gameover.visible = true
        rocket.x = 200
        rocket.y = 300
        rocket.visible = false
        stars1G.destroyEach();
        stars1G.setVelocityYEach(0)
        stars2G.destroyEach();
        stars2G.setVelocityYEach(0)
        stars3G.destroyEach();
        stars3G.setVelocityYEach(0) 
        astroidsGroup.destroyEach();
        astroidsGroup.setVelocityYEach(0)
   
      }
  }
  
  drawSprites();
  textSize(20);
  fill("white");
  text("Stars: "+ Score, 20,40)
  }

}

function createStars1() {
  if (World.frameCount % 200 == 0) {
  var stars1 = createSprite(Math.round(random(50, width-50),40, 10, 10));
  stars1.addImage(stars1Img);
  stars1.scale=0.12;
  stars1.velocityY = 3;
  stars1.lifetime = 250;
  stars1G.add(stars1);
  }
}

function createStars2() {
  if (World.frameCount % 420 == 0) {
  var stars2 = createSprite(Math.round(random(50, width-50),40, 10, 10));
  stars2.addImage(stars2Img);
  stars2.scale=0.12;
  stars2.velocityY = 3;
  stars2.lifetime = 250;
  stars2G.add(stars2);
}
}

function createStars3() {
  if (World.frameCount % 610 == 0) {
  var stars3 = createSprite(Math.round(random(50, width-50),40, 10, 10));
  stars3.addImage(stars3Img);
  stars3.scale=0.12;
  stars3.velocityY = 3;
  stars3.lifetime = 250;
  stars3G.add(stars3);
  }
}

function createAstroids(){
  if (World.frameCount % 80 == 0) {
  var astroids = createSprite(Math.round(random(50, width-50),40, 10, 10));
  astroids.addImage(astroidsImg);
  astroids.scale=0.1;
  astroids.velocityY = 5;
  astroids.lifetime = 250;
  astroidsGroup.add(astroids);
  }
}
