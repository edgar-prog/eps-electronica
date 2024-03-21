export default class controlTagDOM {
  constructor(
    nameElement,
    toogleElements,
    rangeElements,
    lightElements,
    sensorElements,
    btnElements,
    socket
  ) {
    this.client = socket;
    this.enablePurge = [];
    this.enableFlowAdjustment = [];
    this.enableTest = false;
    this.screen = document.querySelector(nameElement);
    this.toogleButtons = Array.from(document.querySelectorAll(toogleElements));
    this.motorizedValves = Array.from(document.querySelectorAll(rangeElements));
    this.lightSignal = Array.from(document.querySelectorAll(lightElements));
    this.lightSensor = Array.from(document.querySelectorAll(sensorElements));
    this.pressButtons = Array.from(document.querySelectorAll(btnElements));

    /* The code snippet is defining an event listener for the "process-on" event emitted by the
    `this.client` socket. When this event is triggered, the callback function is executed. */
    this.client.on("process-on", (message) => {
      if (message[0].state == "ON" && message[0].count == 1) {
        this.openValves(message);
      } else if (message[0].state == "OFF" && message[0].count == 0) {
        this.closeValves(message);
      }
    });

    /* The code snippet is defining an event listener for the "mcu-status" event emitted by the
    `this.client` socket. When this event is triggered, the callback function is executed. */
    this.client.on("mcu-status", (arrayMCU) => {
      let index = 0;
      for (let element of this.lightSignal) {
        element.status = arrayMCU[index].status;
        index++;
      }
    });

    /* The code snippet is defining an event listener for the "sensor-status" event emitted by the
    `this.client` socket. When this event is triggered, the callback function is executed. */
    this.client.on("sensor-status", (arraySensor) => {
      let index = 0;
      for (let element of this.lightSensor) {
        element.status = arraySensor[index].status;
        index++;
      }
    });
  }

  /**
   * The function `setDisableElement` is used to toggle the disabled state of an element identified by
   * its name.
   * @param name - The name parameter is the identifier of the element that you want to disable or
   * enable.
   * @param disable - The `disable` parameter is a boolean value that determines whether the element
   * should be disabled or not. If `disable` is `true`, the element will be disabled. If `disable` is
   * `false`, the element will be enabled.
   */
  setDisableElement(name, disable) {
    const index = this.toogleButtons.find((element) => element.id === name);
    index.isDisabled = disable;
  }

  /**
   * The `waitElements` function returns a promise that resolves when the "display-valve" event is
   * emitted by the client.
   * @returns The `waitElements()` function is returning a Promise.
   */
  waitElements() {
    return new Promise((resolve) => {
      this.client.on("display-valve", (menssage) => {
        resolve(menssage);
      });
    });
  }

  /**
   * The `openValves` function asynchronously opens a series of valves by adding them to the screen and
   * waiting for 3 seconds between each valve.
   * @param arrayValves - An array containing the indexes of the valves to be opened.
   */
  async openValves(arrayValves) {
    for (let index of arrayValves) {
      this.screen.addValve(index);
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }

  /**
   * The `closeValves` function asynchronously closes a set of valves by deleting them from the screen
   * and waiting for 3 seconds between each deletion.
   * @param arrayValves - The parameter `arrayValves` is an array of valve objects. Each valve object in
   * the array has an `id` property that represents the unique identifier of the valve.
   */
  async closeValves(arrayValves) {
    for (let index of arrayValves) {
      this.screen.deleteValve(index.id);
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }

  /* The above code is adding event listeners to a set of buttons. When a button is pressed, the code
  checks the ID of the button and performs different actions based on the ID. */
  addEventListenerToogle() {


    /* The above code is a JavaScript code snippet that contains a for loop. It iterates over the elements
    in the `pressButtons` array and adds an event listener to each element. */
    for (let element of this.pressButtons) {
      element.addEventListener("pressButton", async (e) => {
        const ID_BTN = e.detail.id;
        const ID_BTN_PRESSED = e.detail.pressed;

        if (ID_BTN === "PURGA" && this.enablePurge.length > 1) {
          this.client.emit("action-PROCESS", ID_BTN, ID_BTN_PRESSED);
          this.enableFlowAdjustment.push({ id: "purge", status: true });
        } else if (ID_BTN === "AJUSTE" && this.enableFlowAdjustment.length > 1) {
          this.client.emit("action-PROCESS", ID_BTN, ID_BTN_PRESSED);
          this.enableTest = true;
        } else if (ID_BTN === "ENSAYO" && this.enableTest) {
          this.client.emit("action-PROCESS", ID_BTN, ID_BTN_PRESSED);
        } else if (ID_BTN === "LLENAR") {
          this.client.emit("action-PROCESS", ID_BTN, ID_BTN_PRESSED);
        } else if (ID_BTN === "VACIAR") {
          this.client.emit("acction-DOM", ID_BTN, ID_BTN_PRESSED);
          const valve = await this.waitElements();
          if (ID_BTN_PRESSED) {
            this.openValves(valve);
          } else {
            this.closeValves(valve);
          }
        } else if (ID_BTN === "TEST") {
          this.client.emit("acction-DOM", ID_BTN, ID_BTN_PRESSED);
          const valve = await this.waitElements();
          if (ID_BTN_PRESSED) {
            this.enableFlowAdjustment.push({ id: "test", status: true });
            this.openValves(valve);
          } else {
            this.enableFlowAdjustment = this.enableFlowAdjustment.filter(
              (obj) => !(obj.id === "test")
            );
            this.closeValves(valve);
          }
        }
      });
    }

    /* The above code is a JavaScript code snippet. It is using a for...of loop to iterate over the
    elements in the `motorizedValves` array. For each element, it adds an event listener for the
    "activateValvule" event. When this event is triggered, the code inside the event listener is
    executed. */
    for (let element of this.motorizedValves) {
      element.addEventListener("activateValvule", async (e) => {
        const TOOGLE_DISABLE = !e.detail.disableValvule;
        const ID_RANGE = e.target.id;
        this.client.emit("acction-DOM", ID_RANGE, TOOGLE_DISABLE);
        const valve = await this.waitElements();
        if (TOOGLE_DISABLE) {
          this.openValves(valve);
        } else {
          this.closeValves(valve);
        }
      });

      /* The above code is adding an event listener to an element. When the "pressValvule" event is triggered
      on that element, the code inside the event listener function will be executed. It retrieves the
      value of the "valueValvule" property from the event's detail object and assigns it to the constant
      variable "VALUE". It also retrieves the id of the target element and assigns it to the constant
      variable "ID_RANGE_VALUE". Finally, it emits a "range-valve" event using a client object, passing
      the "ID_RANGE_VALUE" and "VALUE" as arguments. */
      element.addEventListener("pressValvule", (e) => {
        const VALUE = e.detail.valueValvule;
        const ID_RANGE_VALUE = e.target.id;
        this.client.emit("range-valve", ID_RANGE_VALUE, VALUE);
      });
    }

    for (let element of this.toogleButtons) {
      element.addEventListener("toogleEvent", async (event) => {
        const TOOGLE_STATE = event.detail.state;
        const ID_TOOGLE = event.target.id;

        if (ID_TOOGLE == "LITROS10") {
          this.client.emit("acction-DOM", ID_TOOGLE, TOOGLE_STATE);
          const capacity = await this.waitElements();
          if (TOOGLE_STATE) {
            this.enableFlowAdjustment.push({ id: "capacity", status: true });
            this.setDisableElement("LITROS100", true);
            this.openValves(capacity);
          } else {
            this.enableFlowAdjustment = this.enableFlowAdjustment.filter(
              (obj) => !(obj.id === "capacity")
            );
            console.log(this.enableFlowAdjustment);
            this.setDisableElement("LITROS100", false);
            this.closeValves(capacity);
          }
        }

        if (ID_TOOGLE == "LITROS100") {
          this.client.emit("acction-DOM", ID_TOOGLE, TOOGLE_STATE);
          const capacity = await this.waitElements();
          if (TOOGLE_STATE) {
            this.enableFlowAdjustment.push({ id: "capacity", status: true });
            this.setDisableElement("LITROS10", true);
            this.openValves(capacity);
          } else {
            this.enableFlowAdjustment = this.enableFlowAdjustment.filter(
              (obj) => !(obj.id === "capacity")
            );
            this.setDisableElement("LITROS10", false);
            this.closeValves(capacity);
          }
        }

        if (ID_TOOGLE == "LINEA1") {
          this.client.emit("acction-DOM", ID_TOOGLE, TOOGLE_STATE);
          const line = await this.waitElements();
          if (TOOGLE_STATE) {
            this.enablePurge.push({ id: "line", status: true });
            this.setDisableElement("AMBAS", true);
            this.openValves(line);
          } else {
            this.enablePurge = this.enablePurge.filter(
              (obj) => !(obj.id === "line")
            );
            this.setDisableElement("AMBAS", false);
            this.closeValves(line);
          }
        }

        if (ID_TOOGLE == "LINEA2") {
          this.client.emit("acction-DOM", ID_TOOGLE, TOOGLE_STATE);
          const line = await this.waitElements();
          if (TOOGLE_STATE) {
            this.enablePurge.push({ id: "line", status: true });
            this.setDisableElement("AMBAS", true);
            this.openValves(line);
          } else {
            this.enablePurge = this.enablePurge.filter(
              (obj) => !(obj.id === "line")
            );
            this.setDisableElement("AMBAS", false);
            this.closeValves(line);
          }
        }

        if (ID_TOOGLE == "AMBAS") {
          this.client.emit("acction-DOM", ID_TOOGLE, TOOGLE_STATE);
          const line = await this.waitElements();
          if (TOOGLE_STATE) {
            this.enablePurge.push({ id: "line", status: true });
            this.setDisableElement("LINEA1", true);
            this.setDisableElement("LINEA2", true);
            this.openValves(line);
          } else {
            this.enablePurge = this.enablePurge.filter(
              (obj) => !(obj.id === "line")
            );
            this.setDisableElement("LINEA1", false);
            this.setDisableElement("LINEA2", false);
            this.closeValves(line);
          }
        }

        if (ID_TOOGLE == "BOMBA") {
          this.client.emit("acction-DOM", ID_TOOGLE, false);
          if (TOOGLE_STATE) {
            this.enablePurge.push({ id: "flow", status: true });
            this.setDisableElement("TANQUE", true);
          } else {
            this.enablePurge = this.enablePurge.filter(
              (obj) => !(obj.id === "flow")
            );
            this.setDisableElement("TANQUE", false);
          }
        }

        if (ID_TOOGLE == "TANQUE") {
          this.client.emit("acction-DOM", ID_TOOGLE, TOOGLE_STATE);
          const waterTank = await this.waitElements();
          if (TOOGLE_STATE) {
            this.enablePurge.push({ id: "flow", status: true });
            this.setDisableElement("BOMBA", true);
            this.openValves(waterTank);
          } else {
            this.enablePurge = this.enablePurge.filter(
              (obj) => !(obj.id === "flow")
            );
            this.setDisableElement("BOMBA", false);
            this.closeValves(waterTank);
          }
        }

        if (ID_TOOGLE == "V7" || ID_TOOGLE == "V6" || ID_TOOGLE == "V5" || ID_TOOGLE == "V18") {
          this.client.emit("acction-DOM", ID_TOOGLE, TOOGLE_STATE);
          const flow = await this.waitElements();
          if (TOOGLE_STATE) {
            this.openValves(flow);
          } else {
            this.closeValves(flow);
          }
        }
      });
    }
  }
}
