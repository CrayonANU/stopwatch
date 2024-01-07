let isRunning = false;
let startTime;
let lapStartTime;
let lapNumber = 1;

function startStop() {
    const startStopButton = document.getElementById("startStop");
    const lapResetButton = document.getElementById("lapReset");

    if (isRunning) {
        // Stop the stopwatch
        isRunning = false;
        lapResetButton.textContent = "Reset";
        lapResetButton.disabled = false;
        startStopButton.textContent = "Start";
        displayElapsedTime();
    } else {
        // Start the stopwatch
        isRunning = true;
        lapResetButton.textContent = "Lap";
        lapResetButton.disabled = false;
        startStopButton.textContent = "Stop";
        startTime = Date.now() - (lapStartTime || 0);
        lapStartTime = null;
        updateDisplay();
    }
}

function lapReset() {
    const lapResetButton = document.getElementById("lapReset");
    const lapList = document.getElementById("lapList");

    if (isRunning) {
        // Record lap time
        const lapTime = Date.now() - startTime;
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapNumber}: ${formatTime(lapTime)}`;
        lapList.appendChild(lapItem);
        lapNumber++;
        lapStartTime = Date.now();
    } else {
        // Reset the stopwatch
        isRunning = false;
        startTime = null;
        lapStartTime = null;
        lapNumber = 1;
        lapResetButton.textContent = "Lap";
        lapResetButton.disabled = true;
        updateDisplay();
        clearLapList();
    }
}

function updateDisplay() {
    const display = document.getElementById("display");
    const elapsed = isRunning ? Date.now() - startTime : 0;
    display.textContent = formatTime(elapsed);
    if (isRunning) {
        requestAnimationFrame(updateDisplay);
    }
}

function displayElapsedTime() {
    const display = document.getElementById("display");
    const elapsed = Date.now() - startTime;
    display.textContent = formatTime(elapsed);
}

function clearLapList() {
    const lapList = document.getElementById("lapList");
    lapList.innerHTML = "";
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
