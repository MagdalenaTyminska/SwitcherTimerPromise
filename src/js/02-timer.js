import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputField = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

startBtn.disabled = true;

const remainingDays = document.querySelector('span[data-days');
const remainingHours = document.querySelector('span[data-hours');
const remainingMinutes = document.querySelector('span[data-minutes');
const remainingSeconds = document.querySelector('span[data-seconds');
let remainingTime, chosenDate, arr;

function showTime() {
  arr = convertMs(remainingTime);
  remainingDays.innerHTML = addLeadingZero(arr.days);
  remainingHours.innerHTML = addLeadingZero(arr.hours);
  remainingMinutes.innerHTML = addLeadingZero(arr.minutes);
  remainingSeconds.innerHTML = addLeadingZero(arr.seconds);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenDate = selectedDates[0].getTime();
    startBtn.disabled = false;

    const currentDate = new Date().getTime();
    remainingTime = chosenDate - currentDate;

    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    }
  },
};

let timer = 0;

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  inputField.disabled = true;
  timer = setInterval(() => {
    remainingTime -= 1000;

    if (remainingTime < 1000) {
      startBtn.disabled = false;
      inputField.disabled = false;
      clearInterval(timer);
      remainingDays.innerHTML = '00';
      remainingHours.innerHTML = '00';
      remainingMinutes.innerHTML = '00';
      remainingSeconds.innerHTML = '00';
    }

    showTime();
  }, 1000);
});

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
const addLeadingZero = value => {
  return value.toString().padStart(2, '0');
};
