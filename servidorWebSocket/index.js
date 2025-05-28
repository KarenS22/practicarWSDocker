const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 3000;

const router = require('./router');

const app = express();

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: '*',
    },
});

var now = new Date();

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado' + now);

    socket.on('insertar', (usuario)=> {
        console.log(`Usuario insertado: ${usuario} a las ${now}`);
        socket.broadcast.emit('insert', usuario);
        // io.emit('insertar', { usuario: usuario, fecha: now });
    });

    socket.on('eliminar', (id) => {
        console.log(`Usuario eliminado: ${usuario} a las ${now}`);
        socket.broadcast.emit('delete', id);
        // io.emit('eliminar', { usuario: usuario, fecha: now });
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado a las ' + now);
    }); 

    socket.on('mensaje', (data) => {
        console.log(`Mensaje recibido: ${data}`);
        io.emit('mensaje', { mensaje: data, fecha: now });
    });
});

app.use(router);

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
