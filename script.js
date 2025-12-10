// ===============================
// Alarm Sound Setup
// ===============================
const alarmSound = new Audio("alarm.mp3");
alarmSound.loop = true; // keep ringing until stopped

// ===============================
// DOM Elements
// ===============================
const timerForm = document.getElementById("timerForm");
const titleInput = document.getElementById("title");
const datetimeInput = document.getElementById("datetime");
const timersContainer = document.getElementById("timersContainer");

// ===============================
// Timers storage
// ===============================
const timers = [];

// ===============================
// Form Submit
// ===============================
timerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = titleInput.value.trim() || "My Event";
  const dateTimeValue = datetimeInput.value;

  if (!dateTimeValue) {
    alert("Please select date & time");
    return;
  }

  const targetTime = new Date(dateTimeValue).getTime();

  if (isNaN(targetTime) || targetTime <= Date.now()) {
    alert("Please choose a valid future time");
    return;
  }

  createTimer(title, targetTime);
  titleInput.value = "";
});

// ===============================
// Create Timer Card
// ===============================
function createTimer(title, targetTime) {
  const card = document.createElement("div");
  card.className = "timer-card";

  const header = document.createElement("div");
  header.className = "timer-header";

  const titleEl = document.createElement("h3");
  titleEl.textContent = title;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.className = "delete-btn";

  header.appendChild(titleEl);
  header.appendChild(deleteBtn);

  const timeText = document.createElement("div");
  timeText.className = "timer-remaining";
  timeText.textContent = "--d --h --m --s";

  const status = document.createElement("div");
  status.className = "timer-status";
  status.textContent = "Running...";

  card.appendChild(header);
  card.appendChild(timeText);
  card.appendChild(status);
  timersContainer.appendChild(card);

  const timer = {
    targetTime,
    card,
    timeText,
    status,
    finished: false,
  };

  timers.push(timer);

  deleteBtn.addEventListener("click", () => {
    card.remove();
    const index = timers.indexOf(timer);
    if (index !== -1) timers.splice(index, 1);
  });

  updateTimer(timer);
}

// ===============================
// Update Timer
// ===============================
function updateTimer(timer) {
  const now = Date.now();
  const diff = timer.targetTime - now;

  if (diff <= 0) {
    timer.timeText.textContent = "00d 00h 00m 00s";

    if (!timer.finished) {
      timer.finished = true;
      timer.card.classList.add("finished");
      timer.status.textContent = "Time's up ⏰";

      // 🔔 PLAY ALARM
      alarmSound.currentTime = 0;
      alarmSound.play().catch(() => {});

      // ⏹ STOP ALARM AFTER 10 SECONDS
      setTimeout(() => {
        alarmSound.pause();
        alarmSound.currentTime = 0;
      }, 10000);
    }
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  timer.timeText.textContent =
    `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}

// ===============================
// Pad Numbers
// ===============================
function pad(n) {
  return n.toString().padStart(2, "0");
}

// ===============================
// Global Interval
// ===============================
setInterval(() => {
  timers.forEach(updateTimer);
}, 1000);
