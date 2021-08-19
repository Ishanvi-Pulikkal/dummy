var bird,birdImg,birdhit;
var backgroundImg, bg;
var halfPillarDown, halfPillarUp, fullPillarUp,fullPillarDown;
var halfPillarDownImg, halfPillarUpImg, fullPillarUpImg ,fullPillarDownImg,quarterPillarUpImg,quarterPillarDownImg;
var coin, coinImg;
var randomPillar;
var pillarGrp1, pillarGrp2, coinGrp;
var over, overImg;
var pillar1,pillar2;
var score=0;

function preload(){
  birdImg = loadAnimation("images/1.png","images/2.png","images/3.png","images/4.png");
  birdhit = loadAnimation("images/1.png")
  backgroundImg = loadImage("images/underwater5.png");
  halfPillarDownImg = loadImage("images/half_pillar_down.png");
  halfPillarUpImg = loadImage("images/half_pillar_up.png");
  fullPillarUpImg = loadImage("images/pillar_up.png");
  fullPillarDownImg = loadImage("images/pillar_down.png");
  quarterPillarDownImg = loadImage("images/1_4_pillar_down.png")
  quarterPillarUpImg = loadImage("images/1_4_pillar_up.png")
  coinImg = loadImage("images/goldcoin.png")
  overImg = loadImage("images/gameover.png");
}

function setup() {
  createCanvas(1365,770);
  
  bird = createSprite(200,400,20,20)
  bird.addAnimation("Bird",birdImg);
  bird.scale = 0.5
  bird.setCollider("circle",0,0,70)
  bird.debug = false

 
  pillarGrp1 = new Group();
  pillarGrp2 = new Group();
  coinGrp = new Group();

  //console.log(pillarGrp1.x);
  //console.log(pillarGrp2.x);


}

function draw() {
  background(backgroundImg);  




  if(keyDown("up")){
    bird.y -=6
  }
  if(keyDown("down")){
    bird.y +=6
  }
  if(bird.isTouching(coinGrp)){
    //text("coins Touched",750,300)
    coinGrp.destroyEach();
    score = score+2
    
  }
  if(bird.isTouching(pillarGrp1)){
    bird.changeAnimation("BirdHit",birdhit);
    pillarGrp1.setVelocityXEach(0);
    pillarGrp1.setLifetimeEach(-1);
    pillarGrp2.setVelocityXEach(0);
    pillarGrp2.setLifetimeEach(-1);
    coinGrp.setVelocityXEach(0);
    coinGrp.setLifetimeEach(-1);
    background(0)
  }
  if(bird.isTouching(pillarGrp2)){
    bird.changeAnimation("BirdHit",birdhit);
    pillarGrp1.setVelocityXEach(0);
    pillarGrp1.setLifetimeEach(-1);
    pillarGrp2.setVelocityXEach(0);
    pillarGrp2.setLifetimeEach(-1);
    coinGrp.setVelocityXEach(0);
    coinGrp.setLifetimeEach(-1);
   background(0)
  }
  fill(0)
  textSize(50)
  text("Score: "+score,1000,100)
  
  spawnPillars();
  
  drawSprites();
}

function spawnPillars(){
  if(frameCount % 110 ===0){
    pillar1 = createSprite(1500,100);
    pillar2 = createSprite(1500,600);
    coin = createSprite(1500,400)
    randomPillar = Math.round(random(1,3))
    if(randomPillar === 1){
      pillar1.addImage(halfPillarUpImg);
      pillar2.addImage(halfPillarDownImg)
        coin.addImage(coinImg)
      pillar1.scale = 0.5;
      pillar2.scale = 0.5;
        coin.scale = 0.35
      pillar1.y = Math.round(random(50,250));
      pillar2.y = Math.round(random(650,800))
        coin.y = Math.round(random(400,500))
      
    }
    else if(randomPillar === 2){
      pillar1.addImage(quarterPillarUpImg);
      pillar2.addImage(fullPillarDownImg)
        coin.addImage(coinImg)
      pillar1.scale = 0.4;
      pillar2.scale = 0.7;
        coin.scale = 0.35
      pillar1.y = Math.round(random(50,150));
      pillar2.y = Math.round(random(650,800))
        coin.y = Math.round(random(300,500))
    } 
    else {
      pillar1.addImage(fullPillarUpImg);
      pillar2.addImage(quarterPillarDownImg)
        coin.addImage(coinImg);
      pillar1.scale = 0.7;
      pillar2.scale = 0.4;
        coin.scale = 0.35
      pillar1.y = Math.round(random(50,150));
      pillar2.y = Math.round(random(650,800))
        coin.y = Math.round(random(300,500))
    } 
  
    pillar1.velocityX = -10
    pillar2.velocityX = -10
    coin.velocityX = -10
    pillarGrp1.lifetime = 5
    pillarGrp2.lifetime = 5

    pillarGrp1.add(pillar1);
    pillarGrp2.add(pillar2);
    coinGrp.add(coin);

  }
}
