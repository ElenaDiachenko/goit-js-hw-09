const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
};

let intervalId = null;
refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', onChangeColor);
refs.stopBtn.addEventListener('click', onStopChangeColor);


function onChangeColor() {
     intervalId = setInterval(() => {
        document.querySelector("body").style.backgroundColor = getRandomHexColor();
     }, 1000);
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
};

function onStopChangeColor() {
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

