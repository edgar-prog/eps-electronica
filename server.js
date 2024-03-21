
// Vriables de entorno
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname,'.env')
});
const PORT = process.env.PORT || 3000;

//Instancias del servidor web y del websocket
const { serverWeb, io } = require('./server/websocket');

//Inicializando el servidor
serverWeb.listen(PORT, () => {
  console.log('Servidor web puerto ' + PORT);
});

//Envio del error que se produzca al iniciar el servidor web
serverWeb.on("error", function (err) {
  console.log(err);
});

//Inicializacion del websocket
require('./server/socket')(io)
