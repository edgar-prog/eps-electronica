
const express = require('express');
const { router } = require('./route');

// Creando instancia de Express.js
const app = express();

//Configuracion de la carpeta public
app.use(express.static('public'));

//Agregando las rutas al servidor web
app.use('/', router);

// Configuración del servidor HTTP con Express.js
const http = require('http');
const serverWeb = http.Server(app);

// Configuración del servidor WebSocket con Socket.io
const io = require('socket.io')(serverWeb, {
  pingTimeout: 10000 // 10 segundos
});

module.exports = { io, serverWeb };