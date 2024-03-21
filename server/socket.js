const {
  arrayMCU,
  sensorMCU,
  changeStatusMCU,
  selectionItem,
  fillArrayProcess,
  sendToSocket,
  getItems,
} = require("./emulation/data.table");

const dotenv = require("dotenv");
const path = require("path");
const { MQTT } = require("./broker");
const { db } = require("./database");

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

let today = new Date();
let now = today.toLocaleString();

module.exports = function (io) {
  MQTT.on("ready", () => {
    console.log("Servidor mqtt puerto 1883");
  });

  /* The `MQTT.on("clientConnected", ...)` function is an event listener that listens for the event of a
  client connecting to the MQTT broker. When a client connects, the callback function is executed with
  the `clienteMCU` parameter representing the connected client. */
  MQTT.on("clientConnected", (clienteMCU) => {
    console.log("Client Connected:", clienteMCU.id);
    io.emit("conections-all", changeStatusMCU({ id: clienteMCU.id, status: "ON" }));
    io.emit("mcu-status", arrayMCU);
  });

  /* The `MQTT.on("clientDisconnected", ...)` function is an event listener that listens for the event of
  a client disconnecting from the MQTT broker. When a client disconnects, the callback function is
  executed with the `clienteMCU` parameter representing the disconnected client. */
  MQTT.on("clientDisconnected", function (clienteMCU) {
    console.log("Client Disconnected:", clienteMCU.id);
    io.emit("conections-all", changeStatusMCU({ id: clienteMCU.id, status: "OFF" }));
    io.emit("mcu-status", arrayMCU);
  });

  /* The `MQTT.on("published", ...)` function is an event listener that listens for the event of a
  message being published to the MQTT broker. When a message is published, the callback function is
  executed with two parameters: `packet` and `clientMCU`. */
  MQTT.on("published", function (packet, clientMCU) {
    const topic = packet.topic;
    const payload = packet.payload.toString();
    console.log("Published", topic, payload);
    if (topic === "ESP-CRT3/LevelSensor10L") {
      sensorMCU[0].status = payload;
    }
    if (topic === "ESP-CRT3/LevelSensor100L") {
      sensorMCU[1].status = payload;
    }
    if (topic === "ESP-CRT3/SensorLine1") {
      sensorMCU[2].status = payload;
    }
    if (topic === "ESP-CRT3/SensorLine2") {
      sensorMCU[3].status = payload;
    }
    if (topic === "ESP-CRT4/TanqueSensor") {
      sensorMCU[1].status = payload;
    }
    io.emit("sensor-status", sensorMCU);
  });

  io.on("connection", (client) => {
    console.log("user connected " + client.id);

    client.emit("conections-all", arrayMCU);
    client.emit("mcu-status", arrayMCU);

    /* The `client.on("conections-all", ...)` function is listening for a specific event called
    "conections-all" from the client side. When this event is triggered, it executes a callback
    function that emits two events back to the client: */
    client.on("conections-all", (message) => {
      client.emit("conections-all", changeStatusMCU(message));
      client.emit("mcu-status", changeStatusMCU(message))
    });


    /* The `client.on("status-all", (message) => { client.emit("status-all-MCU", arrayMCU); });` code
    snippet is setting up an event listener on the client side for a specific event called "status-all".
    When this event is triggered, it executes a callback function that emits an event back to the client
    with the event name "status-all-MCU" and sends the `arrayMCU` data as the payload. Essentially, it
    allows the client to request and receive the status of all MCU devices by emitting the "status-all"
    event. */
    client.on("status-all", (message) => {
      client.emit("status-all-MCU", arrayMCU);
    });

    /* The `MQTT.publish({ topic: "WEBApp/", payload: "STATUS-ON" }, function () { console.log(`enviado!
    `); });` code snippet is publishing a message to the MQTT broker. */
    MQTT.publish({ topic: "WEBApp/", payload: "STATUS-ON" }, function () {
      console.log(`enviado! ${now}`);
    });

    /* The `client.on("action-PROCESS", ...)` function is listening for a specific event called
    "action-PROCESS" from the client side. When this event is triggered, it executes a callback function
    that performs the following actions: */
    client.on("action-PROCESS", (process, pressed) => {
      fillArrayProcess(process);
      sendToSocket(client, MQTT, process, pressed);
    });

    /* The `client.on("acction-DOM", ...)` function is listening for a specific event called
    "acction-DOM" from the client side. When this event is triggered, it executes a callback
    function that performs the following actions: */
    client.on("acction-DOM", (index, state) => {
      let result = getItems(selectionItem[index]);
      fillArrayProcess(index);
      io.emit("display-valve", result);
      let count = 0;
      let interval;
      interval = setInterval(() => {
        let condition = state ? "ON" : "OFF";
        result[count].state = condition;
        let message = {
          topic: result[count].topic,
          payload: result[count].id + "-" + condition,
        };
        MQTT.publish(message, function () {
          console.log(`enviado! ${now}`);
        });
        count++;
        if (count === result.length) {
          clearInterval(interval);
        }
      }, 3000);
    });

    /* The `client.on("range-valve", ...)` function is listening for a specific event called "range-valve"
    from the client side. When this event is triggered, it executes a callback function that performs
    the following actions: */
    client.on("range-valve", (index, range) => {
      let result = getItems([index]);
      let message = {
        topic: result[0].topic,
        payload: result[0].id + "-" + range,
      };
      MQTT.publish(message, function () {
        console.log(`enviado! ${now}`);
      });
    });

    /* The `client.on("test-valve", ...)` function is listening for a specific event called "test-valve"
    from the client side. When this event is triggered, it executes a callback function that publishes a
    message to the MQTT broker using the `MQTT.publish` method. The message being published is the
    `message` received from the client, and once the message is published, it logs a message "enviado!"
    along with the current timestamp using `console.log(`enviado! `);`. */
    client.on("test-valve", (message) => {
      MQTT.publish(message, function () {
        console.log(`enviado! ${now}`);
      });
    });

    /* The `client.on("verify-user", ...)` function is listening for a specific event called "verify-user"
    from the client side. When this event is triggered, it executes a callback function that performs
    the following actions: */
    client.on("verify-user", (message) => {
      db.find(
        { $and: [{ usuario: message["user"] }, { password: message["psw"] }] },
        function (err, record) {
          if (err) {
            console.error(err);
            io.emit("verify-user-error", { validate: undefined });
            process.exit(0);
          } else if (record.length > 0) {
            io.emit("verify-user", { validate: true });
          } else {
            io.emit("verify-user", { validate: false });
          }
        }
      );
    });

    /* The `client.on("delete-user", ...)` function is listening for a specific event called
    "delete-user" from the client side. When this event is triggered, it executes a callback
    function that removes a user record from the database based on the provided `id`. */
    client.on("delete-user", (id) => {
      db.remove({ _id: id }, {}, function (err, record) {
        if (err) {
          console.error(err);
          process.exit(0);
        }
      }
      );
    });

    /* The `client.on("save-user", ...)` function is listening for a specific event called "save-user" from
    the client side. When this event is triggered, it executes a callback function that inserts a new
    user data record into the database using the `db.insert` method. The `newdata` parameter contains
    the data of the new user to be saved. If there is an error during the insertion process, it will log
    the error, exit the process, and not save the user data. */
    client.on("save-user", (newdata) => {
      db.insert(newdata, (err, record) => {
        if (err) {
          console.error(err);
          process.exit(0);
        }
      });
    });

    /* The `client.on("update-user", ...)` function is listening for a specific event called "update-user"
    from the client side. When this event is triggered, it executes a callback function that updates a
    user record in the database based on the provided `_id`. */
    client.on("update-user", (newdata) => {
      console.log(newdata)
      const { usuario, password, _id } = newdata;
      db.update({ _id }, { usuario, password }, {}, (err, record) => {
        if (err) {
          console.error(err);
          process.exit(0);
        }
      });
    });

    /* The `client.on("all-users", ...)` function is listening for a specific event called "all-users" from
    the client side. When this event is triggered, it executes a callback function that performs the
    following actions: */
    client.on("all-users", (message) => {
      db.find({}, (err, users) => {
        if (err) {
          console.error(err);
          io.emit("all-users-error", { validate: false });
          process.exit(0);
        } else {
          io.emit("all-users", users);
        }
      });
    });

    /* The `client.on("disconnect", ...)` function is listening for the event of a client disconnecting
    from the server. When this event is triggered (i.e., when a client disconnects), it executes a
    callback function that logs a message "webapp desconectada" to the console. Additionally, it
    publishes a message to the MQTT broker with the topic "WEBApp/" and payload "STATUS-OFF". This
    message indicates that the web application is now offline or disconnected. The
    `console.log(`enviado! `);` statement logs the timestamp of when the message was sent to the
    MQTT broker. */
    client.on("disconnect", () => {
      console.log("webapp desconectada");
      MQTT.publish({ topic: "WEBApp/", payload: "STATUS-OFF" }, function () {
        console.log(`enviado! ${now}`);
      });
    });
  });
};
