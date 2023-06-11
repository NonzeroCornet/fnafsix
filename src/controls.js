var socket = io();

document.getElementById("ip").innerHTML = new URL(
  document.location
).searchParams.get("ip");

document.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    document.location = "client.html";
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
});
