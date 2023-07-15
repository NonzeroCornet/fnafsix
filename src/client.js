var socket;
var connected = false;
var windowClosing = 0;
const $ = (id) => {
  return document.getElementById(id);
};

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
    setTimeout(() => {
      task.remove();
      document.querySelectorAll(".loading")[number].style.display = "none";
      $("pleasewait1").style.opacity = "0";
      taskRunning = false;
      if (document.querySelector("#tasks").children.length == 7) {
        document.querySelectorAll(".warning")[0].style.display = "none";
      }
    }, 1000);
  }
}
