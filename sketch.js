// setup for serial communication
let serial;
let latestData = "waiting for data";



// setup for rotating wrench

let angle = 0;
let speed = 0.5
//
// let button_x = 40;
// let button_y = 70;
let growth = 0.2;
//
let boxColor01 = 152;
let colorChange = 1;
let bgColor = 0;
let boxColor02 = 254;

let circle01 = {
action:rotatecircle,
posx: 100,
posy:-200,
translatex:300-100, translatey:185+200,
dim:296,
color:152,
angle:0,
speed:1
}

let backrect = {
action: rotaterect,
posx:0,
posy:0,
translatex:300,
translatey:208,
width:300,
height: 313,
color:0 }

let rectbottom = {
action: rotaterect,
posx:0,
posy:0,
orginx:300,
translatex:300,
translatey:362,
width:140,
height:400,
topleft:5 ,
topright:5,
bottomright:3,
bottomleft:3,
color:152}

let recttop = {
action: rotaterect,
posx:100,
posy:-100,
translatex:300-100,
translatey:104+100,
width:140,
height:110,
topleft:15 ,
topright:15,
bottomright:3,
bottomleft:3,
color:152,}

let rect01 = {
  action: rotatedrect,
  posx:0,
  posy:0,
  translatex:398,
  translatey:70,
  width:60,
  height:70,
  topleft:5 ,
  topright:5,
  bottomright:5,
  bottomleft:5,
  color:0,
  rotate:175}

let rect02 = {
  action: rotatedrect,
  posx:0,
  posy:0,
  translatex:202,
  translatey:70,
  width:60,
  height:70,
  topleft:5 ,
  topright:5,
  bottomright:5,
  bottomleft:5,
  color:1,
  rotate:-175}

let rect03 = {
  action: rotaterect,
  posx:-100,
  posy:100,
  translatex:300+100,
  translatey:114-100,
  width:58,
  height:90,
  topleft:20 ,
  topright:20,
  bottomright:0,
  bottomleft:0,
  color:50}

let rect04 = {
  action: rotaterect,
  posx:-50,
  posy:-50,
  translatex:300+50,
  translatey:119+50,
  width:40,
  height:78,
  topleft:10 ,
  topright:10,
  bottomright:0,
  bottomleft:0,
  color:100}

let rect05 = {
action:scalerect,
posx:300,
posy:116,
width:40,
height:70,
button_x:40,
button_y:70,
topleft:10 ,
topright:10,
bottomright:10,
bottomleft:10,
color:200}

let rect06 = {
  action: rotaterect,
  coloraction: colorchange,
  posx:0,
  posy:0,
  translatex:300,
  translatey:140,
  width:30, height:8,
  topleft:4 ,
  topright:4,
  bottomright:4,
  bottomleft:4,
  color:255}

let rect07 = {
action:draw,
coloraction: colorchange,
posx:347,
posy:132,
width:36,
height:34,
topleft:0 ,
topright:7,
bottomright:7,
bottomleft:0,
color:50}

let rect08 = {
action:draw,
coloraction: colorchange,
posx:333,
posy:132,
width:6,
height:33,
topleft:3 ,
topright:3,
bottomright:3,
bottomleft:3,
color:200}

let rect09 = {
action:draw,
coloraction: colorchange,
posx:355,
posy:132,
width:6,
height:33,
topleft:3 ,
topright:3,
bottomright:3,
bottomleft:3,
color:200}

let rect10 = {
action:scalerect,
action:draw,
coloraction: colorchange,
button_x:50,
button_y:2,
posx:255,
posy:104,
width:50,
height:2,
color:0}

let rect11 = {
  action:scalerect,
  action:draw,
  coloraction: colorchange,
  button_x:50,
  button_y:2,
  posx:345,
  posy:104,
  width:50,
  height:2,
  color:0}

let shapeArray = [circle01,backrect,rectbottom,recttop,rect01,rect02,rect03,rect04,rect05,rect06,rect07,rect08,rect09,rect10,rect11]
let rotationSpeed = 0.25;




function setup() {
  createCanvas(600, 600);
  // background has to be in setup in order to get the line drawing to work
  background(0,255,255);
  fill("red")
  rect(50, 50, 50, 50)
  // setup for rotating wrench
  rectMode(CENTER);
  angleMode(DEGREES);
  ellipseMode(CENTER);
  noStroke();

//   console.log(shapeArray)
//
  // setup for serial communication
  serial = new p5.SerialPort();

  serial.list();
  serial.open('COM4');

  serial.on('connected', serverConnected);

  serial.on('list', gotList);

  serial.on('data', gotData);

  serial.on('error', gotError);

  serial.on('open', gotOpen);

  serial.on('close', gotClose);

}

function serverConnected() {
  print("Connected to Server");
}

function gotList(thelist) {
  print("List of Serial Ports:");

  for (let i = 0; i < thelist.length; i++) {
    print(i + " " + thelist[i]);
  }
}

function gotOpen() {
  print("Serial Port is Open");
}

function gotClose(){
  print("Serial Port is Closed");
  latestData = "Serial Port is Closed";
}

function gotError(theerror) {
  print(theerror);
}

function gotData() {
  let currentString = serial.readLine();
  trim(currentString);
  if (!currentString) return;
  // console.log(currentString);
  latestData = currentString;
}

let remappedValue;
let xPos = 0;
let yPos;

function draw() {
  // background has to be in setup in order to get the line drawing to work
  // background(0, 255, 255);


  fill(255, 255, 255);
  // // writing data value at the upper left corner - note, because background is moved to setup, it will draw numbers on top of one another.
  text(latestData, 10, 10);



  // Part 1: Draw circle in relation to incoming data
  // background(0, 255, 255);
  // ellipse(width/2, height/2, int(latestData));



  // // PART 2: Draw line graph of incoming data
  // graphData(int(latestData));
  //
  // // typeof is a function that tells you the data type
  // console.log(typeof yPos);

  // rect(50, 50, int(latestData));

  // PART 3: Adjust rotation of wrench in relation to incoming data
  background(0);
  speed = map(int(latestData), -1010, 1000, -4, 4);
  for (let i = 0; i < shapeArray.length; i++) {
    drawshape(shapeArray[i]);
  }
}




function graphData(newData) {
  // map the range of the input to the window height:
  yPos = map(newData, 0, 1023, 0, height);
  // draw the line in a pretty color:
  // stroke(0xA8, 0xD9, 0xA7);
  stroke(255, 255, 0);
  strokeWeight(2);
  line(xPos, height, xPos, height - yPos);
  // at the edge of the screen, go back to the beginning:
  if (xPos >= width) {
    xPos = 0;
    // clear the screen by resetting the background:
    background(0x08, 0x16, 0x40);
  } else {
    // increment the horizontal position for the next reading:
    xPos++;
    console.log(xPos);
  }
}


function drawshape(geometry){
  if(geometry.action === rotatecircle){rotatecircle(geometry)}
  if(geometry.action === rotaterect){rotaterect(geometry)}
  if(geometry.coloraction === colorchange){colorchange(geometry)}
  if(geometry.action === scalerect){scalerect(geometry)}
  if(geometry.action === rotatedrect){rotatedrect(geometry)}
  if(geometry.action === draw){drawrect(geometry)}


}




function rotatecircle(geometry){
fill(geometry.color);
push();
translate(geometry.translatex, geometry.translatey);
rotate(geometry.angle);
ellipse(geometry.posx, geometry.posy, geometry.dim)
pop();

angle=angle+speed;
if (angle === 1080) {
speed = 0;
angle = 0;



// geometry.angle = geometry.angle + geometry.speed
// if (geometry.angle === 360) {
// geometry.speed = 0;
// geometry.angle = 0;
}
}

function rotaterect(geometry){
fill(geometry.color);
push();
translate(geometry.translatex, geometry.translatey);
rotate(angle);
rect(geometry.posx, geometry.posy, geometry.width,geometry.height,geometry.topleft,geometry.topright,geometry.bottomright,geometry.bottomleft);
pop();
angle=angle+speed;
if (angle === 1080) {
speed = 0;
angle = 0;
}
}

function rotatedrect(geometry){
fill(geometry.color);
push();
translate(geometry.translatex, geometry.translatey);
rotate(angle+geometry.rotate);
rect(geometry.posx, geometry.posy, geometry.width,geometry.height,geometry.topleft,geometry.topright,geometry.bottomright,geometry.bottomleft);
pop();
angle=angle+speed;
if (angle === 720) {
speed = 0;
angle = 0;
}
}

function colorchange(geometry){

if (geometry.color > 255 || geometry.color < bgColor) {
colorChange = -colorChange;
}
geometry.color = geometry.color +colorChange



}

function drawrect(geometry){
  fill(geometry.color)
  rect(geometry.posx, geometry.posy, geometry.width,geometry.height,geometry.topleft,geometry.topright,geometry.bottomright,geometry.bottomleft);
}

function mouseClicked() {
ellipse(mouseX, mouseY, 5, 5);
circle01.speed = 1;
speed= 1;
grow=1;

// prevent default
return false;
}


function scalerect(geometry) {
  fill(color(200));
  if (geometry.button_x > 110 || geometry.button_x < 40) {
      growth = growth*-1;
    }
    geometry.button_x = geometry.button_x + growth;

  if (geometry.button_y > 100 || geometry.button_y < 70) {
      growth = growth*-1;
    }
    geometry.button_y = geometry.button_y + growth;
  rect(geometry.posx, geometry.posy, geometry.button_x, geometry.button_y,geometry.topleft,geometry.topright,geometry.bottomright,geometry.bottomleft);

  // if(geometry.button_x===geometry.width){geometry.button_x=geometry.width}
  // if(geometry.button_y===geometry.height){geometry.button_x=geometry.width}
}

function mousePressed() {
  if (angle=0) {
    song.stop();
  } else {
    song.play();
    background(255);
  }
}










































// functions for drawing and rotating wrench
function rotateObjects(incomingGeometry) {
  if (incomingGeometry.shape === "circle") {
    displayCircle(incomingGeometry);
  } else {
    displayRect(incomingGeometry);
  }
}

function displayCircle(circleGeo) {
  noStroke();
  fill(circleGeo.color);
  push();
  translate(circleGeo.transX, circleGeo.transY);
  rotate(circleGeo.rotateSpeed);
  ellipse(circleGeo.x, circleGeo.y, circleGeo.diameter, circleGeo.diameter);
  circleGeo.rotateSpeed = int(circleGeo.rotateSpeed + rotationSpeed);
  pop();
}

function displayRect(rectGeo) {
  fill(rectGeo.color);
  noStroke();
  push()
  translate(rectGeo.transX, rectGeo.transY);
  rotate(rectGeo.transAngle);
  rotate(rectGeo.rotateSpeed);
  rect(rectGeo.x, rectGeo.y, rectGeo.width, rectGeo.height, rectGeo.radius);
  rectGeo.rotateSpeed = int(rectGeo.rotateSpeed + rotationSpeed);
  pop()
}
