//const socket = require("../socket");

/* The above code is declaring an array called `listValve` which contains objects representing valves.
Each valve object has properties such as position (`pos`), ID (`id`), topic, state, and count. The
code initializes all the valves with the state "OFF" and count 0. */
let listValve = [
  {
    pos: { x: 876, y: 175 },
    id: "V1",
    topic: "ESP-CRT4/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 820, y: 132 },
    id: "V2",
    topic: "ESP-CRT3/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 743, y: 75 },
    id: "V3",
    topic: "ESP-CRT4/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 784, y: 75 },
    id: "V4",
    topic: "ESP-CRT3/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 572, y: 170 },
    id: "V5",
    topic: "ESP-CRT1/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 572, y: 134 },
    id: "V6",
    topic: "ESP-CRT4/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 572, y: 95 },
    id: "V7",
    topic: "ESP-CRT3/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 254, y: 281 },
    id: "PUMP",
    topic: "ESP-CRT3/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 425, y: 102 },
    id: "V9",
    topic: "ESP-CRT1/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 426, y: 158 },
    id: "V10",
    topic: "ESP-CRT2/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 65, y: 160 },
    id: "V11",
    topic: "ESP-CRT1/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 65, y: 100 },
    id: "V12",
    topic: "ESP-CRT2/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 65, y: 203 },
    id: "V13",
    topic: "ESP-CRT1/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 65, y: 277 },
    id: "V14",
    topic: "ESP-CRT1/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 205, y: 327 },
    id: "V16",
    topic: "ESP-CRT1/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 253, y: 240 },
    id: "V17",
    topic: "ESP-CRT4/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 277, y: 310 },
    id: "V18",
    topic: "ESP-CRT4/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 305, y: 130 },
    id: "V19",
    topic: "ESP-CRT2/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 162, y: 129 },
    id: "V20",
    topic: "ESP-CRT2/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 371, y: 79 },
    id: "V21",
    topic: "ESP-CRT2/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 371, y: 125 },
    id: "V22",
    topic: "ESP-CRT1/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 173, y: 205 },
    id: "V23",
    topic: "ESP-CRT2/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 481, y: 130 },
    id: "V24",
    topic: "ESP-CRT2/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 984, y: 280 },
    id: "V25",
    topic: "ESP-CRT4/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 535, y: 170 },
    id: "VR1",
    topic: "ESP-CRT4/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 535, y: 132 },
    id: "VR2",
    topic: "ESP-CRT3/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 535, y: 97 },
    id: "VR3",
    topic: "ESP-CRT3/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 623, y: 96 },
    id: "V10L",
    topic: "ESP-CRT3/",
    state: "OFF",
    count: 0,
  },
  {
    pos: { x: 623, y: 134 },
    id: "V100L",
    topic: "ESP-CRT4/",
    state: "OFF",
    count: 0,
  },
];

/* The above code is defining an object called `selectionItem` in JavaScript. This object contains
various properties, each representing a selection item. The values of these properties are arrays of
strings, where each string represents a specific item. */
const selectionItem = {
  LITROS10: ["V10L", "V4", "V2"],
  LITROS100: ["V100L", "V1"],
  LINEA1: ["V10"],
  LINEA2: ["V9"],
  AMBAS: ["V19", "V20", "V9"],
  BOMBA: ["PUMP"],
  TANQUE: ["V25"],
  V7: ["V7"],
  V6: ["V6"],
  V5: ["V5"],
  VR1: ["VR1"],
  VR2: ["VR2"],
  VR3: ["VR3"],
  V17: ["V17"],
  LLENAR: ["V25", "V16", "PUMP"],
  VACIAR: ["V25", "V16", "V23"],
  TEST: ["V24"],
  V18: ["V18"]
};

let arrayPurgue = [];
let arrayTest = [];
let arrayFlowAdjustment = [];
let arrayFill = [];

/**
 * The function `fillArrayProcess` fills different arrays based on the value of the `item` parameter.
 * @param item - The "item" parameter is a string that determines which actions to perform in the
 * function. The possible values for "item" are "LLENAR", "LITROS100", "LITROS10", "LINEA1", "LINEA2",
 * "AMBAS", "BOMBA"
 */
function fillArrayProcess(item) {
  arrayPurgue[0] = { order: "ON", id: "V23", time: 5000 };
  arrayPurgue[3] = { order: "DELAY", id: "V00", time: 30000 };
  arrayPurgue[11] = { order: "OFF", id: "V23", time: 5000 };
  if (item === "LLENAR") {
    arrayFill[0] = { order: "ON", id: "V25", time: 5000 };
    arrayFill[1] = { order: "ON", id: "V16", time: 5000 };
    arrayFill[2] = { order: "ON", id: "PUMP", time: 5000 };
    arrayFill[3] = { order: "OFF", id: "PUMP", time: 5000 };
    arrayFill[4] = { order: "OFF", id: "V16", time: 5000 };
    arrayFill[5] = { order: "OFF", id: "V25", time: 5000 };
  } else if (item === "LITROS100") {
    arrayTest[0] = { order: "OFF", id: "V1", time: 5000 };
    arrayTest[9] = { order: "ON", id: "V1", time: 5000 };
  } else if (item === "LITROS10") {
    arrayTest[0] = { order: "OFF", id: "V2", time: 5000 };
    arrayTest[9] = { order: "ON", id: "V2", time: 5000 };
  } else if (item === "LINEA1") {
    arrayPurgue[2] = { order: "100", id: "V22", time: 5000 };
    arrayPurgue[5] = { order: "50", id: "V11", time: 5000 };
    arrayPurgue[6] = { order: "0", id: "V22", time: 5000 };
    arrayPurgue[7] = { order: "100", id: "V11", time: 5000 };
    arrayPurgue[8] = { order: "0", id: "V11", time: 5000 };

    arrayFlowAdjustment[2] = { order: "100", id: "V11", time: 5000 };
    arrayFlowAdjustment[5] = { order: "0", id: "V11", time: 5000 };

    arrayTest[3] = { order: "100", id: "V11", time: 5000 };
    arrayTest[7] = { order: "0", id: "V11", time: 5000 };
  } else if (item === "LINEA2") {
    arrayPurgue[2] = { order: "100", id: "V21", time: 5000 };
    arrayPurgue[5] = { order: "50", id: "V12", time: 5000 };
    arrayPurgue[6] = { order: "0", id: "V21", time: 5000 };
    arrayPurgue[7] = { order: "100", id: "V12", time: 5000 };
    arrayPurgue[8] = { order: "0", id: "V12", time: 5000 };

    arrayFlowAdjustment[2] = { order: "100", id: "V12", time: 5000 };
    arrayFlowAdjustment[5] = { order: "0", id: "V12", time: 5000 };

    arrayTest[3] = { order: "100", id: "V12", time: 5000 };
    arrayTest[7] = { order: "0", id: "V12", time: 5000 };
  } else if (item === "AMBAS") {
    arrayPurgue[2] = { order: "100", id: "V21", time: 5000 };
    arrayPurgue[5] = { order: "50", id: "V11", time: 5000 };
    arrayPurgue[6] = { order: "0", id: "V21", time: 5000 };
    arrayPurgue[7] = { order: "100", id: "V11", time: 5000 };
    arrayPurgue[8] = { order: "0", id: "V11", time: 5000 };

    arrayFlowAdjustment[2] = { order: "100", id: "V11", time: 5000 };
    arrayFlowAdjustment[5] = { order: "0", id: "V11", time: 5000 };

    arrayTest[3] = { order: "100", id: "V11", time: 5000 };
    arrayTest[7] = { order: "0", id: "V11", time: 5000 };
  } else if (item === "BOMBA") {
    arrayPurgue[1] = { order: "ON", id: "PUMP", time: 5000 };
    arrayPurgue[4] = { order: "50", id: "V14", time: 5000 };
    arrayPurgue[9] = { order: "0", id: "V14", time: 5000 };
    arrayPurgue[10] = { order: "OFF", id: "PUMP", time: 5000 };

    arrayFlowAdjustment[0] = { order: "ON", id: "PUMP", time: 5000 };
    arrayFlowAdjustment[1] = { order: "100", id: "V14", time: 5000 };
    arrayFlowAdjustment[3] = { order: "OFF", id: "PUMP", time: 5000 };
    arrayFlowAdjustment[4] = { order: "0", id: "V14", time: 5000 };

    arrayTest[1] = { order: "ON", id: "PUMP", time: 5000 };
    arrayTest[5] = { order: "OFF", id: "PUMP", time: 5000 };
    arrayTest[2] = { order: "100", id: "V14", time: 5000 };
    arrayTest[8] = { order: "0", id: "V14", time: 5000 };
  } else if (item === "TANQUE") {
    arrayPurgue[1] = { order: "ON", id: "V16", time: 5000 };
    arrayPurgue[4] = { order: "ON", id: "V13", time: 5000 };
    arrayPurgue[9] = { order: "OFF", id: "V13", time: 5000 };
    arrayPurgue[10] = { order: "OFF", id: "V16", time: 5000 };

    arrayFlowAdjustment[0] = { order: "ON", id: "V16", time: 5000 };
    arrayFlowAdjustment[1] = { order: "ON", id: "V13", time: 5000 };
    arrayFlowAdjustment[3] = { order: "OFF", id: "V16", time: 5000 };
    arrayFlowAdjustment[4] = { order: "OFF", id: "V13", time: 5000 };

    arrayTest[1] = { order: "ON", id: "V16", time: 5000 };
    arrayTest[2] = { order: "ON", id: "V13", time: 5000 };
    arrayTest[5] = { order: "OFF", id: "V16", time: 5000 };
    arrayTest[8] = { order: "OFF", id: "V13", time: 5000 };
  } else if (item === "TEST") {
    arrayTest[4] = { order: "ON", id: "V24", time: 5000 };
    arrayTest[6] = { order: "OFF", id: "V24", time: 5000 };
  }
}

/**
 * The function "waitSensors" is an asynchronous function that waits for a message to be published by a
 * broker and resolves with the topic and payload of the received message.
 * @param broker - The "broker" parameter is an object that represents a message broker. It is used to
 * publish and subscribe to messages in a publish-subscribe messaging pattern.
 * @returns a promise that resolves to a string. The string is formed by concatenating the topic and
 * payload of a published packet received by the broker.
 */
async function waitSensors(broker) {
  return new Promise((resolve) => {
    broker.once("published", (packet, client) => {
      resolve(packet.topic + "-" + packet.payload.toString());
    });
  });
}

/**
 * The controlValve function updates the state and count of a valve based on the given order.
 * @param id - The id parameter is the identifier of the control valve. It is used to retrieve the
 * specific control valve from a list of items.
 * @param order - The `order` parameter is a string that represents the desired state of the control
 * valve. It can have three possible values: '50', '100', 'OFF' or 'ON'.
 */
function controlValve(id, order) {
  let valve = getItems([id]);
  if (order === "50" || order === "100" || order === "ON") {
    valve[0].state = "ON";
    valve[0].count += 1;
  } else {
    valve[0].state = "OFF";
    valve[0].count = 0;
  }
}

/**
 * The `mqttMessage` function takes an `id` and an `order` as parameters, retrieves the corresponding
 * valve item using the `getItems` function, and returns an object with the valve's topic, a payload
 * consisting of the `id` and `order` concatenated with a hyphen, and some additional properties for
 * quality of service and retention.
 * @param id - The `id` parameter is the identifier of the valve. It is used to retrieve the valve's
 * topic from the `getItems` function.
 * @param order - The `order` parameter is a value that represents the order being sent to the MQTT
 * topic.
 * @returns an object with the following properties:
 * - topic: The topic of the valve item retrieved from the getItems function.
 * - payload: A string concatenation of the id and order parameters.
 * - qos: The quality of service level, set to 0.
 * - retain: A boolean value indicating whether the message should be retained or not, set to false.
 */
function mqttMessage(id, order) {
  let valve = getItems([id]);
  return {
    topic: valve[0].topic,
    payload: id + "-" + order,
    qos: 0,
    retain: false,
  };
}

/* The above code is a JavaScript generator function called `loopArray`. It takes several parameters:
`socket`, `broker`, `START`, `END`, `arrayProcess`, and `HOLD_ON`. */
function* loopArray(socket, broker, START, END, arrayProcess, HOLD_ON) {
  for (let count = START; count < END; count++) {
    const { order, id, time } = arrayProcess[count];
    yield new Promise((resolve) => {
      setTimeout(async () => {
        if (order !== "DELAY") {
          if (HOLD_ON === "CAPACITIVO" && count === 5) {
            console.log(count, id);
            const sensor = await waitSensors(broker);
            console.log("Sensor capacitivo", sensor);
          } else if (HOLD_ON === "INDUCTIVO" && count === 3) {
            console.log(count, id);
            const sensor = await waitSensors(broker);
            console.log("Sensor de corriente", sensor);
          }
          let message = mqttMessage(id, order);
          broker.publish(message, function () {
            console.log("enviado!");
          });
          controlValve(id, order);
          socket.emit("process-on", getItems([id]));
        }
        resolve();
      }, time);
    });
  }
}

/**
 * The function `sendToSocket` sends data to a socket based on the specified process and conditions.
 * @param socket - The `socket` parameter is the socket object that represents the connection to a
 * server or another client. It is used to send data to the socket.
 * @param broker - The `broker` parameter is a variable that represents the broker object. It is used
 * to send messages or perform actions related to the broker.
 * @param process - The `process` parameter is a string that represents the type of process being
 * performed. It can have one of the following values: "PURGA", "AJUSTE", "ENSAYO", or "LLENAR".
 * @param pressed - The `pressed` parameter is a boolean value that indicates whether a button is
 * pressed or not. It is used to determine the range of values for the `MIN` and `MAX` variables in the
 * `sendToSocket` function.
 */
async function sendToSocket(socket, broker, process, pressed) {
  let arrayProcess = null;
  let MIN = 0;
  let MAX = 0;
  let HOLD_ON = "NONE";
  if (process === "PURGA") {
    arrayProcess = arrayPurgue;
    MIN = 0;
    MAX = arrayProcess.length;
  } else if (process === "AJUSTE") {
    arrayProcess = arrayFlowAdjustment;
    if (pressed === true) {
      MIN = 0;
      MAX = 3;
    } else {
      MIN = 3;
      MAX = arrayProcess.length;
    }
  } else if (process === "ENSAYO") {
    arrayProcess = arrayTest;
    if (pressed === true) {
      MAX = arrayProcess.length - 1;
      HOLD_ON = "CAPACITIVO";
    } else {
      MIN = arrayProcess.length - 1;
      MAX = arrayProcess.length;
    }
  } else if (process === "LLENAR") {
    arrayProcess = arrayFill;
    MIN = 0;
    MAX = arrayProcess.length;
    HOLD_ON = "INDUCTIVO";
  }

  const itemLoop = loopArray(socket, broker, MIN, MAX, arrayProcess, HOLD_ON);
  for await (const pause of itemLoop) {
    await pause;
  }
}

/**
 * The function "getItems" takes an array of items and returns an array of corresponding elements
 * found in the "listValve" array.
 * @param items - The parameter `items` is an array of values that represent the IDs of items.
 * @returns The function `getItems` returns an array of elements that match the given `items` array.
 */
function getItems(items) {
  const elements = [];
  for (let i = 0; i < items.length; i++) {
    const index = listValve.find((element) => element.id === items[i]);
    elements.push(index);
  }
  return elements;
}

/**
 * The function "changeStatusMCU" updates the status of an item in an array of MCU objects.
 * @param item - The `item` parameter is an object that represents the MCU (Marvel Cinematic Universe)
 * item that needs to have its status changed. It should have the following properties:
 * @returns the updated arrayMCU after changing the status of the specified item.
 */
function changeStatusMCU(item) {
  arrayMCU.forEach(objeto => {
    if (objeto.id === item.id) {
      objeto.status = item.status;
    }
  });
  return arrayMCU;
}

/* The above code is declaring an array called `arrayMCU` which contains objects representing MCU
(Microcontroller Unit) devices. Each object has two properties: `id` which represents the unique
identifier of the MCU device, and `status` which represents the current status of the device. The
initial status of all the devices in the array is set to "OFF". */
let arrayMCU = [
  { id: "ESP-CRT1", status: "OFF" },
  { id: "ESP-CRT2", status: "OFF" },
  { id: 'ESP-CRT3', status: 'OFF' },
  { id: "ESP-CRT4", status: "OFF" },
];

/* The above code is declaring an array called `sensorMCU` which contains objects representing
different sensors. Each sensor object has two properties: `id` and `status`. The `id` property
represents the unique identifier of the sensor, and the `status` property represents the current
status of the sensor, which can be either "ON" or "OFF". */
let sensorMCU = [
  { id: "10L", status: "OFF" },
  { id: "100L", status: "OFF" },
  { id: "LINE1", status: "OFF" },
  { id: "LINE2", status: "OFF" },
  { id: "TANQUE", status: "OFF" },
];

module.exports = {
  arrayMCU,
  sensorMCU,
  changeStatusMCU,
  selectionItem,
  getItems,
  fillArrayProcess,
  loopArray,
  sendToSocket,
};
