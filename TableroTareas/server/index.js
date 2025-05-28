const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");
const path = require("path");

const app = express();
app.use(cors({ origin: "*" })); 

const server = http.createServer(app);
const io = socketIO(server, {
  path: "/ws/",
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  }
});

let tasks = []; 
let currentId = 0;

io.on("connection", (socket) => {
  console.log("Usuario conectado");
  socket.emit("initialTasks", tasks); 

  socket.on("addTask", (text) => {
    const task = {id: currentId++, text: text, completed: false};
    tasks.push(task);
    io.emit("taskAdded", task);
  });

  socket.on("deleteTask", (taskId) => {
    tasks = tasks.filter(t => t.id !== taskId);
    io.emit("taskDeleted", taskId);
  });

  socket.on("toggleTask", (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      io.emit("taskUpdated", task); 
    }
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});
