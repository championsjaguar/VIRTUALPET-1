var dog1, dog2, dog;
var database, food, foodCountRef, foods;

function preload() {
  dog1 = loadImage("dogImg.png");
  dog2 = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(800, 800);
  dog = createSprite(400, 600, 80, 80);

  dog.addImage("normal", dog1);
  dog.addImage("happy", dog2);

  database = firebase.database();

  var foodCountRef = database.ref("FOOD");
  foodCountRef.on("value", readFood);
  dog.scale = 0.2;
}

function draw() {
  background("green");
  textSize(25);
  fill("black");
  text("FOOD REMAINING : " + foods, 200, 300);

  if (keyWentDown("UP_ARROW")) {
    writeFood(foods);
    dog.changeImage("happy", dog2);
  }
  if (keyWentUp("UP_ARROW")) {
    dog.changeImage("normal", dog1);
  }
  drawSprites();
}

function readFood(data) {
  foods = data.val();
}

function writeFood(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref("/").set({
    FOOD: x,
  });
}
