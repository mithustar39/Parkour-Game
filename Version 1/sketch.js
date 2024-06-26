/*
Forgotten Hero
Mithun Dhanasuthan
April,2024
dodge the obstacles and use platforms to dodge as well as Tom is trying to get to the other side to save Jerry using Arrow Keys to move

*/

// https://p5play.org/learn
var gameState;
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

  //player
  player = new Sprite(playerImage, 50, 50, 50, 50);
  player.visibility   = false;
  //creating platform for player to stand on
  platform = rect(width,height/1.04)
}

function draw() {
  background(0); // try removing this line and see what happens!

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
}

function levelTwo() {

}

function levelThree() {

}

function winScreen() {

}

function loseScreen() {

}