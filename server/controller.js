//Inicializacion de la configuracion del path de archivos
const path = require('path');

//controlador para cargar la pagina index.html
function index(req, res){
    res.sendFile(path.join(__dirname, "public/index.html"));
}

module.exports = { index };