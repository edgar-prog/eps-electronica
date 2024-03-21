class modalWindow extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isVisible = false;
        this.message = this.getAttribute('message');
        this.icon = this.getAttribute('icon');
        this.color = this.getAttribute('color');
        this.render();
    }

    /**
     * The "show" function sets the "isVisible" property to true and calls the "render" function.
     */
    show() {
        this.isVisible = true;
        this.render();
    }

    /**
     * The "hide" function sets the "isVisible" property to false and then calls the "render" function.
     */
    hide() {
        this.isVisible = false;
        this.render();
    }

    /**
     * The render function sets the innerHTML of the shadowRoot element to a combination of CSS and HTML
     * templates.
     */
    render() {
        this.shadowRoot.innerHTML = `${this.templateCSS()} ${this.templateHTML()}`
    }

    templateCSS() {
        return `<style>
        :host {
          display: ${this.isVisible ? 'block' : 'none'};
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0);
          pointer-events: none;
          z-index: 6;
        }

        .modal-content {
          height: 25%;
          width: 25%;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border-radius: 5%;
          background-color: ${this.color};
          box-shadow: 0 10px 20px -4px #000;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        h3 {
            padding: 10px 0;
        }

        .modal-icon img {
            transform: scale(2);
        }

        @media screen and (max-width: 768px) {
            .modal-content { 
                height: 20%;
                width: 50%;
            }

            h3 {
                font-size: 0.75em;
            }
        }

        @media screen and (max-width: 320px) {
            .modal-content { 
                height: 20%;
                width: 50%;
            }

            h3 {
                font-size: 0.75em;
            }
        }
      </style>`;
    }

    templateHTML() {
        return `<div class="modal-content">
        <!-- Contenido de la ventana modal -->
        <h3>${this.message}</h3>
        <div class="modal-icon"><img src="${this.icon}" ></div>
      </div>`;
    }
}

customElements.define('modal-alert', modalWindow);
