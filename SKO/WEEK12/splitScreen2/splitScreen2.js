// typing function initally achieved with help from Ray
// shuffle function added by k.donnachie
// flashing connecting lines adapted from https://editor.p5js.org/chjno/sketches/S1wJDPdY-
// typing sound effect made my me
// royalty free light buzzing sound effect from https://www.fesliyanstudios.com
var x, y;
var font;
var type;
var buzz;
var margin = 50; //space on either side
var topmargin = 40;
var para1 = ('Although these structures occupy the same space, they organise it differently and thereby create mutating patterns of signification. Translated into a digital medium, Vs line sequences reorganise yet again, using the flexibility offered by appearing and disappearing text to create a possibility space even greater than the print book. When read alongside each other, the print and electronic texts offer a remarkably rich matrix in which to explore the varying dynamics of freedom and constraint produced performed by durable marks and flickering signifiers.');
var para = ('although these structures occupy the same space , they organise it differently and thereby create mutating patterns of signification . translated into a digital medium Vs line sequences reorganise yet again using the flexibility offered by appearing and disappearing text to create a possibility space even greater than the print book . when read alongside each other the print and electronic texts offer a remarkably rich matrix in which to explore the varying dynamics of freedom and constraint produced performed by durable marks and flickering signifiers .');
var words = para.split(' ');
var words1 = para1.split(' ');
var wx, wy, wx2;
var typesize = 32;
var spacesize = 20;
var linesize = 40;
var i = 0;
var displayMessage = true;

function preload() {
  font = loadFont('data/VG5000-Regular.otf');
  soundFormats('mp3');
  type = loadSound('data/keyboard.mp3');
  buzz = loadSound('data/buzz.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(245);
  shuffwords = shuffle(words);
  textSize(typesize);
  textFont(font);
  x = random(width);
  y = random(height);
  type.setVolume(0.5);
  analyzer = new p5.Amplitude();
  analyzer.setInput(type);
  //process(type);
  analyzer = new p5.Amplitude();
  analyzer.setInput(buzz);
  buzz.setVolume(1.0);
  buzz.loop();
}

function draw() {
  fill(0,0,255);
  noStroke();
  rect(0,0, windowWidth/2, windowHeight);
  fill(245);
  noStroke();
  rect(windowWidth/2, 0, windowWidth/2, windowHeight);
  textSize(24);
  if (displayMessage){
    fill(245);
    text('Click screen', windowWidth/2-132, 40);
    fill(0,0,255);
    text('for sound.', windowWidth/2+2, 40);
  }

  textSize(typesize);

  // left paragraph
  fill(245);
  wx = margin; // space on either side
  wy = 50; //top margin
  var extraSpace = 0;
  for (let w=0; w<words1.length; w++) {
    if (wx+textWidth(words1[w])<=windowWidth/2-margin){
    noStroke();
  if (frameCount > 30 * w) {
    text(words1[w], wx, wy+50);
}
  wx+=textWidth(words1[w])+spacesize;
}
else {
  wx=margin;
  wy+=linesize;
  w--;
  }
}

// right paragraph
  i = i + 1;
  if (i % 2 === 0){
    fill(0,0,255);
  } else {
    fill(245);
  }  
  wx2 = windowWidth/2 + margin;
  wy = 50;
  for (let w=0; w<words.length; w++) {
    if (wx2+textWidth(shuffwords[w])<=width-margin){
    noStroke();
  if (frameCount > 30 * w) {
    text(shuffwords[w], wx2, wy+50);
}
  wx2+=textWidth(shuffwords[w])+spacesize;
}
else {
  wx2=windowWidth/2 + margin;
  wy+=linesize;
  w--;
  }
  }
  
//connecting random lines
    if(frameCount % 30 == 0){
  var x2 = random(width);
  var y2 = random(height);
  strokeWeight(4);
  stroke(135,155,255);
  line(x,y,x2,y2);
  x = x2;
  y = y2;
  }
  }

function mousePressed() {
  type.play();
  buzz.play(); 
  displayMessage = false;
}
