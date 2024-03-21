
//Instacia al modulo controller del servidor
const controller = require('./controller');

//Creando las instancias del ruteo
const { Router } = require('express');
const router = Router();

//Se agrega un controlador a la ruta de la pagina index
router.get("/", controller.index);

module.exports = { router };