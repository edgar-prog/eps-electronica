class Lightbulb extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.color = '#B8E418';
        svg.setAttribute('width', '40');
        svg.setAttribute('height', '40');
        svg.innerHTML = `
        <style>
        .blink {
            animation: blink 1s infinite;
        }

        @keyframes blink {
            0% { fill: ${this.color}; filter: drop-shadow(0px 0px 5px #7EEC5383);}
            50% { fill: #2199098A; }
            100% { fill: ${this.color}; filter: drop-shadow(0px 0px 5px #2199094D); }
        }
        </style>
        <circle id="bulb" cx="20" cy="20" r="10" stroke="#000" stroke-width="2px"/>`;
        this.shadowRoot.appendChild(svg);
    }

    /**
     * The above function returns an array of attributes that the element should observe for changes.
     * @returns An array containing the string 'status' is being returned.
     */
    static get observedAttributes() {
        return ['status'];
    }

    /**
     * The function `attributeChangedCallback` checks if the attribute name is 'status' and if so, calls
     * the `setStatus` function with the new value.
     * @param name - The name of the attribute that was changed.
     * @param oldValue - The previous value of the attribute before it was changed.
     * @param newValue - The new value of the attribute that has been changed.
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'status') {
            this.setStatus(newValue);
        }
    }

    /**
     * The setStatus function changes the fill color and adds or removes a blink class to a bulb element
     * based on the status parameter.
     * @param status - The status parameter is a string that represents the current status of the bulb. It
     * can have two possible values: 'ON' or any other value (indicating the bulb is off).
     */
    setStatus(status) {
        const bulb = this.shadowRoot.querySelector('#bulb');

        if (status === 'ON') {
            bulb.setAttribute('fill', '${this.color}');
            bulb.classList.add('blink');
        } else {
            bulb.setAttribute('fill', '#000');
            bulb.classList.remove('blink');
        }
    }

    /**
     * The above function sets the status attribute of an element.
     * @param value - The value parameter is the new value that you want to set for the status attribute.
     */
    set status(value) {
        this.setAttribute('status', value);
    }

    /**
     * The function returns the value of the 'status' attribute.
     * @returns The `status` attribute value is being returned.
     */
    get status() {
        return this.getAttribute('status');
    }
}

customElements.define('light-element', Lightbulb);
