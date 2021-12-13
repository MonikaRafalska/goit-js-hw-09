import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const timer = document.querySelector('.timer');
const value = document.querySelectorAll('.value');
const field = document.querySelectorAll('.field');
const label = document.querySelectorAll('.label');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

timer.style.display = 'flex';

value.forEach(v => {
  v.style.fontWeight = '600';
  v.style.fontSize = '40px';
});

field.forEach(f => {
  f.style.display = 'flex';
  f.style.flexDirection = 'column';
  f.style.alignItems = 'center';
  f.style.paddingRight = '30px';
});

label.forEach(l => {
  l.style.textTransform = 'uppercase';
  l.style.fontWeight = '500';
});

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

startBtn.setAttribute('disabled', true);
let dateSet;
let timerId;

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let date = new Date();
    console.log(selectedDates[0]);
    if (selectedDates[0] <= date) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
      dateSet = selectedDates[0];
    }
  },
};

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

flatpickr('#date-selector', options);

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    let date = new Date();
    let ms = dateSet.getTime() - date.getTime();
    let time = convertMs(ms);
    days.innerHTML = addLeadingZero(time.days);
    hours.innerHTML = addLeadingZero(time.hours);
    minutes.innerHTML = addLeadingZero(time.minutes);
    seconds.innerHTML = addLeadingZero(time.seconds);
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
});