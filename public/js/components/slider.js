class sliderItem extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this._src = this.getAttribute('src');
        this._title = this.getAttribute('title');
        this.render();
        this.slider = this.shadow.getElementById("myRange");
        this.output = this.shadow.getElementById("valueRange");
        this.check = this.shadow.getElementById("check");
        this.enbleCheck = false;
        this.slider.disabled = true;
    }

    /**
     * The `connectedCallback` function adds event listeners for input and change events to handle slider
     * and checkbox interactions.
     */
    connectedCallback() {
        this.slider.addEventListener("input", this.selectRange.bind(this));
        this.check.addEventListener("change", this.activateValvule.bind(this));
    }

    /**
     * The `disconnectedCallback` function removes event listeners for input and change events on specific
     * elements.
     */
    disconnectedCallback() {
        this.slider.removeEventListener('input', this.selectRange.bind(this));
        this.check.removeEventListener("change", this.activateValvule.bind(this));
    }

    /**
     * The `selectRange()` function updates the output display, calculates a value based on the slider
     * position, adjusts the thumb rotation, and dispatches a custom event with the slider value.
     */
    selectRange() {
        this.output.innerHTML = this.slider.value + '%';
        const value = Math.round((this.slider.value / 100) * 720);
        this.slider.style.setProperty("--thumb-rotate", `${value}deg`);

        this.dispatchEvent(new CustomEvent('pressValvule', {
            detail: { valueValvule: this.slider.value }
        }));
    }

    /**
     * The `activateValvule` function toggles the disabled state of a slider based on the checked state of
     * a checkbox and dispatches a custom event with the updated disabled status.
     */
    activateValvule() {
        this.slider.disabled = !this.check.checked;
        this.dispatchEvent(new CustomEvent('activateValvule', {
            detail: { disableValvule: this.slider.disabled }
        }));
    }

    /**
     * The function `disable` returns the checked status of a checkbox element.
     * @returns The `disable` property is being returned, which checks if the `check` element is checked.
     */
    get disable() {
        return this.check.checked
    }

    /**
     * The function `disable` sets the disabled state of a slider based on the value of a checkbox.
     * @param newValue - The `newValue` parameter is a boolean value that determines whether the `disable`
     * function should enable or disable the slider based on the value of the `check` property.
     */
    set disable(newValue) {
        this.check.checked = newValue;
        this.slider.disabled = !this.check.checked;
    }

    /**
     * The `render` function sets the inner HTML of the shadow DOM using a combination of CSS and HTML
     * templates.
     */
    render() {
        this.shadow.innerHTML = `${this.templateCSS()} ${this.templateHTML()}`
    }

    templateCSS() {
        return `<style>
        .slider-container {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
        }

        #valueRange {
            padding: 2px;
            background: #fff;
            font-weight: 600;
            width: 45px;
         }

        .check {
            padding-right: 20px;
        }

        .slider {
            -webkit-appearance: none;
            height: 0.5em;
            width: 100px;
            padding: 0.5em 0;
            background: #EC4015;
            outline: none;
            opacity: 0.7;
            -webkit-transition: .75s;
            transition: opacity .75s;
          }
          
        .slider:hover {
            opacity: 1;
        }
          
        .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 30px;
            height: 30px;
            background: url("${this._src}") center center no-repeat;
            border-radius: 50%;
            background-size: cover;
            transform: scale(1.5) rotateZ(var(--thumb-rotate, 10deg));
            transition: transform 1.5ms;
            cursor: pointer;
        }

        .slider::-moz-range-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 30px;
            height: 30px;
            background: url("${this._src}") center center no-repeat;
            border-radius: 50%;
            background-size: cover;
            transform: scale(1.5) rotateZ(var(--thumb-rotate, 10deg));
            transition: transform 1.5ms;
            cursor: pointer;
        }

        .slider-container input[type="checkbox"] {
            display: none;
        }

        .slider-container .label-check {
            background-color: #ca2525;
            color: #ffffff;
            padding: 5px 5px;
            text-align: center;
            font-size: 0.75em;
            cursor: pointer;
        }

        .slider-container input[type="checkbox"]:checked + .label-check {
            background-color: #25CA25; 
            color: #ffffff;
        }

        @media screen and (max-width: 320px) {
            .slider {
                width:100px;
            }
        }
        </style>`
    }

    templateHTML() {
        return `<div class="slider-container">
            <input type="range" min="0" max="100" value="0" class="slider" id="myRange">
            <label id="valueRange">0%</label>
            <input type="checkbox" name="check" id="check" class="check">
            <label class="label-check" for="check">${this._title}</label>
        </div>`
    }

}

window.customElements.define("slider-element", sliderItem);