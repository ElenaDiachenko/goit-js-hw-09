const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', ()=> changeBgBody.onStart());
refs.stopBtn.addEventListener('click', ()=> changeBgBody.onStop());


class ChangeBackground{
    constructor({randomHex}) {
        this.intervalId = null;
        refs.stopBtn.disabled = true;
        this.randomHex = randomHex;
    }
     onStart() {
     this.intervalId = setInterval(() => {
        document.querySelector("body").style.backgroundColor = this.randomHex(getRandomHexColor);
     }, 1000);
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
     }
     onStop() {
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
    clearInterval(this.intervalId);
     }
    
}
const changeBgBody = new ChangeBackground(
  {randomHex: getRandomHexColor},
)

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};


// let intervalId = null;
// refs.stopBtn.disabled = true;

// refs.startBtn.addEventListener('click', onChangeColor);
// refs.stopBtn.addEventListener('click', onStopChangeColor);

// function onChangeColor() {
//      intervalId = setInterval(() => {
//         document.querySelector("body").style.backgroundColor = getRandomHexColor();
//      }, 1000);
//     refs.startBtn.disabled = true;
//     refs.stopBtn.disabled = false;
// };

// function onStopChangeColor() {
//     refs.startBtn.disabled = false;
//     refs.stopBtn.disabled = true;
    // clearInterval(intervalId);
// };