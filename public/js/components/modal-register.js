class userRegister extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.hideForm = true;
    this.socket = null;
    this.render();
    this.addBtn = null;
    this.exitBtn = null;
    this.tableBody = null;
    this.updateNameInput = null;
    this.updatePassInput = null;
    this.updateBtn = null;
    this.cancelBtn = null;
    this.currentUser = null;
  }

  /**
   * The connectedCallback function adds event listeners when the element is connected to the DOM.
   */
  connectedCallback() {
    this.addEventListeners();
  }

  /**
   * The `disconnectedCallback` function removes event listeners for the "add" and "exit" buttons.
   */
  disconnectedCallback() {
    this.addBtn.removeEventListener("click", this.addUser.bind(this));
    this.exitBtn.removeEventListener("click", this.exitUser.bind(this));
  }

  /**
   * The function `addEventListeners()` adds event listeners to various elements in the HTML document.
   */
  addEventListeners() {
    this.addBtn = this.shadowRoot.getElementById("add-btn");
    this.exitBtn = this.shadowRoot.getElementById("exit-btn");
    this.tableBody = this.shadowRoot.getElementById("table-body");
    this.updateNameInput = this.shadowRoot.getElementById("update-name-input");
    this.updatePassInput = this.shadowRoot.getElementById("update-pass-input");
    this.updateBtn = this.shadowRoot.getElementById("update-btn");
    this.cancelBtn = this.shadowRoot.getElementById("cancel-btn");

    this.addBtn.addEventListener("click", this.addUser.bind(this));
    this.exitBtn.addEventListener("click", this.exitUser.bind(this));
  }

  exitUser() {
    this.hide();
  }

  /**
   * The function `addUser()` adds a user to a table if a username and password are provided, otherwise
   * it displays a failure message.
   */
  addUser() {
    let username = this.shadowRoot.querySelector("#name-input").value;
    let password = this.shadowRoot.querySelector("#pass-input").value;
    if ((username) && (password)) {
      const user = {
        usuario: username,
        password: password,
      };
      this.socket.emit("save-user", (user))
      this.shadowRoot.querySelector("#name-input").value = "";
      this.shadowRoot.querySelector("#pass-input").value = "";
      this.renderTable();
    }
    else {
      const failMessage = this.shadowRoot.querySelector("#fail-message");
      failMessage.classList.remove("hidden");
      setTimeout(() => {
        failMessage.classList.add("hidden");
      }, 3000);
    }
  }

  /**
   * The function `listAllUser` returns a promise that sends a request to the server to get a list of all
   * users and resolves with the response or rejects with an error.
   * @returns a Promise.
   */
  listAllUser() {
    return new Promise((resolve, reject) => {
      if (this.socket !== null) {
        this.socket.emit("all-users", "send");
        this.socket.on("all-users", (response) => {
          resolve(response);
        });
        this.socket.on("all-users-error", (error) => {
          reject(error);
        });
      }
    });
  }

  /**
   * The function `renderTable` asynchronously renders a table with user data, including buttons for
   * editing and deleting each user.
   */
  async renderTable() {
    this.tableBody.innerHTML = "";
    let listUsers = null;
    listUsers = await this.listAllUser();
    let id = 1;
    listUsers.forEach((user) => {
      const tr = document.createElement("tr");
      const idTd = document.createElement("td");
      const nameTd = document.createElement("td");
      const actionsTd = document.createElement("td");
      const editBtn = document.createElement("button");
      editBtn.className = "edit-btn";
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      idTd.innerText = id++;
      nameTd.innerText = user.usuario;
      editBtn.innerText = "Edit";
      deleteBtn.innerText = "Delete";
      editBtn.addEventListener("click", () => {
        this.showUpdateForm(user);
      });
      deleteBtn.addEventListener("click", () => {
        this.deleteUser(user._id);
      });
      actionsTd.appendChild(editBtn);
      actionsTd.appendChild(deleteBtn);
      tr.appendChild(idTd);
      tr.appendChild(nameTd);
      tr.appendChild(actionsTd);
      this.tableBody.appendChild(tr);
    });
  }

  /**
   * The function `showUpdateForm` displays a form with the current user's information for updating.
   * @param user - The `user` parameter is an object that represents the current user. It likely has
   * properties such as `usuario` (username) and `password` (password).
   */
  showUpdateForm(user) {
    this.currentUser = user;
    if (this.currentUser) {
      this.updateNameInput.value = this.currentUser.usuario;
      this.updatePassInput.value = this.currentUser.password;
      this.updateBtn.addEventListener("click", this.updateUser.bind(this));
      this.cancelBtn.addEventListener("click", this.hideUpdateForm.bind(this));
      this.updateBtn.style.display = "inline-block";
      this.cancelBtn.style.display = "inline-block";
      this.updateNameInput.style.display = "inline-block";
      this.updatePassInput.style.display = "inline-block";
      this.shadowRoot.getElementById("update-container").style.display = "block";
    }
  }

  /**
   * The updateUser function updates the current user's username and password, emits an event to update
   * the user on the server, hides the update form, and renders the table.
   */
  updateUser() {
    this.currentUser.usuario = this.updateNameInput.value;
    this.currentUser.password = this.updatePassInput.value;
    if (this.currentUser) {
      this.socket.emit("update-user", this.currentUser);
      this.hideUpdateForm();
      this.renderTable();
    }
  }

  /**
   * The deleteUser function emits a "delete-user" event with the given id, hides the update form, and
   * renders the table.
   * @param id - The id parameter is the unique identifier of the user that needs to be deleted.
   */
  deleteUser(id) {
    this.socket.emit("delete-user", id);
    this.hideUpdateForm();
    this.renderTable();
  }

  /**
   * The function hides the update form and resets its values.
   */
  hideUpdateForm() {
    this.updateNameInput.value = "";
    this.updatePassInput.value = "";
    this.currentUserId = null;
    this.updateBtn.removeEventListener("click", this.updateUser.bind(this));
    this.cancelBtn.removeEventListener("click", this.hideUpdateForm.bind(this));
    this.updateBtn.style.display = "none";
    this.cancelBtn.style.display = "none";
    this.updateNameInput.style.display = "none";
    this.updatePassInput.style.display = "none";
    this.shadowRoot.getElementById("update-container").style.display = "none";
  }

  /**
   * The function sets the value of the "socket" property to the provided socket value.
   * @param socket - The "socket" parameter is a reference to a socket object that is used for
   * communication between the client and the server. It allows the client and server to send and receive
   * data over a network connection.
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
      overflow: auto;
      background-color: #474e5d;
    }

    #container-form {
      width: 50%;
      height: 100%;
      margin-top: 10px;
      margin-left: auto; 
      margin-right: auto;
      background-color: #F2F4F4;
    }

    h1 {
      margin-top: 5px;
      text-align: center;
    }

    #input-container {
      width: 50%;
      margin-left: auto; 
      margin-right: auto;
      margin-bottom: 20px;
      margin-top: 20px;
    }

    #name-input,
    #pass-input,
    #update-name-input,
    #update-pass-input {
      width: 90%;
      padding: 10px;
      font-size: 16px;
      margin: 5px 5px;
      border-radius: 5px;
      border: 1px solid #ccc;
   }

    #name-input:focus,
    #pass-input:focus,
    #update-name-input:focus,
    #update-pass-input:focus {
      border-color: #66afe9;
      outline: 0;
      -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
    }

    button {
      width: 32%;
      padding: 5px 0px;
      margin: 0 5px;
      font-size: 14px;
      cursor: pointer;
      background-color: #52D156;
      color: white;
      border: none;
      border-radius: 4px;
    }
    
    button:hover {
      background-color: #3e8e41;
    }
    
    table {
      border-collapse: collapse;
      width: 75%;
      margin-left: auto; 
      margin-right: auto;
      margin-bottom: 20px;
    }

    th,
    td {
      padding: 5px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #4CAF50;
      color: white;
    }

    th:nth-child(2) {
      width: 50%;
    }

    #update-container {
      display: none;
      width: 50%;
      margin-left: auto; 
      margin-right: auto;
      margin-bottom: 20px;
      margin-top: 20px;
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

    #update-btn {
      background-color: #2196F3;
    }

    #exit-btn {
      background-color: #f44336;
    }
    
    #cancel-btn {
      background-color: #f44336;
    }
    
    .edit-btn{
      background-color: #ffc107;
    }
    
    .delete-btn{
      background-color: #dc3545;
      margin-left: 10px;
    }

    @media screen and (max-width: 425px) {
      #container-form  {
        width: 90%;
      }

      #input-container { 
        width: 100%;
      }

      #update-container {
        width: 100%;
      }

      #name-input,
      #pass-input,
      #update-name-input,
      #update-pass-input {
        width: 90%;
      }

      table {
        width: 100%;
        margin-bottom: 10px;
      }

      th:nth-child(2) {
        width: 35%;
      }
    }
    </style>`;
  }

  templateHTML() {
    return `<div id="container" class="${this.hideForm ? "hidden" : ""}">
    <div id="container-form">
    <h1>REGISTRO</h1>
    <div id="input-container">
      <input type="text" id="name-input" placeholder="nombre usuario">
      <input type="password" id="pass-input" placeholder="ingrese contraseña">
      <button id="add-btn">Agregar</button>
      <button id="exit-btn">Salir</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody id="table-body"></tbody>
    </table>
    <div id="fail-message" class="${this.hideForm ? "" : "hidden"}">
      <p>Usuario y password son requeridos</p>
    </div>  
    <div id="update-container">
      <input type="text" id="update-name-input">
      <input type="text" id="update-pass-input">
      <button id="update-btn">Actualizar</button>
      <button id="cancel-btn">Cancelar</button>
    </div>
  </div>
  </div>`;
  }

  render() {
    this.shadowRoot.innerHTML = `${this.templateCSS()} ${this.templateHTML()}`;
  }
}

customElements.define("modal-register", userRegister);