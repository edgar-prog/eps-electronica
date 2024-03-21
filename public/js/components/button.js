

class buttonItem extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.icon = this.getAttribute('src');
    this.label = this.getAttribute('label');
    this.isToogle = this.getAttribute('press') || false;
    this.timeRotation = 1000;
    this.isPressed = false;
    this.render();
    this.button = this.shadow.querySelector('.btn-flat');
    this.icon = this.shadow.querySelector('img');
  }

  /**
   * The render function sets the innerHTML of the shadow DOM to a combination of the template's CSS and
   * HTML.
   */
  render() {
    this.shadow.innerHTML = `${this.templateCSS()} ${this.templateHTML()}`
  }

  /**
   * The function sets the value of the timeRotation property.
   * @param newValue - The `newValue` parameter is the new value that will be assigned to the
   * `timeRotation` property.
   */
  set time(newValue) {
    this.timeRotation = newValue;
  }

  /**
   * The function sets the disabled property of a button element to a new value.
   * @param newValue - The `newValue` parameter is a boolean value that determines whether the button
   * should be disabled or not. If `newValue` is `true`, the button will be disabled. If `newValue` is
   * `false`, the button will be enabled.
   */
  set isDisabled(newValue) {
    this.button.disabled = newValue;
  }

  /* The `connectedCallback()` and `disconnectedCallback()` methods are lifecycle methods in the custom
  element. */
  connectedCallback() {
    this.button.addEventListener("click", this.handleClick.bind(this));
  }

  disconnectedCallback() {
    this.button.removeEventListener('click', this.handleClick.bind(this));
  }

  /**
   * The handleClick function adds or removes classes to elements based on certain conditions and
   * dispatches a custom event.
   */
  handleClick() {
    this.icon.classList.add('rotate');
    this.isPressed = !this.isPressed;

    if (this.isToogle) {
      this.button.classList.toggle('active');
      if (!this.isPressed) {
        this.icon.classList.remove('rotate')
      }
    }
    else {
      setTimeout(() => this.icon.classList.remove('rotate'), this.timeRotation);
    }
    this.dispatchEvent(new CustomEvent('pressButton', {
      detail: { id: this.label, pressed: this.isPressed }
    }));
  }

  templateCSS() {
    return `<style>
    .btn-flat {
      display: inline-block;
      position: relative;
      width: 75px;
      padding: 5px 10px;
      margin: 5px 10px;
      background-color: #25CA25;
      border: 2px solid #000;
      border-radius: 5px;
      text-align: center;
      color: #000;
      transition: background-color transform 1s ease-in-out;
    }

    .btn-flat img {
      height: 25px;
      display: block;
      max-width: 100%;
      margin: 0 auto;
    }
    
    .btn-flat .a {
      margin-top: 5px;
      text-decoration: none;
      font-weight: 700;
      color: #000;
    }

    .btn-flat.active {
      background-color: #8b8a8a;
    }
    
    .rotate  {
      animation: rotacion 1s infinite linear;
    }
    
    @keyframes rotacion {
      from {
        transform: rotate(0deg);
      }
      
      to {
        transform: rotate(360deg);
      }
    }
    </style>`;
  }

  templateHTML() {
    return `
      <button class="btn-flat">
        <img src="${this.icon}">
        <span class="a">${this.label}</span>
      </button>`
  }
}

window.customElements.define("button-element", buttonItem);