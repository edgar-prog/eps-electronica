

class liSidebar extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    /**
     * The above function returns an array of attributes that should be observed for changes in a custom
     * element.
     * @returns An array containing the attribute names 'color', 'src', and 'size' is being returned.
     */
    static get observedAttributes() {
        return ['color', 'src', 'size'];
    }

    /**
     * The function `attributeChangedCallback` updates the corresponding property value based on the
     * attribute name and new value.
     * @param name - The name of the attribute that was changed.
     * @param oldValue - The previous value of the attribute before it was changed.
     * @param newValue - newValue is the new value of the attribute that has been changed.
     */
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'color':
                this.color = newValue;
                break;
            case 'src':
                this.source = newValue;
                break;
            case 'size':
                this.size = newValue;
                break;
        }
    }

    /**
     * The connectedCallback function calls the render function.
     */
    connectedCallback() {
        this.render()
    }

    /**
     * The `render` function sets the innerHTML of the shadow DOM to a combination of the CSS and HTML
     * templates.
     */
    render() {
        this.shadow.innerHTML = `${this.templateCSS()} ${this.templateHTML()}`
    }

    templateHTML() {
        return `
        <li style="--selection-color: ${this.color}">
            <a href="#">
               <div class="icon">
                    <img src="${this.source}">
                </div>
                <div class="texto"> ${this.innerHTML}</div>
             </a>
        </li>`
    }

    templateCSS() {
        return `
        <style>
        li {
            list-style: none;
            position: relative;
            text-transform: uppercase;
            font-weight: 500;
        }

        li a {
            white-space: nowrap;
            text-decoration: none;
            display: flex;
            align-items: center;
            transition: 0.5s;
        }

        li a .icon {
            margin-right: 25px;
            padding-left: 10px;
        }

        .icon img {
            height: ${this.size}px;
            width: auto;
        }

        li a .texto {
            line-height: 60px;
            white-space: nowrap;
        }

        li a .texto:hover {
            color: var(--selection-color);
            transition: 0.75s;
        }
         </style>`
    }
}

window.customElements.define("li-element", liSidebar)