import Notiflix from 'notiflix';

const form = document.querySelector('form');
const submitButton = document.querySelector('button[type=submit]');

let promiseNumber = 0;
let delayPromise = 0;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const notification = (position, delay) => {
  createPromise(position, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
};

const btnHandler = event => {
  event.preventDefault();
  const delayValue = Number(form.elements.delay.value);
  const stepValue = Number(form.elements.step.value);
  submitButton.disabled = true;

  for (let i = 0; i < form.elements.amount.value; i++) {
    promiseNumber++;
    delayPromise = delayValue + stepValue * i;
    notification(promiseNumber, delayPromise);
  }

  setTimeout(() => {
    submitButton.disabled = false;
  }, delayPromise * 1.3);

  promiseNumber = 0;
  delayPromise = 0;
};

form.addEventListener('submit', btnHandler);
