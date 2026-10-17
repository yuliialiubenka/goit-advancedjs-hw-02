import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";

const dateInput = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const timerValues = {
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),
};

let userSelectedDate = null;
let timerId = null;

function convertMs(milliseconds) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    return {
        days: Math.floor(milliseconds / day),
        hours: Math.floor((milliseconds % day) / hour),
        minutes: Math.floor(((milliseconds % day) % hour) / minute),
        seconds: Math.floor((((milliseconds % day) % hour) % minute) / second),
    };
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

function updateTimer(milliseconds) {
    const time = convertMs(Math.max(milliseconds, 0));

    Object.entries(time).forEach(([unit, value]) => {
        timerValues[unit].textContent = addLeadingZero(value);
    });
}

function stopTimer() {
    clearInterval(timerId);
    timerId = null;
    dateInput.disabled = false;
    startButton.disabled = true;
}

function updateCountdown() {
    const remainingMilliseconds = userSelectedDate.getTime() - Date.now();

    updateTimer(remainingMilliseconds);

    if (remainingMilliseconds <= 0) {
        stopTimer();
    }
}

function startTimer() {
    if (!userSelectedDate || userSelectedDate.getTime() <= Date.now()) {
        return;
    }

    startButton.disabled = true;
    dateInput.disabled = true;
    updateCountdown();
    timerId = setInterval(updateCountdown, 1000);
}

flatpickr(dateInput, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];

        if (!selectedDate || selectedDate.getTime() <= Date.now()) {
            userSelectedDate = null;
            startButton.disabled = true;
            iziToast.error({
                message: "Please choose a date in the future",
            });
            return;
        }

        userSelectedDate = selectedDate;
        startButton.disabled = false;
    },
});

startButton.addEventListener("click", startTimer);
