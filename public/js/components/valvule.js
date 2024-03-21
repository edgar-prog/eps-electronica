class valvuleItem extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.x = this.getAttribute('cx');
        this.y = this.getAttribute('cy');
        this.render()
    }

    /**
     * The `disconnectedCallback` function removes the element from the DOM when it is disconnected.
     */
    disconnectedCallback() {
        this.remove();
    }

    /**
     * The `render` function sets the inner HTML of an element with a combination of CSS and HTML
     * templates.
     */
    render() {
        this.shadow.innerHTML = `${this.templateCSS()} ${this.templateHTML()}`
    }

    templateCSS() {
        return `<style>
        #valvule {
            position: absolute;
            width: 100%;
            height: auto;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            z-index: 1;
        }
        </style>`
    }

    templateHTML() {
        return `
        <svg
            id="valvule"
            width="1050"
            height="360"
            viewBox="0 0 1050 360"
            version="1.1"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:svg="http://www.w3.org/2000/svg">

            <circle
                style="opacity:0.56;fill:#00ff00;fill-opacity:0.99;fill-rule:evenodd;stroke:#000000;stroke-width:0;stroke-dasharray:none;image-rendering:auto"
                id="valvule-on"
                r="15" 
                cx="${this.x}" 
                cy="${this.y}" />
        </svg>`
    }

}

window.customElements.define("valvule-element", valvuleItem)