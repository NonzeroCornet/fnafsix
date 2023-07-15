var socket;
var connected = false;
var windowClosing = 0;
const $ = (id) => {
  return document.getElementById(id);
};

var printerUpgrade = false;
var uplinkUpgrade = false;
var handymanUpgrade = false;

var money = 0;

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

function switchMode(btn, mode) {
  document.querySelectorAll(".screen").forEach((x) => {
    x.style.display = "none";
  });
  $(mode).style.display = "block";
  document.querySelectorAll(".btn")[0].style.background = "transparent";
  document.querySelectorAll(".btn")[1].style.background = "transparent";
  document.querySelectorAll(".btn")[2].style.background = "transparent";
  document.querySelectorAll(".btn")[3].style.background = "transparent";
  btn.style.background = "#91bdd7";
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
      if (document.querySelector("#tasks").children.length == 8) {
        document.querySelectorAll(".warning")[0].style.display = "none";
        if (
          document.querySelectorAll(".warning")[0].style.display == "none" &&
          document.querySelectorAll(".warning")[1].style.display == "none" &&
          document.querySelectorAll(".warning")[2].style.display == "none"
        ) {
          $("logOffBtn").style.display = "block";
        }
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
      if (document.querySelector("#advertising").children.length == 6) {
        document.querySelectorAll(".warning")[1].style.display = "none";
        if (
          document.querySelectorAll(".warning")[0].style.display == "none" &&
          document.querySelectorAll(".warning")[1].style.display == "none" &&
          document.querySelectorAll(".warning")[2].style.display == "none"
        ) {
          $("logOffBtn").style.display = "block";
        }
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
      if (document.querySelector("#maintenance").children.length == 6) {
        document.querySelectorAll(".warning")[2].style.display = "none";
        if (
          document.querySelectorAll(".warning")[0].style.display == "none" &&
          document.querySelectorAll(".warning")[1].style.display == "none" &&
          document.querySelectorAll(".warning")[2].style.display == "none"
        ) {
          $("logOffBtn").style.display = "block";
        }
      }
    }, 12520);
  }
}

function runEquipment(task, number) {
  if (
    !taskRunning &&
    !(
      (number == 11 && money < 500) ||
      (number == 12 && money < 500) ||
      (number == 13 && money < 900)
    )
  ) {
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
      if (number == 11) {
        printerUpgrade = true;
        money -= 500;
        document.querySelectorAll("p").forEach((x) => {
          x.innerHTML = "$" + money;
        });
      } else if (number == 12) {
        uplinkUpgrade = true;
        money -= 500;
        document.querySelectorAll("p").forEach((x) => {
          x.innerHTML = "$" + money;
        });
      } else {
        handymanUpgrade = true;
        money -= 900;
        document.querySelectorAll("p").forEach((x) => {
          x.innerHTML = "$" + money;
        });
      }
    }, 100);
  }
}
