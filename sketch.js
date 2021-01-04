//Create variables here
const World=Matter.World;
const Engine=Matter.Engine;
const Bodies=Matter.Bodies;

var dog,happyDog,database,food,foodStock;

function preload(){
  //load images here
  IMG1=loadImage("images/dogImg.png");
  IMG2=loadImage("images/dogImg1.png") 
}

function setup() {
  createCanvas(500, 500);
  
  database=firebase.database();
  foodStock=database.ref('food');
  foodStock.on("value",readStock);

  dog=createSprite(width/2,height/2,10,10);
  dog.addImage(IMG1);
  dog.scale=0.25
 
}


function draw() { 
  background(46,139,87) 

  if(keyDown(UP_ARROW)){
    writeStock(food);
    food=food-1
    dog.addImage(IMG2)
  }
  if(food<0){
    food=0
  }
  if(keyDown(DOWN_ARROW)){
    food=20;
  }

  drawSprites();
  //add styles here
  strokeWeight(5);
  stroke("black")
  fill("white")
  textSize(20)
  text("Food left "+food,190,70);
  text("Press 'up arrow' to feed the dog",120,30);
  text("Press 'down arrow' to refill the food",100,470);
}


function readStock(data){
  food=data.val();
}
function writeStock(x){
  database.ref('/').update({
    food:x
  })
}



