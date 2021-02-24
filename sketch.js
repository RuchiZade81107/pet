var dog,sadDog,happyDog;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database=firebase.database()
  foodobj=new Food()
  foodstock=database.ref('Food')
  foodstock.on("value",readstock)
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed the dog"); 
  feed.position(700,95);
  feed.mousePressed(feeddog); 
  addFood=createButton("Add Food"); 
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodobj.display()
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){ lastFed=data.val(); });
  drawSprites();
}

//function to read food Stock
function readstock(data){
  foodS=data.val()
  foodobj.updateFoodStock(foodS)
}

//function to update food stock and last fed time
function feeddog(){
  dog.addImage(happyDog)
  if(foodobj.getFoodStock()<= 0){
     foodobj.updateFoodStock(foodobj.getFoodStock()*0);
    }else{ foodobj.updateFoodStock(foodobj.getFoodStock()-1); }
    database.ref('/').update({
      Food:foodobj.getFoodStock(),
      feedTime:hour()
    })
}

//function to add food in stock
function addFoods(){ foodS++; database.ref('/').update({ Food:foodS }) }