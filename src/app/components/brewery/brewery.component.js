import { template } from './brewery.template';

const setValues = Symbol('setValues');

export class BreweryComponent extends HTMLElement {
  static tagName = 'wc-brewery';
  state = {};

  constructor(state) {
    super();

    this.state = state;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this[setValues](['name', 'brewery_type', 'city', 'country']);
  }

  [setValues](values) {
    values.forEach((value) => {
      this.shadowRoot.querySelector(`[name="${value}"]`).textContent = this.state[value] || '-';
    });
  }
}
