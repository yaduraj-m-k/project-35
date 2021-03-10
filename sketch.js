
var Hotballon, hotballon, bgimg;
var database, position;


function preload() {

  bgimg = loadImage("Hot Air Ballon-01.png");

  hotballon = loadImage("Hot Air Ballon-02.png");

}

function setup() {
  createCanvas(2750, 1000);
  //createSprite(400, 500, 50, 50);

  database = firebase.database();

  Hotballon = createSprite(1300, 500, 10, 10);
  Hotballon.addImage(hotballon);

  var ballonpositionref = database.ref('Hotballon/position');
  ballonpositionref.on("value", readPosition, showError)

}

function draw() {
  background(bgimg);
  if (position !== undefined) {
    if (keyDown(LEFT_ARROW)) {
      writePosition(-1, 0);
    }
    else if (keyDown(RIGHT_ARROW)) {
      writePosition(1, 0);
    }
    else if (keyDown(UP_ARROW)) {
      writePosition(0, -1);
    }
    else if (keyDown(DOWN_ARROW)) {
      writePosition(0, +1);
    }
    drawSprites();
  }
}

function writePosition(x, y) {
  database.ref('Hotballon/position').set({ 'x': position.x + x, 'y': position.y + y });
}

function showError() {
  console.log("error in reading database");
}

function readPosition(data) {
  position = data.val();
  Hotballon.x = position.x;
  Hotballon.y = position.y;
}
// function keyPressed() {
//   if (position !== undefined) {
//     if (keyCode === LEFT_ARROW) {
//       console.log("left");
//       writePosition(-1, 0);
//     }
//     else if (keyCode === RIGHT_ARROW) {
//       writePosition(1, 0);
//     }
//     else if (keyCode === UP_ARROW) {
//       writePosition(0, -1);
//     }
//     else if (keyCode === DOWN_ARROW) {
//       writePosition(0, +1);
//     }
//   }
// }