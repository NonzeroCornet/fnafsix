var socket = io();

document.getElementById("ip").innerHTML = new URL(
  document.location
).searchParams.get("ip");

document.addEventListener("keydown", (event) => {
  if (
    event.key == "Enter" &&
    document.querySelector("div").style.display != "block"
  ) {
    document.location = "clientparent.html";
  } else if (event.key == "f") {
    document.body.requestFullscreen();
  } else if (event.key == "Escape") {
    window.close();
  }
});

// Project Specific JS

socket.on("logControls", (message) => {
  document.querySelector("div").style.display = "block";
  document.querySelector("div").innerHTML += `<br><h2>${message}</h2>`;
  document.querySelector("div").scrollTop =
    document.querySelector("div").scrollHeight;
});

function moneyUpdate() {
  socket.emit("moneyUpdateR", document.querySelector("#moneyBox").value);
}

function ping(num) {
  socket.emit("motionBloopR", num);
}

function triggerAd() {
  socket.emit("advertR");
}

function grant(num) {
  socket.emit("grantR", num);
}

function reload() {
  socket.emit("reloadR");
}

function murder() {
  socket.emit("murderR");
}
