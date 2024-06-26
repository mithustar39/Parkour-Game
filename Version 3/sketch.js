/*
Forgotten Hero
Mithun Dhanasuthan
April,2024
dodge the obstacles and use platforms to dodge as well as Tom is trying to get to the other side to save Jerry using Arrow Keys to move

*/

// https://p5play.org/learn
var gameState;
let xpos = 0 

function preload() {
  //loading images
  instructionImage = loadImage('Assets/instructionImage.png');
  levelBackground = loadImage('Assets/levelBackground.png');
  playerImage = loadImage('Assets/playerImage.png');
  cheeseImage = loadImage('Assets/cheeseImage.png');
}
function setup() {
  new Canvas(1000, 600);
  gameState = "instructionScreen";

  //player for level 1
  player1 = new Sprite(playerImage, 50, 50, 50, 50);
  player1.visible = false;
  player1.x=900;
  player1.y=500;
  player1.rotationLock = true;

}

function draw() {
  background(0); // try removing this line and see what happens!
  console.log(mouse.x,mouse.y)

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
  var playerJump = true;

  //reseting player to positioin
  //reset();

  //making player visible
  player1.visible = true

  //adding gravity to the player
  world.gravity.y = 5;  

  if (kb.pressing('left')){
    player1.x-=10;
  } else if(kb.pressing('right')){
    player1.x+=10;
  } 
  
   //Common characteristics of most of the platforms:
   platforms = new Group();
   platforms.width = 50
   platforms.height = 10
   platforms.color = 'yellow'
   platforms.collider = 'k'
 
   //draws platform sprites with random y position but are all equally spaced in terms of x position.: 
   for (var count = 0; count < 10; count++) {
     platform = new platforms.Sprite()
     platform.y = 200 + (120 * xpos)
     platform.x = -20 + count * 95
     if (count == 0 || count == 3 || count == 6 || count == 9 ) {
       xpos = 0 //Odd number platforms will have an x position of 450.
     } else if (count == 1 || count == 4 || count == 7 || count == 10 ) {
       xpos = 1 //Even number platforms will have an x position of 200.
     } else if (count == 2 || count == 5 || count == 8  ) {
      xpos = 2 //Even number platforms will have an x position of 200.
    }
   }
 
   //Making border for the game. We included this with the platforms group for more concise commands in later code. 
 
   //bottom/floor characteristics:
   platform[0] = new platforms.Sprite()
   platform[0].width = width
   platform[0].height = 10
   platform[0].y = 500;
   platform[0].color = 'white'
   platform[0].collider = 's'
 
   //right wall characteristics:
   platform[1] = new platforms.Sprite()
   platform[1].width = 50
   platform[1].x = width + 10
   platform[1].y = height / 2
   platform[1].height = height
   platform[1].color = 'white'
   platform[1].collider = 's'
 
   //left wall characteristics:
   platform[2] = new platforms.Sprite()
   platform[2].width = 50;
   platform[2].x = -10;
   platform[2].y = height / 2;
   platform[2].height = height
   platform[2].color = 'white'
   platform[2].collider = 's'
        
  //setting jump variable to true when the player is touching the floor, platforms, or obstacles (could jump off them in the game) and remains false if touching the side walls. 
  if ((player1.colliding(platform[0]))) {
    playerJump = true
  } else if ((player1.colliding(platforms))) {
   playerJump = true;
  } else {
   playerJump = false;
  }

//If playerJump is true according to the previous code, the player can jump when the 'up' button is pressed.
if ((playerJump === true) && (kb.pressed('up'))) {
  player1.y-=40;
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