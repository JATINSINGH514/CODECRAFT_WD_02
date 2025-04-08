let startTime = 0;
let interval;
let running = false;

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const centiseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return `${minutes}:${seconds}:${centiseconds}`;
}

function startStop() {
  if (!running) {
    running = true;
    startTime = Date.now() - (startTime || 0);
    interval = setInterval(() => {
      document.getElementById("display").textContent = formatTime(Date.now() - startTime);
    }, 10);
  }
}

function pause() {
  if (running) {
    running = false;
    clearInterval(interval);
  }
}

function reset() {
  clearInterval(interval);
  startTime = 0;
  running = false;
  document.getElementById("display").textContent = "00:00:00";
  document.getElementById("laps").innerHTML = "";
}

function lap() {
  if (!running) return;
  const lapTime = formatTime(Date.now() - startTime);
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap: ${lapTime}`;
  document.getElementById("laps").appendChild(lapItem);
}
