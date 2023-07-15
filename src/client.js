var socket;
var connected = false;
var windowClosing = 0;
const $ = (id) => {
  return document.getElementById(id);
};

var printerUpgrade = false;
var uplinkUpgrade = false;
var handymanUpgrade = false;

document.addEventListener("keydown", (event) => {
  if (event.key == "Escape") {
    event.preventDefault();
    windowClosing == 9 ? window.close() : windowClosing++;
  } else {
    windowClosing = 0;
  }
  if (event.key == "f") {
    document.body.requestFullscreen();
  } else if (event.key == "Enter" && !connected) {
    socket = io("http://" + document.querySelector("input").value + ":8080");
    socket.emit("log", "Client Connected!!!");
    socket.on("messageRecieved", () => {
      connected = true;
      document.body.requestFullscreen();
      document.querySelector(".client").style.display = "block";
      Start();
    });
  }
});

function Start() {
  // Project Specific JS
}

function switchScreen(screen1child, screen2ID) {
  screen1child.parentElement.style.display = "none";
  $(screen2ID).style.display = "block";
}

var taskRunning = false;

function runTask(task, number) {
  if (!taskRunning) {
    document.querySelectorAll(".loading")[number].style.display = "block";
    $("pleasewait1").style.opacity = "1";
    task.style.cursor = "default";
    taskRunning = true;
    document.body.style.pointerEvents = "none";
    setTimeout(() => {
      task.remove();
      document.querySelectorAll(".loading")[number].style.display = "none";
      $("pleasewait1").style.opacity = "0";
      taskRunning = false;
      document.body.style.pointerEvents = "unset";
      if (document.querySelector("#tasks").children.length == 7) {
        document.querySelectorAll(".warning")[0].style.display = "none";
      }
    }, 8350);
  }
}

function runAdvertising(task, number) {
  if (!taskRunning) {
    document.querySelectorAll(".loading")[number].style.display = "block";
    $("pleasewait2").style.opacity = "1";
    task.style.cursor = "default";
    taskRunning = true;
    document.body.style.pointerEvents = "none";
    setTimeout(() => {
      task.remove();
      document.querySelectorAll(".loading")[number].style.display = "none";
      $("pleasewait2").style.opacity = "0";
      taskRunning = false;
      document.body.style.pointerEvents = "unset";
      if (document.querySelector("#advertising").children.length == 5) {
        document.querySelectorAll(".warning")[1].style.display = "none";
      }
    }, 16680);
  }
}

function runMaintenance(task, number) {
  if (!taskRunning) {
    document.querySelectorAll(".loading")[number].style.display = "block";
    $("pleasewait3").style.opacity = "1";
    task.style.cursor = "default";
    taskRunning = true;
    document.body.style.pointerEvents = "none";
    setTimeout(() => {
      task.remove();
      document.querySelectorAll(".loading")[number].style.display = "none";
      $("pleasewait3").style.opacity = "0";
      taskRunning = false;
      document.body.style.pointerEvents = "unset";
      if (document.querySelector("#maintenance").children.length == 5) {
        document.querySelectorAll(".warning")[2].style.display = "none";
      }
    }, 12520);
  }
}

function runEquipment(task, number) {
  if (!taskRunning) {
    document.querySelectorAll(".loading")[number].style.display = "block";
    $("pleasewait4").style.opacity = "1";
    task.style.cursor = "default";
    taskRunning = true;
    document.body.style.pointerEvents = "none";
    setTimeout(() => {
      task.remove();
      document.querySelectorAll(".loading")[number].style.display = "none";
      $("pleasewait4").style.opacity = "0";
      taskRunning = false;
      document.body.style.pointerEvents = "unset";
      if(number == 11) {
        printerUpgrade = true;
      } else if(number == 12) {
        uplinkUpgrade = true;
      } else {
        handymanUpgrade = true;
      }
    }, 100);
  }
}