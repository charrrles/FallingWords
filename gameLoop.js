const dictionary = data.split(/\n/);
const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 500;
const INITIAL_Y = CANVAS_HEIGHT - 450;
const INITIAL_DELAY = 25;
var successes = 0;
var currentWords = [];
var delay = 25;
var textXPos;
var textYPos;
var currentWord;

function randomX(){
  return Math.random() * 300 + 100;
}

window.onload = function(){
  let context = document.getElementById('myCanvas').getContext('2d');
  context.width = CANVAS_WIDTH;
  context.height = CANVAS_HEIGHT;
};

async function drawWord(){
  let context = document.getElementById('myCanvas').getContext('2d');
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
              context.globalAlpha = 1;
              context.fillStyle = '#fff';
              context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);		
  context.font = '20px _sans';
  context.fillStyle = '#FF0000';		
  context.textBaseline = 'bottom';

  context.fillText(currentWord, textXPos, textYPos);

  await new Promise(r => setTimeout(r, delay));
}	

async function gameLoop(){
  while(textYPos < CANVAS_HEIGHT){
    textYPos += 1;
    await drawWord();
  }
  gameOver();
}

function gameOver(){
  document.getElementById('spanResult').textContent = "Game Over X(";
  let canvas = document.getElementById('myCanvas');
  canvas.classList.add("dead");		
  document.getElementById('textInput').disabled = true;
}

function start() {
  successes = 0;
  newWord();
  textXPos = randomX();
  textYPos = INITIAL_Y;
  delay = INITIAL_DELAY;
  var textInput = document.getElementById('textInput');
  textInput.disabled = false;
  textInput.focus();
  let element = document.getElementById('myCanvas');
  element.classList.remove("dead");
  element.classList.add("alive");
  gameLoop();
}

function success(){
  delay--;
  successes++;
  document.getElementById('successes').textContent = successes;
  document.getElementById('spanResult').textContent = "Success!!!";
}

function error(){
  document.getElementById('spanResult').textContent = "Error :( ";
}

function newWord(){
  textXPos = randomX();
  let rando = Math.floor(Math.random() * dictionary.length);
  currentWord = dictionary[rando];
  currentWords.push(currentWord);
  drawWord();
  textYPos = INITIAL_Y;
  textInput.value = '';
}

function testWord(evt) {
  if (evt.keyCode == 13){
    let textInput = document.getElementById("textInput");
    let texte = textInput.value;
    if (currentWords.includes(texte)){
      currentWords = currentWords.filter(item => item !== texte);
      success();
      newWord();
    }
    else{
      error();
    }
  }
}