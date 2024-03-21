class userConfig extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.hideForm = true;
    this.socket = null;
    this.render();
    this.ESP_CRT = null;
    this.exitBtn = null;
    this.selectValve = null;
    this.motorizedValve = null;
    this.statusMCUarray = [];
  }

  /**
   * The connectedCallback function adds event listeners to the component.
   */
  connectedCallback() {
    this.addEventListeners();
  }

  /**
   * The addEventListeners function sets up event listeners for checkboxes and an exit button, and
   * updates the checkboxes based on the status of each MCU.
   */
  async addEventListeners() {
    this.ESP_CRT = this.shadowRoot.querySelectorAll('input[type="checkbox"]');
    this.exitBtn = this.shadowRoot.getElementById("exit-btn");
    this.selectValve = this.shadowRoot.getElementById('valves');
    this.motorizedValve = this.shadowRoot.querySelector('slider-element');
    let topic = null;
    let payload = null;

    this.selectValve.addEventListener("change", (event) => {
      topic = this.selectValve.options[this.selectValve.selectedIndex].value;
      payload = this.selectValve.options[this.selectValve.selectedIndex].text;
    });

    this.motorizedValve.addEventListener("activateValvule", (event) => {
      const TOOGLE_DISABLE = !event.detail.disableValvule;
      if (topic) {
        let statusValve = TOOGLE_DISABLE ? "ON" : "OFF";
        this.socket.emit("test-valve", { topic: topic, payload: payload + '-' + statusValve });
      }
    });

    this.motorizedValve.addEventListener("pressValvule", (event) => {
      if (topic) {
        const VALUE = event.detail.valueValvule;
        this.socket.emit("test-valve", { topic: topic, payload: payload + '-' + VALUE });
      }
    });

    this.statusMCUarray = await this.listAllMCU();
    let index = 0;
    /* The code block is iterating over each checkbox element in the `this.ESP_CRT` array. It checks the
    status of each MCU (Microcontroller Unit) in the `statusMCUarray` and sets the `checked` property of
    the corresponding checkbox based on the status. If the status is "ON", the checkbox is checked,
    otherwise, it is unchecked. The `index` variable is used to keep track of the current MCU status in
    the `statusMCUarray`. */
    this.ESP_CRT.forEach((checkbox) => {
      if (this.statusMCUarray[index].status == "ON") {
        checkbox.checked = true;
      }
      else {
        checkbox.checked = false;
      }
      index++;
    });


    /* The code block is adding event listeners to each checkbox element in the `this.ESP_CRT` array. When
    a checkbox's state changes (checked or unchecked), the event listener function is triggered. */
    for (let element of this.ESP_CRT) {
      element.addEventListener("change", (event) => {
        if (this.socket !== null) {
          let change = event.target.checked ? "ON" : "OFF";
          this.socket.emit("conections-all", { id: event.target.id, status: change });
        }
      });
    }

    this.exitBtn.addEventListener("click", this.exitConfig.bind(this));
  }

  /**
   * The function `listAllMCU` returns a promise that resolves with the response from the socket server
   * when it receives the "status-all-MCU" event.
   * @returns a Promise.
   */
  listAllMCU() {
    return new Promise((resolve, reject) => {
      if (this.socket !== null) {
        this.socket.emit("status-all", "send");
        this.socket.on("status-all-MCU", (response) => {
          resolve(response);
        });
      }
    });
  }

  /**
   * The exitConfig function hides the current configuration.
   */
  exitConfig() {
    this.hide();
  }

  /**
   * The function sets the value of the "socket" property to the provided socket value.
   * @param socket - The "socket" parameter is a reference to a socket object. A socket is an endpoint
   * for sending or receiving data across a computer network. It allows communication between two
   * different processes on the same or different machines.
   */
  set connect(socket) {
    this.socket = socket;
  }

  /**
   * The "hide" function sets the "hideForm" property to true and then calls the "render" function.
   */
  hide() {
    this.hideForm = true;
    this.render();
  }

  /**
   * The "show" function displays a form, renders it, and adds event listeners.
   */
  show() {
    this.hideForm = false;
    this.render();
    this.addEventListeners();
  }

  templateCSS() {
    return `<style>
    .hidden {
      display: none;
    }

    #container {
      position: fixed;
      z-index: 110;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      overflow: auto;
      background-color: #474e5d;
    }

    #container-form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 25%;
      height: 35%;
      margin-top: 20%;
      margin-left: auto;
      margin-right: auto;
      padding: 20px;
      background-color: #F2F4F4;
    }

    #option {
      padding-left: 20px;
      margin-bottom: 10px;
      cursor: pointer;
      font-size: 22px;
      user-select: none;
    }

    #test {
      width: 75%;
      padding: 20px 0;
      margin-left: auto;
      margin-right: auto;
    }

    #valves {
      margin: 10px;
    }

    button {
      width: 100%;
      padding: 5px 0px;
      font-size: 14px;
      cursor: pointer;
      background-color: #52D156;
      color: white;
      border: none;
      border-radius: 4px;
    }

    #exit-btn {
      background-color: #f44336;
    }
      
    @media screen and (max-width: 425px) {
      #container-form  {
        margin-top: 25%;
        width: 75%;
        height: 50%;
      }
 
    }
    </style>`;
  }

  templateHTML() {
    return `<div id="container" class="${this.hideForm ? "hidden" : ""}">
      <div id="container-form">
        <label id="option">ESP-CRT1
          <input type="checkbox" id="ESP-CRT1">
          <span class="checkmark"></span>
        </label>
        <label id="option">ESP-CRT2
          <input type="checkbox" id="ESP-CRT2">
          <span class="checkmark"></span>
        </label>
        <label id="option">ESP-CRT3
          <input type="checkbox" id="ESP-CRT3">
          <span class="checkmark"></span>
        </label>
        <label id="option">ESP-CRT4
          <input type="checkbox" id="ESP-CRT4">
          <span class="checkmark"></span>
        </label>
        <div id="test">
          <span class="button-span">Test de señal 4-20mA</span>
          <select id="valves" name="valvulas">
            <option value="V00">   </option>
            <option value="ESP-CRT1/">V11</option>
            <option value="ESP-CRT2/">V12</option>
            <option value="ESP-CRT1/">V14</option>
            <option value="ESP-CRT4/">V17</option>
            <option value="ESP-CRT1/">V22</option>
            <option value="ESP-CRT2/">V21</option>
            <option value="ESP-CRT4/">VR1</option>
            <option value="ESP-CRT3/">VR2</option>
            <option value="ESP-CRT3/">VR3</option>
          </select>
          <slider-element src="img/llave.svg" title="ACTIVAR" id="TEST"></slider-element>
        </div>
        <button id="exit-btn">Salir</button>
      </div>
    </div>`;
  }

  render() {
    this.shadowRoot.innerHTML = `${this.templateCSS()} ${this.templateHTML()}`;
  }
}

customElements.define("modal-config", userConfig);