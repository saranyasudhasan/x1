var hypnoticBall, database;
var position;
//imp points 1)on-readPosition,2)set-write,3)ref-location,

function setup(){
  database = firebase.database();//creatng dbfrom firebase(1st)
  console.log(database);
  createCanvas(500,500);

  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.shapeColor = "red";


  var hypnoticBallPosition = database.ref('ball/position');//loctation of child inside db(2nd)
  hypnoticBallPosition.on("value", readPosition, showError);// to read data continously  from db
}//  readPosition, showError- user definedfunction(3rd)

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}



//6th change the name to writeposition
function writePosition(x,y){// set is keyword usedtowrite the db . in line 39 - ball.position.x+x(check o/p)
  database.ref('ball/position').set({
    'x': position.x + x ,
    'y': position.y + y   
  })
}

//4th
function readPosition(data){
  position = data.val();// data - values(loc of child)
  console.log(position.x);
  hypnoticBall.x = position.x;//from 46 line position is updating
  hypnoticBall.y = position.y;
}
//5th //check the output after5th
function showError(){
  console.log("Error in writing to the database");
}
