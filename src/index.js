const { app, BrowserWindow } = require("electron");
const ip = require("ip").address();
const express = require("express");
const exApp = express();
const cors = require("cors");
var http = require("http").createServer(exApp);
var io = require("socket.io")(http, {
  cors: { methods: ["GET", "PATCH", "POST", "PUT"], origin: true },
});
exApp.use(cors());
exApp.use(express.static(__dirname + "/"));
exApp.get("/", (req, res) => {
  res.send("<script>window.location.href = '/controls.html'</script>");
});
var mainWindow;
io.on("connection", (socket) => {
  // Project Specific Connections
  socket.on("log", (message) => {
    io.sockets.emit("logControls", message);
    io.sockets.emit("messageRecieved");
  });
});
http.listen(8080);
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    title: "FNAF 6 SYSTEM",
    icon: __dirname + "/assets/images/icon.png",
    frame: false,
  });
  mainWindow
    .loadURL(`http://localhost:8080/controls.html?ip=${ip}`)
    .then(() => {
      console.clear();
    });
};
if (require("electron-squirrel-startup")) {
  app.quit();
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
