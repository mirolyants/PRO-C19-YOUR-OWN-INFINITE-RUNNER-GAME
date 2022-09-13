var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, player_running, player_hurt;

var invisibleGround;
var forestImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3;

var bird, birdsGroup, birdImage, bird_flying;

var gameOverImg, restartImg;

var score;



function preload(){

  forestImage=loadImage("forest.png");

  player=loadImage("player.png");
  player_running = loadAnimation("player_running1.png","player_running2.png");
  //,"player_running3.png","player_running4.png","player_running5.png","player_running6.png"
  player_hurt = loadImage("player_hurt.png");
    
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");

  bird1 = loadImage("bird1.png");
  bird2 = loadImage("bird2.png");
  
  gameOverAni = loadAnimation("gameOver1.png","gameOver2.png","gameOver3.png");
}

function setup() {
    createCanvas(500,300);

    player = createSprite(50,70,20,50);
    player.addAnimation("running", player_running);
    player.addImage("hurt", player_hurt);
   // player.setCollider('circle',0,0,)
    player.scale = 1;
  
    invisibleGround = createSprite(10,300,40,10);
    invisibleGround.visible = false;
    
    obstaclesGroup= new Group();
    birdsGroup= new Group();
    score = 0;

    gameOver=createSprite(250,150);
    gameOver.addAnimation(gameOverAni);
    gameOver.scale=1;
    gameOver.visible=false;
}

function draw() {
  background(forestImage)
  
  text("Score: "+ score, 500,50);

  if(gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    
    if(keyDown("SPACE")) {
      player.velocityY = 13;
      }
        
    player.velocityY = player.velocityY + 0.8;

    player.collide(invisibleGround);
        
    spawnBirds();
    spawnObstacles();

    if (player.collide(obstaclesGroup)){
      gameState=END;
      }
    }
      
    else if (gameState===END){
      gameOver.visible = true;

      player.velocityY = 0;
      obstaclesGroup.setVelocityXEach(0);
      birdsGroup.setVelocityXEach(0);

      player.changeAnimation("hurt", player_hurt);
      
      obstaclesGroup.setLifetimeEach(-1);
      birdsGroup.setLifetimeEach(-1);
        
      if( keyDown("SPACE")) {      
        reset(); 
      }

    }
      
    drawSprites();
}

function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(400,260,10,40);
    obstacle.setCollider('circle',0,0,45);
    obstacle.velocityX = -(6+3*score/100);
   
      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        case 3: obstacle.addImage(obstacle3);
                break;
        default: break;
       }
                
      obstacle.scale = 0.1;
      obstacle.lifetime = 300;
      obstacle.depth = player.depth;
      player.depth +=1;
      obstaclesGroup.add(obstacle)
    }
   }

   function spawnBirds() {
    if (frameCount % 100 === 0){
      var bird = createSprite(600,100,40,10);
      bird.velocityX = -3;
     
        var rand = Math.round(random(1,2));
        switch(rand) {
          case 1: bird.addImage(bird1);
                  break;
          case 2: bird.addImage(bird2);
                  break;
          default: break;
         }
                  
        bird.scale = 0.15;
        bird.lifetime = 200;
        bird.depth = player.depth;
        player.depth +=1;
        birdsGroup.add(bird)
        }
    
  }

  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    
    obstaclesGroup.destroyEach();
    birdsGroup.destroyEach();
    
    player.changeAnimation("running",player_running);
    
    score = 0;
    
  }
  






