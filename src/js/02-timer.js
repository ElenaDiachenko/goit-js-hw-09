import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
let leftTime = null;


refs.startBtn.addEventListener('click', () => timer.start());

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notify.failure('Please choose a day in the future');
       refs.startBtn.disabled = true;
        return;
      }
      leftTime = selectedDates[0];
      refs.startBtn.disabled = false;
  },
};

flatpickr(refs.inputDate, options);

class CounDownTimer {
  constructor({onUpdate}) {
    this.intervalId = null;
    this.onUpdate = onUpdate;
    refs.startBtn.disabled = true;
  }

   start() {
    this.intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = leftTime - currentTime;
    const componentsTimer = this.convertMs(deltaTime);
    this.onUpdate(componentsTimer);
    refs.startBtn.disabled = true;
    }, 1000);
    }
  convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = this.addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
}

const timer = new CounDownTimer(
  {onUpdate: updateClockFace},
)

function updateClockFace  ({ days, hours, minutes, seconds }){
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}