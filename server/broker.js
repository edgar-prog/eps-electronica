
// Crea una instancia del servidor mqtt
let settings = {
  type: "mqtt",
  json: false,
  mqtt: require("mqtt"),
  port: 1883
};

// Creacion de la instancia del broker mqtt
const mosca = require("mosca");

// Creacion y configuracion del servidor mqtt
const MQTT = new mosca.Server(settings);

module.exports = { MQTT };