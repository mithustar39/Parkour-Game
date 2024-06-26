/*
Forgotten Hero
Mithun Dhanasuthan
April,2024
dodge the obstacles and use platforms to dodge as well as Tom is trying to get to the other side to save Jerry using Arrow Keys to move

Things to do: fix jump stuff, finish levels, make function for win, make score system with timer(add power ups with cheese, -5 seconds)
*/

// https://p5play.org/learn
var gameState;
let xpos = 0 

function preload() {
  //loading images
  instructionImage = loadImage('Assets/instructionImage.png');
  levelBackground = loadImage('Assets/levelBackground.png');
  playerImage = loadImage('Assets/playerImage.png');
  playerJumpImage = loadImage('Assets/playerJumpImage.png')
  cheeseImage = loadImage('Assets/cheeseImage.png');
}
function setup() {
  new Canvas(1000, 600);
  gameState = "instructionScreen";

  //player for level 1
  player1 = new Sprite(playerImage, 50, 50, 50, 50);
  player1.visible = false;
  player1.scale = 0.2;
  player1.length = 1000;
  player1.width = 20;
  player1.x=900;
  player1.y=500;
  player1.rotationLock = true;
  player1.jump = true;
}

function draw() {
  background(0); // try removing this line and see what happens!
  // console.log(mouse.x,mouse.y)

  if (gameState === "instructionScreen") {
    instructionScreen();
  } else if (gameState === "level1") {
    levelOne();
  } else if (gameState === "level2") {
    levelTwo();
  } else if (gameState === "level3") {
    levelThree();
  } else if (gameState === "winScreen") {
    winScreen();
  } else if (gameState === "loseScreen") {
    loseScreen();
  }

}

function instructionScreen() {
  //Background
  background(0)
  fill(225)

  //Instructions
  textSize(30)
  text("Forgotten Hero", width / 3, height/8)
  textSize(20)
  text("Tom needs help saving Jerry. Help Tom pass these three stages\navoiding obstacles and getting to the end. Use the arrow keys to \nmove Tom around.", width / 10, height/4)
  text("Press Space to continue", width / 2.5, height / 1.5)

  //adding image of insturctionScreen
  imageMode('CENTER')
  image(instructionImage, -width/8, height/8)

  //If condition to go to level One
  if (kb.presses('space')) {
    gameState = "level1"
  }
}

function levelOne() {
  background(levelBackground);

  //making player visible
  player1.visible = true

  //adding gravity to the player
  world.gravity.y = 5;  

  //player movement
  if (kb.pressing('left')){
    player1.move(10, 'left', 3);
  } else if(kb.pressing('right')){
    player1.move(10, 'right', 3);
  } 
  
   //Common characteristics of most of the platforms:
   platforms = new Group();
   platforms.width = 50
   platforms.height = 10
   platforms.color = 'yellow'
   platforms.collider = 's'
 
   //draws platform sprites with random y position but are all equally spaced in terms of x position.: 
   for (var count = 0; count < 10; count++) {
     platform = new platforms.Sprite()
     platform.y = 200 + (120 * xpos)
     platform.x = -20 + count * 95
     if (count == 0 || count == 3 || count == 6 || count == 9 ) {
       xpos = 0 
     } else if (count == 1 || count == 4 || count == 7 || count == 10 ) {
       xpos = 1 
     } else if (count == 2 || count == 5 || count == 8  ) {
      xpos = 2 
    }
   }
 
   //Making border for the game. We included this with the platforms group for more concise commands in later code. 
 
   //bottom/floor characteristics:
   platforms[0] = new platforms.Sprite()
   platforms[0].width = width
   platforms[0].height = 10
   platforms[0].y = 500;
   platforms[0].color = 'white'
  //  platforms[0].collider = 's'
 
   //right wall characteristics:
   platforms[1] = new platforms.Sprite()
   platforms[1].width = 50
   platforms[1].x = width + 10
   platforms[1].y = height / 2
   platforms[1].height = height
   platforms[1].color = 'white'
  //  platforms[1].collider = 's'
 
   //left wall characteristics:
   platforms[2] = new platforms.Sprite()
   platforms[2].width = 50;
   platforms[2].x = -10;
   platforms[2].y = height / 2;
   platforms[2].height = height
   platforms[2].color = 'white'
  //  platforms[2].collider = 's'

//Making jump movement - Got help from Ms.Edwards
function makeJump(){
  player1.jump = true
}

if(player1.jump === false){
  player1.image = playerJumpImage;
} else {
  player1.image = playerImage;
}

//setting jump variable to true when the player is touching the floor, platforms, or obstacles (could jump off them in the game) and remains false if touching the side walls. 
player1.colliding(platforms, makeJump)

//If player1.jump is true according to the previous code, the player can jump when the 'up' button is pressed.
if ((player1.jump === true) && (kb.pressed('up'))) {
  player1.move(40, 'up', 3);
  player1.jump = false
}
}

function levelTwo() {

}

function levelThree() {

}

function winScreen() {

}

function loseScreen() {

}

function reset1(player){
  player.x=900;
  player.y=500;
  player.visible = true;
}