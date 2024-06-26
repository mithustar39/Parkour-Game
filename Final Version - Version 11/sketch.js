/*
Forgotten Hero
Mithun Dhanasuthan
May 23,2024
dodge the obstacles and use platforms to dodge as well as Tom is trying to get to the other side to save Jerry using
Game is Scalable
*/
// https://p5play.org/learn

//stating variables
var gameState;
let xpos = 0;
let platformsArray = [];
var stopwatch = 0;

function preload() {
  // loading images
  instructionImage = loadImage('Assets/instructionImage.png');
  levelBackground = loadImage('Assets/levelBackground.png');
  playerImage = loadImage('Assets/playerImage.png');
  playerJumpImage = loadImage('Assets/playerJumpImage.png');
  cheeseImage = loadImage('Assets/cheeseImage.png');
  powerUpImage = loadImage('Assets/clock.png')
}

function setup() {
  new Canvas(1000, 600);

  //setting the gamestate for the start of the game
  gameState = "instructionScreen";

  // creating the player and the properties
  player = new Sprite(playerImage, width/50, height/30, width/50, height/30);
  player.visible = false;
  player.scale = (width*height)/6000000;
  player.height = height/20;
  player.width = width/50;
  player.x = width/1.11;
  player.y = height/1.2;
  player.rotationLock = true;
  player.jump = true;

  // cheese for levels
  cheese1 = new Sprite(cheeseImage, width/50, height/30, width/50, height/30);
  cheese1.visible = false;
  cheese1.x = width/2;
  cheese1.y = height/6;
  cheese1.rotationLock = true;
  cheese1.collider = 's';

  // powerups for levels
  powerUp = new Group();
  powerUp.image = powerUpImage;
  powerUp.scale = (width*height)/3000000;
  powerUp.visible = false;
  powerUp.rotationLock = true;
  powerUp.collider = 'none';
  //powerup for level 1
  powerUp1 = new powerUp.Sprite();
  powerUp1.x = width/3.57;
  powerUp1.y = height/2.14;
  //powerup for level 2
  powerUp2 = new powerUp.Sprite();
  powerUp2.x = width/3.57;
  powerUp2.y = height/2.14;
  //powerUp for level 3;
  powerUp3 = new powerUp.Sprite();
  powerUp3.x = width/3.57;
  powerUp3.y = height/2.14;

  // Common characteristics of most of the platforms:
  platforms = new Group();
  platforms.width = width/20;
  platforms.height = height/60;
  platforms.color = 'yellow';
  platforms.collider = 's';


  // Create the platforms and store in an array
  for (var count = 0; count < 10; count++) {
    let platform = new platforms.Sprite();
    platform.y = height/3 + ((height/5) * xpos);
    platform.x = -(width/50) + count * (width/10.5);
    //if condition to make platforms go on a variety of heights
    if (count == 0 || count == 3 || count == 6 || count == 9) {
      xpos = 0;
    } else if (count == 1 || count == 4 || count == 7 || count == 10) {
      xpos = 1;
    } else if (count == 2 || count == 5 || count == 8) {
      xpos = 2;
    }
    platformsArray.push(platform);
  }

  // bottom/floor characteristics:
  let floor = new platforms.Sprite();
  floor.width = width;
  floor.height = height/20;
  floor.y = height/1.1;
  floor.color = 'white';
  platformsArray.push(floor);

  // right wall characteristics:
  let rightWall = new platforms.Sprite();
  rightWall.width = width/20;
  rightWall.x = width + (width/100);
  rightWall.y = height / 2;
  rightWall.height = height;
  rightWall.color = 'white';
  platformsArray.push(rightWall);

  // left wall characteristics:
  let leftWall = new platforms.Sprite();
  leftWall.width = width/20;
  leftWall.x = -(width/100);
  leftWall.y = height / 2;
  leftWall.height = height;
  leftWall.color = 'white';
  platformsArray.push(leftWall);

  // Common characteristics of most of the obstacles of level 2:
  balls = new Group();
  balls.diameter = width/20
  balls.color = 'yellow'
  balls.collider = 'none'
  balls.vel.x = width/200
  balls.visible = false;

  //Creating obstacles for level 2 
  for (let amount = 0; amount < 7; amount++) {
    ball = new balls.Sprite()
    ball.x = random((width/20),(width/13.33))
    ball.y = random(height - (height/3))
  }
}

function draw() {
  background(0);

  //if condition for when the stopwatch should be running
  if(frameCount%60 === 0 && gameState != 'instructionScreen'&& gameState != 'level1Win'&& gameState != 'level2lose'&& gameState != 'level2Win'&& gameState != 'level3lose'&& gameState != 'winScreen'&& gameState != 'loseScreen'){
    stopwatch++;
  }

  // console.log(mouse.x,mouse.y)

  //setting the conditions to move on to each screen
  if (gameState === "instructionScreen") {
    instructionScreen();
  } else if (gameState === "level1") {
    levelOne();
  } else if (gameState === 'level1Win') {
    level1Win();
  } else if (gameState === "level2") {
    levelTwo();
  } else if (gameState === "level2lose") {
    level2lose();
  } else if (gameState === "level2Win") {
    level2Win();
  } else if (gameState === "level3") {
    levelThree();
  } else if (gameState === "level3lose") {
    level3lose();
  } else if (gameState === "winScreen") {
    winScreen();
  } else if (gameState === "loseScreen") {
    loseScreen();
  }
}

function instructionScreen() {
  // Background
  background(0);
  fill(225);

  //visibilities
  platforms.visible = false;

  // Instructions
  textSize(30);
  text("Forgotten Hero", width / 3, height / 8);
  textSize(20);
  text("Tom needs help collecting his cheese. Help Tom collect it by \navoiding obstacles and getting to the end. Use the arrow keys to \nmove Tom around.", width / 10, height / 4);
  text("Press Space to continue", width / 2.5, height / 1.5);

  // adding image of instructionScreen
  imageMode('CENTER');
  image(instructionImage, -width / 8, height / 8);

  // If condition to go to level One
  if (kb.presses('space')) {
    gameState = "level1";
  }
}

function levelOne() {
  //background
  background(levelBackground);

  // making player visible
  player.visible = true;

  // making cheese visible
  cheese1.visible = true;

  // adding gravity to the player
  world.gravity.y = height/30;

   // Make all platforms visible
   platformsArray.forEach(platform => platform.visible = true);

   //stopwatch
   text("Time: "+stopwatch+"seconds", width/20, height/12)
  
  // player movement - vertical movement is further down
  if (kb.pressing("right")) {
    player.vel.x++;
  } else if (kb.pressing("left")) {
    player.vel.x--;
  } else {
    player.vel.x = 0;
  }

  // Making vertical movement - Got help from Ms.Edwards
  function makeJump() {
    player.jump = true;
  }

  // setting conditions for jump when in air
  if (player.jump === false) {
    player.image = playerJumpImage;
  } else if (player.jump === true) {
    player.image = playerImage;
  }

  // setting jump variable to true when the player is touching the floor, platforms, or obstacles (could jump off them in the game) and remains false if touching the side walls.
  player.colliding(platforms, makeJump);

  // If player.jump is true according to the previous code, the player can jump when the 'up' button is pressed.
  if ((player.jump === true) && (kb.pressed('up'))) {
    player.vel.y = -(height/60);
    player.jump = false;
  } else if (player.jump === false) {
    player.vel.y = 0;
  }

  // down movement to fall faster
  if (kb.pressing('down')) {
    player.y += height/60;
  }

  // making the win condition
  if (player.collided(cheese1) === true) {
    gameState = 'level1Win';
  }

  //making the powerUp activate when collided with player, also stating visiblity for powerup
  if(player.collided(powerUp1)){
    powerUpActivate(powerUp1)
  } else{
    powerUp1.visible = true;
    powerUp1.collider = 's';
  }
}

function level1Win() {
  //visibilities
  cheese1.visible = false;
  player.visible = false;

   //stopwatch
   text("Time: "+stopwatch+"seconds", width/20, height/12)

  //postiion for player
  player.x = width/1.11;
  player.y = height/1.5;

  // Make all platforms invisible
  platformsArray.forEach(platform => platform.visible = false);

  //text to tell them how to move on to the next level
  text("You finished the level \nPress ENTER to go to level 2", width / 3, height/6);
  if (kb.presses('ENTER')) {
    gameState = 'level2';
  }
}

function levelTwo() {
  // setting the background for level 2
  background(levelBackground);

  // setting visibilities for sprites
  player.visible = true;
  balls.visible = true;
  cheese1.visible = true;
  
  //setting collider
  balls.collider = 'k'

  //setting velocity of obstacles
  balls.vel.x = width/200;
  
  // Make all platforms invisible
  platformsArray.forEach(platform => platform.visible = true);

  //stopwatch
  text("Time: "+stopwatch+"seconds", width/20, height/20)

   // player movement - vertical movement is further down
   if (kb.pressing("right")) {
    player.vel.x++;
  } else if (kb.pressing("left")) {
    player.vel.x--;
  } else {
    player.vel.x = 0;
  }

  // Making vertical movement - Got help from Ms.Edwards
  function makeJump() {
    player.jump = true;
  }

  // setting conditions for jump when in air
  if (player.jump === false) {
    player.image = playerJumpImage;
  } else if (player.jump === true) {
    player.image = playerImage;
  }

  // setting jump variable to true when the player is touching the floor, platforms, or obstacles (could jump off them in the game) and remains false if touching the side walls.
  player.colliding(platforms, makeJump);

  // If player.jump is true according to the previous code, the player can jump when the 'up' button is pressed.
  if ((player.jump === true) && (kb.pressed('up'))) {
    player.vel.y = -10;
    player.jump = false;
  } else if (player.jump === false) {
    player.vel.y = 0;
  }

  // down movement to fall faster
  if (kb.pressing('down')) {
    player.y += height/60;
  }

  //changing the gameState to lose
  function lose(){
    gameState ='level2lose'
  }

  //calling function lose when the player collides with the balls/obstacles
  player.colliding(balls, lose)

  // setting conditions for winning and loosing
  // making the win condition
 if (player.collided(cheese1) === true) {
  gameState = 'level2Win';
  }else{
   //the level continues on 
    //putting the balls back in the canvas
   for (let number = 0; number < balls.length; number++) {
    
    if (balls[number].x < 0) {
      balls[number].x = 0;
    }
    else if (balls[number].x > width) {
      balls[number].x = 0;
      balls[number].y = random(height - (height/7.5))
    }
    }
  }

 //making the powerUp activate when collided with player, also stating visiblity for powerup
 if(player.collided(powerUp2)){
    powerUpActivate(powerUp2);
  } else{
   powerUp2.visible = true;
  powerUp2.collider = 's';
  }

}

function level2lose(){
  //making the gane freeze
  balls.vel.x = 0;
  //visibiltiies
  balls.visible = false;

 //setting postition of obstalces
 balls.x = random(10,50)
 balls.y = random(height - (height/3))

   //stopwatch
   text("Time: "+stopwatch+"seconds", width/20, height/12)

 //letting player restart the level
  text("You Lost, Press 'r' to restart", width / 6, height/6);
  if (kb.presses('r')) {
    gameState = 'level2'
   }
  }

function level2Win(){
  //visbilities
  cheese1.visible = false;
  player.visible = false;
  balls.visible = false

  // Make all platforms invisible
  platformsArray.forEach(platform => platform.visible = false);

  //postiion for player
  player.x = 900;
  player.y = 400;
  
  //colliders
  balls.collider = 'none'

   //stopwatch
   text("Time: "+stopwatch+"seconds", width/20, height/12)

  //letting player move on to level 3
  fill('white')
  text("You finished the level \nPress ENTER to go to level 3", width / 3, height/6);
  if (kb.presses('ENTER')) {
    gameState = 'level3';
  }
}

function levelThree() {
  //background
  background(levelBackground);

  // making player visible
  player.visible = true;

  // making cheese visible
  cheese1.visible = true;

  //making powerup visible
  powerUp.visible = true;
  

  // adding gravity to the player
  world.gravity.y = height/30;

   // Make all platforms visible
   platformsArray.forEach(platform => platform.visible = true);

   //text instruction
   text("CONTROLS ARE INVERTED, HAHAHAHA!", width / 3, height/12);
  
   //stopwatch
   text("Time: "+stopwatch+"seconds", width/20, height/12)

  // player movement - vertical movement is further down
  if (kb.pressing("left")) {
    player.vel.x++;
  } else if (kb.pressing("right")) {
    player.vel.x--;
  } else {
    player.vel.x = 0;
  }

  // Making vertical movement - Got help from Ms.Edwards
  function makeJump() {
    player.jump = true;
  }

  // setting conditions for jump when in air
  if (player.jump === false) {
    player.image = playerJumpImage;
  } else if (player.jump === true) {
    player.image = playerImage;
  }

  // setting jump variable to true when the player is touching the floor, platforms, or obstacles (could jump off them in the game) and remains false if touching the side walls.
  player.colliding(platforms, makeJump);

  // If player.jump is true according to the previous code, the player can jump when the 'up' button is pressed.
  if ((player.jump === true) && (kb.pressed('down'))) {
    player.vel.y = -(height/60);
    player.jump = false;
  } else if (player.jump === false) {
    player.vel.y = 0;
  }

  // down movement to fall faster
  if (kb.pressing('up')) {
    player.y += height/60;
  }

  // making the win condition
  if (player.collided(cheese1) === true) {
    gameState = 'winScreen';
  }

 //making the powerUp activate when collided with player, also stating visiblity for powerup
  if(player.collided(powerUp3)){
    powerUpActivate(powerUp3)
  } else{
    powerUp3.visible = true;
    powerUp3.collider = 's';
  } 

}

function winScreen() {
  // Background
  background(0);
  fill(225);

  //stopwatch
  text("Time: "+stopwatch+"seconds", width / 2.5, height / 1.5)

  //visibilities
  platforms.visible = false;
  player.visible = false;
  cheese1.visible = false;
  
  // Instructions
  textSize(30);
  text("Forgotten Hero", width / 3, height / 8);
  textSize(60);
  text("You Win!", width / 2, height / 2);


  // adding image 
  imageMode('CENTER');
  image(instructionImage, -width / 8, height / 8)
}

 //making powerUp subtract 3 seconds from stopwatch if collided with
 function powerUpActivate(sprite){
  //subtracting 3 seconds from timer
  stopwatch -= 3;
  sprite.visible = false;
  sprite.collider = 'none'
  sprite.x = -(width*2);
}