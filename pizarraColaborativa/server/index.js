const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
app.use(cors({ origin: "*" })); // Permitir solicitudes de cualquier origen

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  }
});

io.on("connection", (socket) => {
  console.log("Usuario conectado");

  socket.on("draw", (data) => {
    socket.broadcast.emit("draw", data); 
  });

  socket.on("clear", () => {
    io.emit("clear"); 
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
