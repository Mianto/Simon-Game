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
const strictLight = document.querySelector('#strict-light');
const checkBox = document.querySelector(`.switch input[type="checkbox"]`);




let isRedElementClicked = false;
let isBlueElementClicked = false;
let isYellowElementClicked = false;
let isGreenElementClicked = false;
let strictClicked = false;




function handleCheck() {
  if(checkBox.checked) {
    setTimeout(() => {
      display.classList.add('blink');
    }, 1000);
    display.classList.remove('blink');
    startGame();
  } else {
    display.innerHTML = "";
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function playAudio(audio) {
  audio.currentTime = 0;
  audio.play();
}


function startGame() {
  display.innerHTML = `<span>- -</span>`;
}


function stopGame() {
  const highestTimeoutId = setTimeout(";");
  for (let i = 0 ; i < highestTimeoutId ; i++) {
    clearTimeout(i);
  }
  display.innerHTML = "!!";
}


// generates Random Number between 0 and max
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


async function gameOn() {
  /*
    0-> red
    1->blue
    2->yellow
    3-> green
  */
  if ( !checkBox.checked ) {
    return;
  }
  let timePeriod = 1000;
  if ( !strictClicked ) {
    timePeriod = 500;
  }
  let j = 1
  for (let i = 0;i < 5; i++) {


    let randomArray = [];
    for (let k = 0; k <= i; k++) {
      randomArray.push(getRandomInt(4));
    }
    console.log(randomArray);


    for (let x = 0; x < randomArray.length; x++) {

      let t = j * timePeriod;
      j++;
      if (randomArray[x] == "0") {
        setTimeout (() => {
          makeRedActive(i + 1);
          redBlock.addEventListener('click', checkRedPressed);
          waitRedChecking();
        }, t);

      } else if (randomArray[x] == '1') {
        setTimeout(() => {
            makeBlueActive(i + 1);
            blueBlock.addEventListener('click', checkBluePressed);
            waitBlueChecking();
          }, t);


      } else if ( randomArray[x] == '2') {
          setTimeout(() => {
            makeYellowActive(i + 1);
            yellowBlock.addEventListener('click', checkYellowPressed);
            waitYellowChecking();
          }, t);

      } else if ( randomArray[x] == '3') {

          setTimeout(() => {
            makeGreenActive(i + 1);
            greenBlock.addEventListener('click', checkGreenPressed);
            waitGreenChecking();
          }, t);

      }
    }
    await sleep(5000);
  }
}

function makeRedActive(i) {
    if (i < 10) {
      display.innerHTML = `0${i}`;
    } else {
      display.innerHTML = `${i}`;
    }
    redBlock.style.backgroundColor = "rgba(255, 0, 0, 1)";
    playAudio(audioRed);
    let colorChange = setTimeout(() => {
      redBlock.style.backgroundColor = "rgba(160, 0, 0, 1)";
    }, 1000);
}

function makeBlueActive(i) {
    if (i < 10) {
      display.innerHTML = `0${i}`;
    } else {
      display.innerHTML = `${i}`;
    }
    blueBlock.style.backgroundColor = "rgba(0, 0, 255, 1)";
    playAudio(audioBlue);
    let colorChange = setTimeout(() => {
      blueBlock.style.backgroundColor = "rgba(0, 0, 140, 1)";
    }, 1000);
}

function makeGreenActive(i) {
    if (i < 10) {
      display.innerHTML = `0${i}`;
    } else {
      display.innerHTML = `${i}`;
    }
    greenBlock.style.backgroundColor = "rgba(0, 255, 0, 1)";
    playAudio(audioGreen);
    let colorChange = setTimeout(() => {
      greenBlock.style.backgroundColor = "rgba(0, 160, 0, 1)";
    }, 1000);
}

function makeYellowActive(i) {
    if (i < 10) {
      display.innerHTML = `0${i}`;
    } else {
      display.innerHTML = `${i}`;
    }
    yellowBlock.style.backgroundColor = "rgba(255, 255, 0, 1)";
    playAudio(audioYellow);
    let colorChange = setTimeout(() => {
      yellowBlock.style.backgroundColor = "rgba(200, 180, 0, 1)";
    }, 1000);
}


// check if the block is pressed or not within 1000ms
function checkRedPressed() {
  isRedElementClicked = true;
}

function checkBluePressed() {
  isBlueElementClicked = true;
}

function checkGreenPressed() {
  isGreenElementClicked = true;
}

function checkYellowPressed() {
  isYellowElementClicked = true;
}

function waitRedChecking()  {
  setTimeout( () => {
    if(isRedElementClicked && !isBlueElementClicked && !isGreenElementClicked && !isYellowElementClicked) {
      console.log("clicked");
      isRedElementClicked = false;
    } else {
      stopGame();
    }
  }, 2000);
}

function waitGreenChecking()  {
  setTimeout( () => {
    if(isGreenElementClicked && !isBlueElementClicked && !isRedElementClicked && !isRedElementClicked) {
      console.log("clicked");
      isGreenElementClicked = false;
    } else {
      stopGame();
    }
  }, 2000);
}

function waitBlueChecking()  {
  setTimeout( () => {
    if(isBlueElementClicked && !isGreenElementClicked && !isRedElementClicked && !isYellowElementClicked) {
      console.log("clicked");
      isBlueElementClicked = false;
    } else {
      stopGame();
    }
  }, 2000);
}

function waitYellowChecking()  {
  setTimeout( () => {
    if(isYellowElementClicked && !isRedElementClicked && !isBlueElementClicked && !isGreenElementClicked) {
      console.log("clicked");
      isYellowElementClicked = false;
    } else {
      stopGame();
    }
  }, 2000);
}



function strictMode() {
  if (!strictClicked && checkBox.checked) {
    strictLight.style.backgroundColor="green";
    strictClicked = !strictClicked;
  } else {
    strictLight.style.backgroundColor="lightgray";
    strictClicked = !strictClicked;
  }
}

/* event Listeners */
checkBox.addEventListener('click', handleCheck);
start.addEventListener('click', gameOn);
strict.addEventListener('click', strictMode);
