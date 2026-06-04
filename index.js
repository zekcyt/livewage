class Stopwatch {
    constructor() {
        this.startTime = 0;
        this.endTime = 0;
        this.running = false;
        this.interval = null;
        this.elapsedTime = 0;
        this.wage = 0;
    }

    start() {
        if (this.running) {
            console.warn ("stopwatch is already running" );
            return;
        }

        this.hourlyRate();

        this.interval = setInterval(() => {
            this.updateDisplay();
        }, 10);
        this.running = true;
        this.startTime = Date.now();
        console.log("stopwatch started");
    }

    stop() {
        if (!this.running) {
            console.warn("stopwatch is not running");
            return;
        }
        this.endTime = Date.now();
        this.running = false;
        clearInterval(this.interval);
        const duration = (this.endTime - this.startTime) / 1000; 
        console.log(`stopwatch stopped. duration: ${duration.toFixed(2)} seconds`);
        return duration;
    }

    reset() {
        clearInterval(this.interval);

        this.running = false;
        this.startTime = 0;
        this.endTime = 0;
        this.elapsedTime = 0;

        document.getElementById('hr').textContent = "00";
        document.getElementById('min').textContent = "00";
        document.getElementById('sec').textContent = "00";
        document.getElementById('count').textContent = "00";
    }

    hourlyRate() {
    const input = document.getElementById('rate');

    console.log("INPUT ELEMENT:", input);
    console.log("RAW VALUE:", input.value);

    this.wage = parseFloat(input.value) || 0;

    console.log("WAGE:", this.wage);
    }

    updateDisplay() {
        const elapsed = Date.now() - this.startTime;
        const hoursWorked = elapsed / (1000 * 60 * 60)
        const earnings = hoursWorked * this.wage;

        document.getElementById('earnings').textContent =
            earnings.toFixed(6);

        let hours = Math.floor(elapsed / (1000 * 60 * 60));
        let minutes = Math.floor((elapsed / (1000 * 60)) % 60);
        let seconds = Math.floor((elapsed / 1000) % 60)
        let milliseconds = Math.floor((elapsed % 1000) / 10);

        hours = String(hours).padStart(2, '0');
        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');
        milliseconds = String(milliseconds).padStart(2, '0');

        document.getElementById('hr').textContent = hours;
        document.getElementById('min').textContent = minutes;
        document.getElementById('sec').textContent = seconds;
        document.getElementById('count').textContent = milliseconds;
    }
}

window.addEventListener('DOMContentLoaded', () => {

    const stopwatch = new Stopwatch();
    const startBtn = document.getElementById('start');
    const stopBtn = document.getElementById('stop');
    const resetBtn = document.getElementById('reset');

    startBtn.addEventListener('click', () => {
        stopwatch.start();
    });

    stopBtn.addEventListener('click', () => {
        stopwatch.stop();
    });

    resetBtn.addEventListener('click', () => {
        stopwatch.reset();
    });

}); 
