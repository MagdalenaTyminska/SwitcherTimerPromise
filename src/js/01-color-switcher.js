const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

stopBtn.disabled = true;

let timer = 0;

startBtn.addEventListener('click', () => {
  timer = setInterval(bgColorChanger, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
  clearTimeout(timer);
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

const bgColorChanger = () => {
  body.style.backgroundColor = getRandomHexColor();
};
