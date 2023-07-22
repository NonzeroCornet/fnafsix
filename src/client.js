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

var bloopity = new Audio("/assets/audio/bing5.wav");
var monitorNoise = new Audio("assets/audio/computer2.wav");
monitorNoise.loop = true;

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

if (window.location.href.split("?").length > 1) {
  socket = io("http://" + window.location.href.split("?")[1] + ":8080");
  connected = true;
  document.body.requestFullscreen();
  document.querySelector(".client").style.display = "block";
  Start();
}

var motionPositions = [
  { top: "60px", left: "7px" },
  { top: "60px", left: "145px" },
  { top: "60px", left: "285px" },
  { top: "60px", left: "427.5px" },
  { top: "60px", left: "566.5px" },
  { top: "198px", left: "7px" },
  { top: "198px", left: "145px" },
  { top: "198px", left: "427.5px" },
  { top: "198px", left: "566.5px" },
  { top: "338px", left: "7px" },
  { top: "338px", left: "145px" },
  { top: "338px", left: "427.5px" },
  { top: "338px", left: "566.5px" },
];

var canSkip = true;
var adAudio = new Audio("/assets/audio/ad.mp3");

function Start() {
  monitorNoise.play();
  socket.on("setMoneyC", (amount) => {
    money = amount;
    document.querySelectorAll("p").forEach((x) => {
      x.innerHTML = "$" + money;
    });
  });

  socket.on("motionBloopC", (room) => {
    var bloopImg = document.createElement("img");
    bloopImg.src = "/assets/images/Tasks/Warning.png";
    bloopImg.style = `position: absolute; top: ${motionPositions[room].top}; left: ${motionPositions[room].left}; width: 40px; animation: blink-animation 0.75s steps(5, start) infinite; filter: brightness(0.73);`;
    $("motion").appendChild(bloopImg);
    setTimeout(() => {
      bloopImg.remove();
    }, 1000);
  });

  socket.on("advertC", () => {
    $("advertImage").src = `/assets/images/Advert${Math.round(
      Math.random() * 3
    )}.png`;
    $("advertImageDiv").style.display = "block";
    adAudio.currentTime = 0;
    adAudio.play();
    canSkip = false;
    $("skipBtn").style.cursor = "default";
    setTimeout(() => {
      canSkip = true;
      $("skipBtn").style.cursor = "pointer";
    }, 2000);
  });

  socket.on("grantC", (num) => {
    if (num == 0) {
      uplinkUpgrade = true;
    } else if (num == 1) {
      printerUpgrade = true;
    } else {
      handymanUpgrade = true;
    }
    $("eq" + num).remove();
  });

  socket.on("reloadC", () => {
    window.location.href =
      "client.html?" + document.querySelector("input").value;
  });

  socket.on("murderC", () => {
    $("blackout").style.display = "block";
    $("ded").style.display = "block";
    monitorNoise.pause();
    new Audio("assets/audio/ded.mp3").play();
  });
}

function skipAd() {
  if (canSkip) {
    adAudio.pause();
    $("advertImageDiv").style.display = "none";
  }
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
let taskSFX = new Audio("/assets/audio/orderitem.mp3");
taskSFX.loop = true;
function runTask(task, number) {
  if (!taskRunning) {
    if (!uplinkUpgrade) {
      taskSFX.play();
    }
    document.querySelectorAll(".loading")[number].style.display = "block";
    $("pleasewait1").style.opacity = "1";
    task.style.cursor = "default";
    taskRunning = true;
    document.body.style.pointerEvents = "none";
    setTimeout(
      () => {
        taskSFX.pause();
        task.remove();
        document.querySelectorAll(".loading")[number].style.display = "none";
        $("pleasewait1").style.opacity = "0";
        taskRunning = false;
        document.body.style.pointerEvents = "unset";
        if (document.querySelector("#tasks").children.length == 8) {
          document.querySelectorAll(".warning")[0].style.display = "none";
          socket.emit("log", "Finished ordering supplies!!!");
          if (
            document.querySelectorAll(".warning")[0].style.display == "none" &&
            document.querySelectorAll(".warning")[1].style.display == "none" &&
            document.querySelectorAll(".warning")[2].style.display == "none"
          ) {
            $("logOffBtn").style.display = "block";
          }
        }
      },
      uplinkUpgrade ? 7000 : 8350
    );
  }
}

function runAdvertising(task, number) {
  if (!taskRunning) {
    let printingSFX = new Audio(
      printerUpgrade
        ? "/assets/audio/laserprinter3.mp3"
        : "/assets/audio/printing.mp3"
    );
    printingSFX.play();
    document.querySelectorAll(".loading")[number].style.display = "block";
    $("pleasewait2").style.opacity = "1";
    task.style.cursor = "default";
    taskRunning = true;
    document.body.style.pointerEvents = "none";
    setTimeout(
      () => {
        printingSFX.pause();
        task.remove();
        document.querySelectorAll(".loading")[number].style.display = "none";
        $("pleasewait2").style.opacity = "0";
        taskRunning = false;
        document.body.style.pointerEvents = "unset";
        if (document.querySelector("#advertising").children.length == 6) {
          document.querySelectorAll(".warning")[1].style.display = "none";
          socket.emit("log", "Finished printing stuff!!!");
          if (
            document.querySelectorAll(".warning")[0].style.display == "none" &&
            document.querySelectorAll(".warning")[1].style.display == "none" &&
            document.querySelectorAll(".warning")[2].style.display == "none"
          ) {
            $("logOffBtn").style.display = "block";
          }
        }
      },
      printerUpgrade ? 14000 : 16680
    );
  }
}

function runMaintenance(task, number) {
  if (!taskRunning) {
    document.querySelectorAll(".loading")[number].style.display = "block";
    $("pleasewait3").style.opacity = "1";
    task.style.cursor = "default";
    taskRunning = true;
    document.body.style.pointerEvents = "none";
    setTimeout(
      () => {
        task.remove();
        document.querySelectorAll(".loading")[number].style.display = "none";
        $("pleasewait3").style.opacity = "0";
        taskRunning = false;
        document.body.style.pointerEvents = "unset";
        if (document.querySelector("#maintenance").children.length == 6) {
          document.querySelectorAll(".warning")[2].style.display = "none";
          socket.emit("log", "Finished maintenance!!!");
          if (
            document.querySelectorAll(".warning")[0].style.display == "none" &&
            document.querySelectorAll(".warning")[1].style.display == "none" &&
            document.querySelectorAll(".warning")[2].style.display == "none"
          ) {
            $("logOffBtn").style.display = "block";
          }
        }
      },
      handymanUpgrade ? 10000 : 12520
    );
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
        socket.emit("log", "<span>PRINTER UPGRADE!!! ($500)</span>");
      } else if (number == 12) {
        uplinkUpgrade = true;
        money -= 500;
        document.querySelectorAll("p").forEach((x) => {
          x.innerHTML = "$" + money;
        });
        socket.emit("log", "<span>UPLINK UPGRADE!!! ($500)</span>");
      } else {
        handymanUpgrade = true;
        money -= 900;
        document.querySelectorAll("p").forEach((x) => {
          x.innerHTML = "$" + money;
        });
        socket.emit("log", "<span>HANDYMAN UPGRADE!!! ($900)</span>");
      }
    }, 100);
  }
}

var isScanning = false;
var isPlaying = false;
var silentVent = false;

function toggleMotion(elem) {
  elem.src = "/assets/images/Tasks/Scanning....png";
  isScanning = true;
  $("audioGif").style.display = "none";
  $("selectRoom").src = "/assets/images/Tasks/SelectRoom.png";
  isPlaying = false;
  $("silentVentBtn").src = "/assets/images/Tasks/ActivateSilentVentalation.png";
  $("ventIcon").src = "/assets/images/Vent%20Icon/Vent1.png";
  silentVent = false;
  $("Bar").style.left = "164px";
  $("Bar").style.display = "block";
  socket.emit("log", "MOTION");
}

function activateAudio(elem) {
  $("selectRoom").src = "/assets/images/Tasks/Playing....png";
  isPlaying = true;
  $("audioGif").style.top = elem.style.top;
  $("audioGif").style.left = elem.style.left;
  $("audioGif").style.display = "block";
  $("activateMotion").src = "/assets/images/Tasks/ActivateMotionScanning.png";
  isScanning = false;
  $("silentVentBtn").src = "/assets/images/Tasks/ActivateSilentVentalation.png";
  $("ventIcon").src = "/assets/images/Vent%20Icon/Vent1.png";
  silentVent = false;
  $("Bar").style.left = "318px";
  $("Bar").style.display = "block";
  socket.emit("log", "AUDIO IN ROOM " + elem.id);
}

function activateSilentVentilation(elem) {
  elem.src = "/assets/images/Tasks/SilentVentActive.png";
  $("ventIcon").src = "/assets/images/Vent%20Icon/Vent.gif";
  silentVent = true;
  $("activateMotion").src = "/assets/images/Tasks/ActivateMotionScanning.png";
  isScanning = false;
  $("audioGif").style.display = "none";
  $("selectRoom").src = "/assets/images/Tasks/SelectRoom.png";
  isPlaying = false;
  $("Bar").style.left = "472px";
  $("Bar").style.display = "block";
  socket.emit("log", "SILENT VENTILATION");
}
var loggedOff = false;
function logOff() {
  $("blackout").style.display = "block";
  monitorNoise.pause();
  socket.emit(
    "log",
    "<span style='color: yellow'>!NIGHT END! Money: $" + money + "</span>"
  );
  loggedOff = true;
}

var monitorOn = true;
var monitorNoise = new Audio("assets/audio/computer2.wav");
monitorNoise.loop = true;
let code = false;

let konami = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
  "Enter",
];

let codeProgression = 0;

document.addEventListener("keydown", (event) => {
  if (event.key == "z" && !loggedOff && !taskRunning) {
    if (monitorOn) {
      monitorNoise.pause();
      new Audio("assets/audio/powerdown5.mp3").play();
      $("blackout").style.display = "block";
    } else {
      monitorNoise.play();
      $("blackout").style.display = "none";
    }
    monitorOn = !monitorOn;
  }
  if (!code) {
    if (event.key == konami[codeProgression]) {
      codeProgression++;
      if (codeProgression > 10) {
        code = true;
        monitorNoise.src = "assets/audio/DOOOM.mp3";
        monitorNoise.play();
      }
    } else {
      codeProgression = 0;
    }
  }
});
