class toogleItem extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.isOn = this.getAttribute('state') || false;
    this.isChecked = '';
    this.render();
    this.toogle = this.shadow.querySelector('input');
  }

  /**
   * The `connectedCallback` function adds an event listener to a toggle element to trigger a method when
   * the toggle state changes.
   */
  connectedCallback() {
    this.toogle.addEventListener('change', this.toggleCheckbox.bind(this));
  }

  /**
   * The `disconnectedCallback` function removes an event listener for a checkbox toggle.
   */
  disconnectedCallback() {
    this.toogle.removeEventListener('change', this.toggleCheckbox.bind(this));
  }

  /**
   * The `toggleCheckbox` function dispatches a custom event named 'toogleEvent' with the state of a
   * checkbox as the detail.
   */
  toggleCheckbox() {
    this.dispatchEvent(new CustomEvent('toogleEvent', {
      detail: { state: this.toogle.checked }
    }));
  }


  /**
   * The function isDisabled returns the disabled status of a toggle element.
   * @returns The code is returning the value of `this.toogle.disabled`.
   */
  get isDisabled() {
    return this.toogle.disabled;
  }

  /**
   * The function `isDisabled` sets the `disabled` property of a `toogle` element to a specified value.
   * @param newValue - The `newValue` parameter in the `set isDisabled(newValue)` function represents the
   * new value that will be assigned to the `disabled` property of the `toggle` element.
   */
  set isDisabled(newValue) {
    this.toogle.disabled = newValue;
  }

  /**
   * The function returns the checked state of a toggle element.
   * @returns The `state` property is being returned, which is the value of the `checked` property of the
   * `toogle` element.
   */
  get state() {
    return this.toogle.checked
  }

  /**
   * The function sets the state of an element based on a boolean value, updating the isChecked property
   * and triggering a render.
   * @param newValue - The `newValue` parameter is the value that is being passed to the `set state`
   * function. It is used to determine whether the `isChecked` property should be set to `'checked'` or
   * an empty string based on the condition `newValue === true`.
   */
  set state(newValue) {
    if (newValue === true) {
      this.isChecked = 'checked';
    }
    else {
      this.isChecked = '';
    }
    this.render();
  }

  /**
   * The `render` function sets the inner HTML of a shadow DOM element with a combination of CSS and HTML
   * templates.
   */
  render() {
    this.shadow.innerHTML = `${this.templateCSS()} ${this.templateHTML()}`
  }

  templateCSS() {
    return `<style>
        .switch {
          position: relative;
          display: inline-block;
          width: 3em;
          height: 1.25em;
        }
        
        .switch input { 
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #C0392B;
          -webkit-transition: .4s;
          transition: .4s;
        }
        
        .slider:before {
          position: absolute;
          content: "";
          height: 0.85em;
          width: 0.85em;
          left: 5px;
          bottom: 1px;
          background-color: #ccc;
          -webkit-transition: .4s;
          transition: .4s;
        }
        
        input:checked + .slider {
          background-color: #33B233;
        }
        
        input:focus + .slider {
          box-shadow: 0 0 1px #33B233;
        }
        
        input:checked + .slider:before {
          -webkit-transform: translateX(1.2em);
          -ms-transform: translateX(1.2em);
          transform: translateX(1.2em);
        }
        
        /* Rounded sliders */
        .slider.round {
          border: 1px solid #000000;
          border-radius: 1em;
        }
        
        .slider.round:before {
          border-radius: 50%;
          border: 1px solid #000000;
        }
      </style>` }

  templateHTML() {
    return `<label class="switch">
                  <input type="checkbox">
                  <span class="slider round"></span>
                </label>`}

}

window.customElements.define("toogle-element", toogleItem)