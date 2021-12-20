var prince
var monster
var dragon
var bg,bgimage
var gameState="play"
var score=0
var dragonGroup
var monsterGroup
var bulletGroup
var gameOver

function preload(){
  bgimage=loadImage("volcano sky.jpg")
}

function setup() {
  createCanvas(displayWidth-100,displayHeight-100);
  prince=createSprite(200, 200, 50, 50);

  dragonGroup=new Group()
  monsterGroup= new Group()
  bulletGroup= new Group()
  gameOver=createSprite(displayWidth/2,displayHeight/2,50,10)
  gameOver.visible=false;
}

function draw() {
  background(bgimage)  
  if(gameState==="play"){
   
    if(keyDown(UP_ARROW)){
      prince.y=prince.y-10
    }
    if(keyDown(DOWN_ARROW)){
      prince.y=prince.y+10
    }
    if(keyDown(RIGHT_ARROW)){
      prince.x=prince.x+10
    }
    if(keyDown(LEFT_ARROW)){
      prince.x=prince.x-10
    }
    if(keyWentDown("space")){
      spawnbullet()
    }
  
    spawnDragons()
    spawnMonsters()

    if(bulletGroup.isTouching(dragonGroup)){
      for(var i=0;i<dragonGroup.length;i++){
        if(dragonGroup[i].isTouching(bulletGroup)){
          dragonGroup[i].destroy()
        }
      }
    }
    if(bulletGroup.isTouching(monsterGroup)){
      for(var i=0;i<monsterGroup.length;i++){
        if(monsterGroup[i].isTouching(bulletGroup)){
          monsterGroup[i].destroy()
        }
      }
    }
    if(prince.isTouching(dragonGroup)||prince.isTouching(monsterGroup)){
      gameState="end"
    }
  
  }
  else if(gameState==="end"){
    prince.destroy()
    dragonGroup.setVelocityXEach(0)
    monsterGroup.setVelocityYEach(0)
    bulletGroup.destroyEach()
    gameOver.visible=true;
  }
  drawSprites();
}

function spawnDragons(){
  if(World.frameCount%120===0){
    dragon=createSprite(displayWidth+50,displayHeight-220,10,50)
    dragon.y=random(100,displayHeight-100)
    dragon.velocityX=-5
    dragon.lifetime=600
    dragonGroup.add(dragon)
  }
}

function spawnMonsters(){
  if(World.frameCount%150===0){
    monster=createSprite(500,-30,10,50)
    monster.x=random(200,displayWidth/2)
    monster.velocityY=5
    monster.lifetime=600
    monsterGroup.add(monster)
  }
}

function spawnbullet(){
 bullet=createSprite(prince.x,prince.y,10,5)
 bullet.velocityX=10
 bulletGroup.add(bullet)
}