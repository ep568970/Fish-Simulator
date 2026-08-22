/*
Description: Programming Task 2, Fish Simulation
Author: Emily Peng
Last Edit: August 18, 2026 modified to view on web
*/

let myWidth=500;
let myHeight=360;

let MouseX = 0;
let MouseY = 0;

//setup function
function setup() {
// 500*360

if (windowWidth/500 < (windowHeight-30)/360){
    myWidth=windowWidth;
    myHeight=360*windowWidth/500;
}
else {
    myWidth=500*(windowHeight-30)/360;
    myHeight=windowHeight-30;
}
    
createCanvas(myWidth, myHeight);

reset();


}


function windowResized() {


if (windowWidth/500 < (windowHeight-30)/360){
    myWidth=windowWidth;
    myHeight=360*windowWidth/500;
}
else {
    myWidth=500*(windowHeight-30)/360;
    myHeight=windowHeight-30;
}
  resizeCanvas(myWidth, myHeight);

  
}

//------------variable setup------------

//------not in setup------

//load Oswald font
let fontOswald;

//arrays: returning positionX and positionY for fish, positionX for fish food, positionY for fish food
const returnArray = [0, 0, 1, 0];
const foodShapeX=[0, 0, 0, 0, 0, 0, 0, 0];	
const foodShapeY=[0, 0, 0, 0, 0, 0, 0, 0];

//empty array list: seaweed, bubbles
const seaweed=[0];
const bubbles=[0];

//mouse click
let mouseDown=0;

//------in setup------

//fish: x-coordinate, y-coordinate, mode
let fishX=80;
let fishY=260;
let mode=1;

//food: mode, x-coordinate, y-coordinate, drop acceleration
let food=0;
let foodX=-10;
let foodY=-10;
let acceleration = 1;

//bubble trick: mode, bubble size, x-coordinate, y-coordinate
let trickMode=0;
let size=1;
let bubbleX=-10;
let bubbleY=-10;

//colours: water red, water green, water blue, darkness(%), light switch mode
let waterRed=100;
let waterGreen=100; 
let waterBlue=250;
let darkness=1;
let indoorLight=1;
let glow=0;

//fractal
let iteration=3;

//------------draw function------------

function draw() {

scale(myWidth/500);
MouseX=500*mouseX/myWidth;
MouseY=500*mouseY/myWidth;

//sets darkness
darkness=indoorLight;

//draws background
roomBackground(darkness);

//changes room brightness
lightSwitch(indoorLight);
indoorLight=returnArray[2];
mouseDown=returnArray[3];

//draws picture on wall
drawFrame(320, 90);

//draws sierpinski triangle structure on shelf
noFill();
sierpinski(180, 74, 50, iteration);

//draws tank
drawTank(darkness);

//draw seaweed
for(q=0; q<seaweed.length/2; q++)
    {
    drawSeaweed(seaweed, q+1);
    }

//draws bubbles
drawBubbles(10, 15);

//draws fish
drawFish(fishX, fishY, mode, darkness);
fishX=returnArray[0];
fishY=returnArray[1];

//draws bubbles
drawBubbles(10, 10);

//draws seaweed
drawSeaweed(seaweed, 2);
drawSeaweed(seaweed, 5);

//draws food
drawFood(food);

//drawing grid reference
//guides(20, 5);
}

//------------other functions------------

//loading Oswald font
function preload() {
//fontOswald = loadFont('Oswald-Regular.ttf')
}

//for key inputs
function keyPressed()
{
//enter key
if (keyCode === ENTER) 
{
    reset();
}

//space key
if (key == " ")
    {
    trickMode=1;
    }
if (key == "=")
    {
    iteration=iteration+1;
    }
if (key == "-" && iteration>1)
    {
    iteration=iteration-1;
    }
}

function mousePressed()
{
if(MouseX>fishX-10 && MouseX<fishX+10 && MouseY>fishY-9 && MouseY<fishY+9)
    {
    glow=1;
    }
else
    {
    glow=0;
    }
}

function mouseReleased()
{
if(glow==1)
    {
    glow=0;
    }

}

function mouseClicked()
{
//checks if mouse clicked light switch
if(MouseX>320 && MouseX<360 && MouseY>200 && MouseY<260)
    {
    //checks current darkness value
    if(darkness==1 )
    {
        darkness=0.5;
    }
    else 
    {
        darkness=1;					
    }				
    }

//returns darkness
returnArray[2]=darkness;
return returnArray;
}

//------------my functions------------

/**
 * resets all the variables in the programs
 */
function reset()
{
//fish: x-coordinate, y-coordinate, mode
fishX=80;
fishY=260;
mode=1;

//food
food=0;
foodX=-10;
foodY=-10;
acceleration = 1;

//colours: water red, water green, water blue, darkness(%), indoor light mode
waterRed=100;
waterGreen=100; 
waterBlue=250;
darkness=1;
indoorLight=1;
glow=0;

//sierpinski triangle iteration
iteration=3;

//bubble trick: trick mode, bubble size, bubble x position, bubble y position
trickMode=0;
size=1;
bubbleX=-10;
bubbleY=-10;

//seaweeds
setSeaweed(60, 300, 5, 1);
setSeaweed(70, 300, 2, 2);
setSeaweed(75, 300, 4, 3);
setSeaweed(240, 300, 2, 4);
setSeaweed(270, 300, 4, 5);
setSeaweed(280, 300, 3, 6);

//background bubbles
for(i=0; i<bubbles.length; i=i+1)
{
    bubbles[i]= 0;
}

}

/**
 * draws the bubbles in the tank
 *
 *@param {num} - size - the size of the bubbles
*@param {num} - probablility - how often the bubbles should be drawn
*
*/
function drawBubbles(size, probablility)
{
//set variables
let positionX=0;
let positionY=0;
let bubbleProbablility= floor(random(0, probablility*5));

//determines if bubble should be drawn
if(bubbleProbablility==0)
    {
    //looks for empty space in array
    for(i=0; i<bubbles.length+1; i++)
        {
        //finds empty space in array
        if(bubbles[i]==0 || bubbles[i]==null)
            {
            //sets bubble properties
            const bubble=[ceil(random(50, 290)), ceil(random(260, 300)), random(size-5, size+5), random(200, 255), random(200, 255), random(200, 255), random(0.1, 0.5)];
            
            //adds bubble in array
            bubbles[i]=bubble;

            //ends loop
            i=bubbles.length+3;
            }
        }
    }

//------draws bubble------		
for(i=0; i<bubbles.length; i++)
    {
    
    if(MouseX>bubbles[i][0]-bubbles[i][2] && MouseX<bubbles[i][0]+bubbles[i][2] && MouseY>bubbles[i][1]-bubbles[i][2] && MouseY<bubbles[i][1]+bubbles[i][2] && mouseIsPressed)
        {
        bubbles[i]=0;
        }
    
        //checks if array space is empty
        if(bubbles[i]!=0)
        {
        //draws bubbles
        fill(bubbles[i][3], bubbles[i][4], bubbles[i][5], 50);
        circle(bubbles[i][0], bubbles[i][1], bubbles[i][2]);
        
        
        //moves bubble location
        bubbles[i][1]=bubbles[i][1]-bubbles[i][6];
        
        //checks if bubble is offscreen 
        if(bubbles[i][1]<200)
        {
            bubbles[i]=0;
        } 
    }
    
    }

}

/**
 * puts information to make a seaweed in an array
 *
 *@param {num} - positionX - x position of the seaweed
*@param {num} - positionY - y position of the seaweed
*@param {num} - size - the length/size of the seaweed
*@param {int} - number - the label identifying the seaweed
*
*/
function setSeaweed(positionX, positionY, size, number)
{
//sets variables(arrays)
const seaweedX=[positionX];
const seaweedY=[positionY];

//creates seaweed vertex positions going up
for(i=1; i<size+1; i=i+1)
    {
    //for left points
    if(i/2!=ceil(i/2))
        {
        seaweedX[i]=positionX-5;					
        seaweedY[i]=positionY-20*i;
        }
    //for right points
    else
        {
        seaweedX[i]=positionX;
        seaweedY[i]=positionY-20*i;
        }
    }

//if size is even
if(size/2==ceil(size/2))
    {
    //makes vertex for going down
    for(i=size+1; i<size*2; i=i+1)
    {
        //for left points
        if(i/2!=ceil(i/2))
        {
        seaweedX[i]=positionX;					
        seaweedY[i]=positionY-20*((size*2)-i);
        }
        //for right points
    else
        {
        seaweedX[i]=positionX+5;					
        seaweedY[i]=positionY-20*((size*2)-i);
        }
    }

    }

//if size is odd
else
    {
    for(i=size+1; i<size*2; i=i+1)
    {
        //for left positions
        if(i/2!=ceil(i/2))
        {
        seaweedX[i]=positionX;					
        seaweedY[i]=positionY-20*((size*2)-i);
        }
        //for right positions
        else
        {
        seaweedX[i]=positionX+5;					
        seaweedY[i]=positionY-20*((size*2)-i);
        }
    }
    }

//puts values into array
seaweed[2*(number-1)]=seaweedX;
seaweed[2*(number-1)+1]=seaweedY;

return seaweed;
}

/**
 * changes the value of the x and y coordinates of the seaweed
 *
 *@param {array} - returnArray - an array containing the information and specifications for each seaweed
*
*/
function changeSeaweed(returnArray)
{
//goes through each seaweed
for(i=0; i<returnArray.length; i=i+2)
    {
    //goes through each seaweed vertex
    for(w=1; w<returnArray[i].length; w=w+1)
        {
        //changes seaweed position
        returnArray[i][w]=returnArray[i][w]+random(-1, 1)/10;
        
        //keeps seaweed in boundaries
        if(returnArray[i][w]<returnArray[i][0]-5)
            {
            returnArray[i][w]=returnArray[i][0]-5;
            }
        else if(returnArray[i][w]>returnArray[i][0]+5)
            {
            returnArray[i][w]=returnArray[i][0]+5;
            }
        }
    }
}

/**
 * draws a strand of seaweed
 *
 *@param {array} - returnArray - an array containing the information and specifications for each seaweed
*@param {int} - number - the label identifying which seaweed
*
*/
function drawSeaweed(returnArray, number)
{
//changes seaweed vertex positions
changeSeaweed(returnArray);

//------draws seaweed------
stroke(0);
fill(100*darkness, 200*darkness, 100*darkness);

//draws seaweed vertex
beginShape();
for(i=0; i<returnArray[number].length; i++)
    {
    vertex(returnArray[2*(number-1)][i], returnArray[2*(number-1)+1][i]);
    }
endShape(CLOSE);

}

/**
 * draws a piece of fish food
 *
 *@param {num} - foodMode - what state the food should be in
*
*/
function drawFood(foodMode)
{
//check if fish food is clicked
if(MouseX>70 && MouseX<100 && MouseY>30 && MouseY<100 && mouseIsPressed && food==0)
    {
    foodMode=1;
    mode=2;	
    }

//if fish food is not clicked
if(foodMode==0)
    {
    foodX=-10;
    foodY=-10;		
    }

//making food
else if(foodMode==1)
    {
    //sets random food shape
    for(i=0; i<foodShapeX.length; i++)
        {
        foodShapeX[i]=random(-5, 5);
        foodShapeY[i]=random(-5, 5);
        }
    
    //draws food from food shape arrays
    foodShape(foodX, foodY, foodShapeX, foodShapeY);
    }	

//picking up food
    else if(foodMode==2)
    {
        //draws food
        stroke(0);
        foodShape(foodX, foodY, foodShapeX, foodShapeY);
        noStroke();
        foodShape(foodX, foodY, foodShapeX, foodShapeY);
        
        //changes food positions
        foodX=MouseX;
        foodY=MouseY;
    }

//dropping food above tank
else if(foodMode==3)
    {
    //draws food
    stroke(0);
    foodShape(foodX, foodY, foodShapeX, foodShapeY);
    noStroke();
    foodShape(foodX, foodY, foodShapeX, foodShapeY);
    
    //checks if food is above water
    if (foodY<290)
        {
        //changes drop speed
        foodY=foodY+acceleration;
        if(foodY<180)
            {
            acceleration=acceleration*1.1;
            }
        
        //if food is below water
        else
            { 
            //slows down food
            acceleration=acceleration*0.85;
            }
        
        //if food hits bottom of tank
        if(foodY>285)
            {
            //stops food acceleration
            foodY=285;
            acceleration=0;
            }
        
        }
    
    }

//dropping food outside of tank
else if(foodMode==4)
    {
    //draws food
        stroke(0);
        foodShape(foodX, foodY, foodShapeX, foodShapeY);
        noStroke();
        foodShape(foodX, foodY, foodShapeX, foodShapeY);
    
    //changes food acceleration
    foodY=foodY+acceleration;	
    acceleration=acceleration*1.1;
    
    }

//changing food modes
if(foodMode==1)
{
    foodMode=2;
}
else if(foodMode==2 && mouseIsPressed==false)
{
    if(foodX>60 && foodX<280 && foodY<290)	
    {
    foodMode=3;
    }
    else
    {
    foodMode=4;		
    }
}
else if(foodMode==3 && foodX>fishX-10 && foodX<fishX+10 && foodY>fishY-10 && foodY<fishY+10)
{	
    foodMode=0;
    mode=1;
    acceleration=1;
}
else if(foodMode==4 &&  foodY>height)
{
    foodMode=0;
    mode=1;
    acceleration=1;
    }

//sets food mode
food=foodMode;
return food;

}

/**
 * creates a random shape for the fish food
 *
 *@param {num} - positionX - the x position of the food
*@param {num} - positionY - the y position of the food
*@param {array} - foodShapeX - the x coordinates for each of the vertexes for the food
*@param {array} - foodShapeY - the y coordinates for each of the vertexes for the food
*
*/
function foodShape(positionX, positionY, foodShapeX, foodShapeY)
{
//sets food color
fill(250*darkness, 200*darkness, 100*darkness);

//sets food verticies
beginShape();
for(i=0; i<foodShapeX.length+1; i++)
    {
    vertex(foodShapeX[i]+positionX, foodShapeY[i]+positionY);
    }
endShape(CLOSE);

}

/**
 * draws the fish in the tank
 *
 *@param {num} - positionX - the x position of the fish
*@param {num} - positionY - the y position of the fish
*@param {num} - slopeX - the x angle the fish is at
*@param {num} - slopeY - the y angle the fish is at
*
*@return {num} array containing the x and y position of the fish
*
*/
function drawFish(positionX, positionY, fishMode)
{
let originalDarkness=darkness;

if (darkness!=1)
    {
    if(glow==1)
    {
        darkness=1;
    }
    else
    {
        darkness=0.5;
    }
    }



//for fish following mouse
if (fishMode==1)
    {
    //set slope of fish to mouse location
    slopeY = (MouseY-positionY)/100;
    slopeX = (MouseX-positionX)/100;
    
    //sets slope value boundaries
    if(slopeX>2.4)
        {
        slopeX=2.4;
        }
    else if(slopeX<-2.4)
        {
        slopeX=-2.4
        }
    
    if(slopeY>2)
        {
        slopeY=2;
        }
    else if (slopeY<-2)
        {
        slopeY=-2;
        }
    
    }
//for fish following food
if (fishMode==2)
    {
    slopeX=(foodX-positionX)/50;
    slopeY = (foodY-positionY)/50;
    }

//sets slope
positionY=positionY+slopeY;
positionX=positionX+slopeX;

//keeps fish inside tank
if(positionX<60)
{
    positionX=60;
}
else if(positionX>280)
{
    positionX=280;
}	

if(positionY<180)
{
    positionY=180;
}
else if(positionY>290)
{
    positionY=290;
}

//------draws fish------

//draws fish tail
stroke(0);
fishTail(positionX, positionY, slopeX, slopeY, darkness);

//draws fish body
fill(250*darkness, 200*darkness, 100*darkness);
ellipse(positionX, positionY, 25, 20);
    
//draws fish eyes
fishEyes(positionX, positionY, slopeX, slopeY);
    
//checks for drawing bubble
    if(trickMode==1)
    {
    //sets bubble location
    bubbleY=positionY+slopeY*4;
    bubbleX=positionX+slopeX*4+size*slopeX/4.5;

    //change bubble size
    size=size+0.1;
    
    //draws bubble
    fill(waterRed+30, waterGreen+30, waterBlue+30, 100);
    circle(bubbleX, bubbleY, size);
    
    //pops bubble
    if(bubbleX-size/2<40 || bubbleX+size/2>300 || bubbleY-size/2<190 || bubbleY+size/2>290)
        {
        trickMode=0;
        size=1;
        }
    }

darkness=originalDarkness;

//return fish position
returnArray[0] = positionX;
returnArray[1] = positionY;
return returnArray;

}

/**
 * draws the eyes of the fish
 *
 *@param {num} - positionX - the x position of the eyes
*@param {num} - positionY - the y position of the eyes
*@param {num} - slopeX - the x angle the eyes are at
*@param {num} - slopeY - the y angle the eyes are at
*
*/
function fishEyes(positionX, positionY, slopeX, slopeY)
{
//determines if fish blinks or not (I know most fish don't blink this is for aesthetic purposes only)
let probability=ceil(random(1, 50));

//sets variables: lett eye x-coordinate, eyes y coordinate, right eye x coordinate
let leftEyeX=-10;
let eyeY=positionY+slopeY*4;
let rightEyeX=-10;

//if target is on left side
if (slopeX<0) 
{			
    //sets eye position
    if((positionX+slopeX*5-5) > positionX-15)
    {
    leftEyeX=positionX+slopeX*4-5;
    }
    if((positionX+slopeX*5+5)<positionX-8)
    {
    rightEyeX=positionX-8;
    }
    else
    {
    rightEyeX=positionX+slopeX*5+5;
    }		
}

//if target is on right side
else 
{
    //changes eye position
    if((positionX+slopeX*5+5) < positionX+15)
    {
    rightEyeX=positionX+slopeX*4+5;
    }
    if((positionX+slopeX*5-5)>positionX+8)
    {
    leftEyeX=positionX+8;
    }
    else
    {
    leftEyeX=positionX+slopeX*5-5;
    }			
}

//if target is on top of fish
if (slopeY<0)
{
    if(positionY+slopeY*4<positionY-8)
    {
    eyeY=positionY-8;
    }
}
//if target is below fish
else 
{
    if(positionY+slopeY*4>positionY+8)
    {
    eyeY=positionY+8;
    }
}

//------draws eyes------
fill(0);
if (probability/9==ceil(probability/50))
    {
    ellipse(leftEyeX, eyeY, 3, 0.1);
    ellipse(rightEyeX, eyeY, 3, 0.1);
    }
else
    {
    circle(leftEyeX, eyeY, 3);
    circle(rightEyeX, eyeY, 3);
    }
}

/**
 * draws the tail of the fish
 *
 *@param {num} - positionX - the x position of the fish
*@param {num} - positionY - the y position of the fish
*@param {num} - slopeX - the x angle the fish is at
*@param {num} - slopeY - the y angle the fish is at
*
*/
function fishTail(positionX, positionY, slopeX, slopeY)
{
//variables: center x position, center y position, tail edge x position, upper y position, lower y position
let centerX=positionX;
let centerY=positionY;
let tailX=positionX;
let tailTopY=positionX-13;
let tailBottomY=positionY+13;

//keeps slope within boundaries
if(slopeY<-2)
{
    slopeY=-2;
}
else if(slopeY>2)
{
    slopeY=2;
}

//modifying tail x position
centerX=positionX-slopeX*4;
tailX=positionX-slopeX*10;

//keeps x position within boundaries
if(centerX<positionX-12)
    {
    centerX=positionX-12;
    }
else if(centerX>positionX+12)
    {
    centerX=positionX+12;
    }
if(tailX<positionX-25)
    {
    tailX=positionX-25;
    }
else if(tailX>positionX+25)
    {
    tailX=positionX+25;
    }

//modifying tail positionY
centerY=positionY-slopeY*3;
tailTopY=centerY-slopeY*2-10;
tailBottomY=centerY-slopeY*2+10;

//keeps y position within boundaries
if(centerY<positionY-5)
{
    centerY=positionY-5;
}
else if(centerY>positionY+5)
{
    centerY=positionY+5;
}

//------draws tail------
fill(250*darkness, 200*darkness, 100*darkness);
triangle(centerX, centerY, tailX, tailTopY, tailX, tailBottomY);
}

/**
 * draws a framed picture of a dog in a bee costume
 *
 *@param {num} - positionX - the x position of the picture
*@param {num} - positionY - the y position of the picture
*
*/
function drawFrame(positionX, positionY)
{
//picture hanger
line(positionX, positionY-55, positionX-30, positionY-30);
line(positionX, positionY-55, positionX+30, positionY-30);

//picture frame
fill(200*darkness, 150*darkness, 100*darkness);
rect(positionX-35, positionY-40, 70, 90);

//picture background
rect(positionX-30, positionY-35, 60, 80);
noStroke();

let i=positionY-35;
while(i<positionY+45)
    {
    fill((120-i*25/(positionY-35))*darkness, (150-i*50/(positionY-35))*darkness, 180*darkness);
    rect(positionX-30, i, 60, 5);
    i=i+5;
    }

fill(200*darkness, 250*darkness, 255*darkness, 100);
ellipse(positionX, positionY+7, 50, 65)

//picture subject
stroke(0);
drawDog(positionX, positionY, 1);
}

/**
 * draws a dog in a bee costume
 *
 *@param {num} - positionX - the x position of the dog
*@param {num} - positionY - the y position of the dog
*@param {num} - size - the size of the dog
*
*/
function drawDog(positionX, positionY, size)
{
size=size/3;

drawDogBody(positionX, positionY, size);

drawDogHead(positionX, positionY, size);

}

/**
 * draws the head of a dog in a bee costume
 *
 *@param {num} - positionX - the x position of the head
*@param {num} - positionY - the y position of the head
*@param {num} - size - the size of the body
*
*/
function drawDogHead(positionX, positionY, size)
{

fill(0);
//antenna
line(positionX+20*size, positionY-30*size, positionX+40*size, positionY-60*size);
line(positionX-20*size, positionY-30*size, positionX-40*size, positionY-60*size);
circle(positionX-40*size, positionY-60*size, 10*size);
circle(positionX+40*size, positionY-60*size, 10*size);

//_____head_____
fill(250*darkness, 170*darkness, 50*darkness);
circle(positionX, positionY, 80*size);

//_____face_____

//eyes
fill(0);
circle(positionX-15*size, positionY-5*size, 10*size);
circle(positionX+15*size, positionY-5*size, 10*size);

//nose/mouth
fill(255*darkness, 100*darkness, 250*darkness);
triangle(positionX, positionY+15*size, positionX-5*size, positionY+10*size, positionX+5*size, positionY+10*size);
noFill()
arc(positionX+10*size, positionY+15*size, 20*size, 20*size, PI*2, PI);
arc(positionX-10*size, positionY+15*size, 20*size, 20*size, PI*2, PI);

//ears
fill(50*darkness, 10*darkness, 0);
quad(positionX+30*size, positionY-27*size, positionX+30*size, positionY+27*size, positionX+60*size, positionY+60*size, positionX+60*size, positionY);
quad(positionX-30*size, positionY-27*size, positionX-30*size, positionY+27*size, positionX-60*size, positionY+60*size, positionX-60*size, positionY);
}

/**
 * draws the body of a dog in a bee costume
 *
 *@param {num} - positionX - the x position of the body
*@param {num} - positionY - the y position of the body
*@param {num} - size - the size of the body
*
*/
function drawDogBody(positionX, positionY, size)
{
//wings
fill(100*darkness, 200*darkness, 255*darkness, 150);
quad(positionX+20*size, positionY+50*size, positionX+50*size, positionY+70*size, positionX+60*size, positionY+110*size, positionX+10*size, positionY+90*size);
quad(positionX-20*size, positionY+50*size, positionX-50*size, positionY+70*size, positionX-60*size, positionY+110*size, positionX-10*size, positionY+90*size);



    //body
let i=50;
while(i<120)
    {
    let u=15+i*6/50;
    if(i/20==ceil(i/20))
        {
        fill(0)
        }
    else
        {
        fill(255*darkness, 255*darkness, 0);
        }
    quad(positionX+u*size, positionY+i*size,positionX-u*size, positionY+i*size, positionX-(u+2.5)*size, positionY+(i+10)*size, positionX+(u+2.5)*size, positionY+(i+10)*size);
    i=i+10
    }

//legs
fill(250*darkness, 170*darkness, 50*darkness);
rect(positionX-15*size, positionY+80*size, 15*size, 40*size);
rect(positionX, positionY+80*size, 15*size, 40*size);


//collar
fill(0);
rect(positionX-20*size, positionY+20*size, 40*size, 30*size);
fill(230*darkness, 200*darkness, 0);
square(positionX-10*size, positionY+30*size, 20*size);



}


/**
 *draws a sierpinski triangle
*
*@param {num} - x - x coordinate of the shape's location
*@param {num} - y - y coordinate of the shape's location
*@param {num} - size - the size of the shape
*@param {num} - iteration - the number of iterations the sierpinski triangle should have
*
*/
function sierpinski(x, y, size, iteration)
{
//sets size relative to 10 pixels
size=size*2;

//sets y relative to top of triangle
y=y-0.25*size

//draws triangle
triangle(x, y, x-0.25*size, y+0.5*size, x+0.25*size, y+0.5*size);
stroke(50*darkness, 0, 200*darkness);

if(size<=1)
    {
    //prevents function from running for too long
    iteration=1;
    }
if(iteration>1)
    {
    //creates smaller triangles
    sierpinski(x, y+size*0.25/2, size/4, iteration-1);
    stroke(100*darkness, 0, 100*darkness);
    sierpinski(x-0.25*size/2, y+0.5*size-0.25*size/2, size/4, iteration-1);
    stroke(200*darkness, 0, 100*darkness);
    sierpinski(x+0.25*size/2, y+0.5*size-0.25*size/2, size/4, iteration-1);
    }

}


/**
 * draws a fish tank 
 */
function drawTank()
{
//variables: length, height, x-coordinate, y-coordinate
let tankLength = 260;
let tankHeight = 160;
let positionX = 40;
let positionY = 160

//generate random number for rgb
let randomRed = random(-10, 10)/5;
let randomGreen = random(-10, 10)/5;
let randomBlue = random(-10, 10)/5;

//change color by random amount
waterRed=waterRed+randomRed;
waterGreen=waterGreen+randomGreen;
waterBlue=waterBlue+randomBlue;

//sets water color boundaries
if(waterRed<120 && waterGreen<160 && waterGreen<255)
{
    if(waterRed<90)
    {
    waterRed=95;
    }
    if(waterGreen<100)
    {
    waterGreen=105;
    }
    if(waterBlue<200)
    {
    waterBlue=205;
    }
}
else if(waterRed>120)
{
    waterRed=115;
}
else if(waterGreen>160)
{
    waterGreen=155;
}
else if(waterBlue>255)
{
    waterBlue=250;
}

//------draws background------
stroke(0);

//tank
fill(200*darkness, 200*darkness, 250*darkness);
rect(positionX, positionY, tankLength, tankHeight);

//water
fill(waterRed*(darkness*0.9), waterGreen*(darkness*0.9), waterBlue*(darkness*0.9));
rect(positionX, positionY+20, tankLength, tankHeight-20);

//sand
fill(250*darkness, 200*darkness, 100*darkness);
rect(positionX, positionY+tankHeight, tankLength, -30);
}

/**
 * draws a light switch 
 */
function lightSwitch()
{
//draws light switch
stroke(0);
fill(255*darkness);
rect(320, 200, 40, 60);
rect(330, 210, 20, 40);


}

/**
 * draws the room's background
 */
function roomBackground()
{
//background(wall)
background(230*darkness, 250*darkness, 230*darkness);
stroke(0);

drawWall(0, 0, width, height, 2.5);

//shelf
stroke(0);
fill(200*darkness, 150*darkness, 100*darkness);
rect(-20, 100, 260, 20)

//table
    rect(-20, 320, 360, 60)

//door
rect(400, 40, 220, 400);

//fish food
fill(255*darkness, 100*darkness, 100*darkness);
rect(60, 30, 50, 70);

//light switch
fill(255*darkness, 255*darkness, 255*darkness);
rect(60, 30, 50, 10);
rect(60, 60, 50, 20);

//fish food lable
noStroke();
fill(0);
textSize(9);
text("Fish Food", 65, 75);
    
}

/**
 * draws the wallpaper of the room
 *
 *@param {num} - startX - where the wallpaper should start from left to right
*@param {num} - startY - where the wallpaper should start from top to bottom
*@param {num} - stopX - where the wallpaper should stop from left to right
*@param {num} - stopY - where the wallpaper should stop from top to bottom
*@param {num} - size - the size of the wallpaper design
*
*/
function drawWall(startX, startY, stopX, stopY, size)
{
fill(205*darkness, 240*darkness, 210*darkness, 150);
noStroke();
size=size/2;
for(i=startY; i<=stopY; i=i+40*size)
    {
    for(o=startX; o<=stopX; o=o+20*size)
    {
        quad(o-10*size, i, o, i-20*size, o+10*size, i, o, i+20*size);
    }
    }
}

/**
 * draws a grid as guide/reference
 *
 *@param {num} - gridSize - the density of the grid
*@param {num} - interval - how often a line in the grid should be bolded
*
*/
function guides(gridSize, interval)
{
//vertical lines
for(q=0; q<width; q=q+gridSize)
    {
    //drawing lines
    stroke(0);
    
    //makes a thicker line every 5 lines
    if(floor(q/(interval*gridSize))==q/(interval*gridSize))
    {
        strokeWeight(3)
    }
    else
    {
        strokeWeight(1)
    }
    
    //draws line
    line(q, 0, q, height);
    }

//horzontal lines
for(q=0; q<height; q=q+gridSize)
    {
    //makes line thicker every 5 lines
    if(floor(q/(interval*gridSize))==q/(interval*gridSize))
    {
        strokeWeight(3)
    }
    else
    {
        strokeWeight(1)
    }

    //draws line
    line(0, q, width, q);
    }

}