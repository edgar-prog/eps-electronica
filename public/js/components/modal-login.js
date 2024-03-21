class userLogin extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.hideForm = false;
    this.socket = null;
  }

  /**
   * The connectedCallback function in JavaScript renders the component and adds event listeners when the
   * component is connected to the DOM.
   */
  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  /**
   * The function `addEventListeners` listens for form submission, validates user input, and handles
   * verification response accordingly.
   */
  addEventListeners() {
    const form = this.shadowRoot.querySelector("#verification-form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const username = this.shadowRoot.querySelector("#username").value;
      const password = this.shadowRoot.querySelector("#password").value;
      const verification = await this.emitAndWaitForResponse({
        user: username,
        psw: password,
      });
      if (verification) {
        this.hideForm = true;
        this.render();
        localStorage.setItem("username", username);
      } else {
        const failMessage = this.shadowRoot.querySelector("#fail-message");
        failMessage.classList.remove("hidden");
        setTimeout(() => {
          failMessage.classList.add("hidden");
        }, 3000);
      }
    });
  }


  /**
   * The function "connect" sets the socket property of an object to the provided socket parameter.
   * @param socket - The `socket` parameter in the `set connect(socket)` function is typically a
   * reference to a socket object that is used for communication over a network, such as a TCP socket or
   * a WebSocket.
   */
  set connect(socket) {
    this.socket = socket;
  }

  /**
   * The `hide` function sets the `hideForm` property to true and then re-renders the component.
   */
  hide() {
    this.hideForm = true;
    this.render();
  }

  /**
   * The `show` function displays a form, renders it, and adds event listeners.
   */
  show() {
    this.hideForm = false;
    this.render();
    this.addEventListeners();
  }

  /**
   * The function `emitAndWaitForResponse` sends an event to a socket server and waits for a response,
   * resolving with the validation result or rejecting with an error.
   * @param eventData - It seems like you were about to provide some information about the `eventData`
   * parameter in the `emitAndWaitForResponse` function. Could you please provide more details or clarify
   * what specific information you need regarding the `eventData` parameter?
   * @returns The `emitAndWaitForResponse` function returns a Promise.
   */
  emitAndWaitForResponse(eventData) {
    return new Promise((resolve, reject) => {
      this.socket.emit("verify-user", eventData);

      this.socket.on("verify-user", (response) => {
        resolve(response.validate);
      });

      this.socket.on("verify-user-error", (error) => {
        reject(error);
      });
    });
  }

  templateCSS() {
    return `<style>
        .hidden {
            display: none;
        }

        #container {
            position: fixed;
            z-index: 7;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: #474e5d;
        }

        #verification-form {
            width: 30%;
            height: 50%;
            background-color: #ccc;
            padding: 0 20px;
            border: 2px solid #000;
            border-radius: 5px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        #fail-message {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 5px;
          border-radius: 5px;
          text-align: center;
          font-weight: 700;
          color: #EBEBEB;
          background-color: #ED0707;
        }

        label {
            padding: 12px 12px 12px 0;
            display: inline-block;
            color: #8b8a8a;
        }
        
        input[type=text],
        input[type="password"] {
            width: 100%;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
            resize: vertical;
        }
        
        input[type=text]:focus,
        input[type=password]:focus {
            background-color: #ddd;
            outline: none;
        }

        button {
            width: 100%;
            background-color: #3498DB;
            color: #fff;
            font-weight: 700;
            margin-top: 20px;
            padding: 12px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        .success-message {
          color: #ccc;
          font-size: 1em;
        }

      @media screen and (max-width: 425px) {
        #verification-form {
          width: 70%;
          height: 60%;
        }
      }
    </style>`;
  }

  templateHTML() {
    return `<div id="container" class="${this.hideForm ? "hidden" : ""}">
        <form id="verification-form" >
            <h2>Acceso</h2>
            <label for="username">Usuario</label>
            <input type="text" id="username" placeholder="nombre usuario" required>
            <label for="password">Contraseña</label>
            <input type="password" id="password" placeholder="ingrese contraseña"required>
            <button type="submit">ACEPTAR</button>
            <div id="fail-message" class="${this.hideForm ? "" : "hidden"}">
              <p>Usuario o password incorrectos</p>
            </div>            
        </form>
  </div>`;
  }

  render() {
    this.shadowRoot.innerHTML = `${this.templateCSS()} ${this.templateHTML()}`;
  }
}

customElements.define("modal-login", userLogin);
