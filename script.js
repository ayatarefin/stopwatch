const stopwatch= document.getElementById("stopwatch");
const lapTime= document.getElementById("lapTime");
const lapCounter= document.getElementById("lapCounter");
const lapList= document.getElementById("lapList");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let lapCount = 1;
let lapTimes = [];

function startStopwatch(){
    if(!isRunning){
        startTime = Date.now()-elapsedTime;
        timer = setInterval(updateStopwatch, 10);
        isRunning = true;
    }
}
function stopStopwatch(){
    if(isRunning){
        clearInterval(timer);
        elapsedTime = Date.now()- startTime;
        isRunning = false;
    }
}
function resetStopwatch(){
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    lapCount=1;
    lapTimes = [];
    stopwatch.textContent = `00:00:00:00`;
    lapCounter.textContent = `Laps: 0`;
    lapTime.textContent =`Lap Time: 00:00:00:00`
    lapList.innerHTML = '';
}
function updateStopwatch(){
    const currentTime = Date.now();
    elapsedTime = currentTime-startTime;

    let hours = Math.floor(elapsedTime/ (1000*60*60)).toString().padStart(2,0);
    let minutes = Math.floor(elapsedTime/ (1000*60)%60).toString().padStart(2,0);
    let seconds =Math.floor(elapsedTime/ 1000%60).toString().padStart(2,0);
    let milliSeconds = Math.floor(elapsedTime % 1000/10).toString().padStart(2,0);

    let lapTime = `${hours}:${minutes}:${seconds}:${milliSeconds}`
    stopwatch.textContent = lapTime;

}

function recordLap(){
    if(isRunning){
    let count =lapCount++;
    lapCounter.textContent = `Laps: ${count}`;
    const currentLapTime = stopwatch.textContent;
    lapTimes.push(currentLapTime);
    updateLapList();
}
}
function updateLapList(){
    lapList.innerHTML = '';
    lapTimes.forEach((lap, index) => {
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${index + 1}: ${lap}`;
        lapList.appendChild(lapItem);
        lapTime.textContent =`Lap Time: ${lap}`;
    });
}