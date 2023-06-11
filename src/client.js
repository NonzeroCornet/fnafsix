var socket;
var connected = false;
var windowClosing = 0;

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
