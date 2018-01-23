const audioRed = document.querySelector('.red');
const audioBlue = document.querySelector('.blue');
const audioYellow = document.querySelector('.yellow');
const audioGreen = document.querySelector('.green');

const redBlock = document.querySelector('#red');
const blueBlock = document.querySelector('#blue');
const greenBlock = document.querySelector('#green');
const yellowBlock = document.querySelector('#yellow');

const display = document.querySelector('#display');
const start = document.querySelector('#start');
const strict = document.querySelector('#strict');

const checkBox = document.querySelector(`.switch input[type="checkbox"]`);


function handleCheck() {
  if(checkBox.checked) {
    startGame();
  } else {
    stopGame();
  }
}


function playAudio(audio) {
  audio.currentTime = 0;
  audio.play();
}


function startGame() {
  display.innerHTML = `<span>- -</span>`;
}

function stopGame() {
  display.innerHTML = "";
}


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function gameOn() {
  if (checkBox.checked) {
    setTimeout(() => {
      display.classList.add('blink');
    }, 1000);
    display.classList.remove('blink');
    /*
      0-> red
      1->blue
      2->yellow
      3-> green
    */
    for (let i = 1;i < 2; i++) {
      let randomArray = [];
      for (let j = 0; j <= i; j++) {
        randomArray.push(getRandomInt(5));
      }
      console.log(randomArray);
      randomArray.forEach(x => {
        if (x == "0") {
          gameBlocks(redBlock, audioRed, i);
        } else if (x == '1') {
          gameBlocks(blueBlock, audioBlue, i);
        } else if ( x == '2') {
          gameBlocks(yellowBlock, audioYellow, i);
        } else {
          gameBlocks(greenBlock, audioGreen, i);
        }
      });

    }
  }
}


function gameBlocks (colorBlock, audioColor, i) {

  setTimeout(() => {
    colorBlock.classList.add('class-blink');
    playAudio(audioColor);
  }, 2000);
  colorBlock.classList.remove('class-blink');
  if (i < 10) {
    display.innerHTML = `0${i}`;
  } else {
    display.innerHTML = `${i}`;
  }
  // console.log(colorBlock);



}


checkBox.addEventListener('click', handleCheck);
start.addEventListener('click', gameOn);
