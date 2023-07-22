const { app, BrowserWindow } = require("electron");
const express = require("express");
const exApp = express();
const cors = require("cors");
const http = require("http").createServer(exApp);
const io = require("socket.io")(http, {
  cors: { methods: ["GET", "PATCH", "POST", "PUT"], origin: true },
});
const os = require("os");
const ip = require("ip");
function getLocalIPAddress() {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    if (interfaceName.includes("Wi-Fi")) {
      const adapters = networkInterfaces[interfaceName];
      for (const adapter of adapters) {
        if (adapter.family === "IPv4" && !adapter.internal) {
          return adapter.address;
        }
      }
    }
  }
  return ip.address();
}
exApp.use(cors());
exApp.use(express.static(__dirname + "/"));
exApp.get("/", (req, res) => {
  res.send(
    `<script>window.location.href = "/controls.html?ip=${getLocalIPAddress()}"</script>`
  );
});
var mainWindow;
io.on("connection", (socket) => {
  // Project Specific Connections
  socket.on("log", (message) => {
    io.sockets.emit("logControls", message);
    io.sockets.emit("messageRecieved");
  });

  socket.on("moneyUpdateR", (value) => {
    io.sockets.emit("setMoneyC", value);
  });

  socket.on("motionBloopR", (num) => {
    io.sockets.emit("motionBloopC", num);
  });

  socket.on("advertR", () => {
    io.sockets.emit("advertC");
  });

  socket.on("grantR", (num) => {
    io.sockets.emit("grantC", num);
  });

  socket.on("reloadR", () => {
    io.sockets.emit("reloadC");
  });

  socket.on("murderR", () => {
    io.sockets.emit("murderC");
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
  mainWindow.loadURL(`http://localhost:8080/`).then(() => {
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
