import { Router } from '../../router';

import { template } from './link.template.js';

const handleRouteChange = Symbol('handleRouteChange');

export class LinkComponent extends HTMLElement {
  static tagName = 'wc-link';

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this[handleRouteChange] = this[handleRouteChange].bind(this);
  }

  static get observedAttributes() {
    return ['to'];
  }

  connectedCallback() {
    this.$link = this.shadowRoot.querySelector('a');
    this.$link.addEventListener('click', this[handleRouteChange]);
  }

  disconnectedCallback() {
    this.$link.removeEventListener('click', this[handleRouteChange]);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!oldValue && typeof newValue === 'string') {
      const to = this.getAttribute('to');
      this.$link = this.shadowRoot.querySelector('a');
      this.$link.setAttribute('href', to);
    }
  }

  [handleRouteChange](event) {
    const route = this.$link.getAttribute('href');
    event.preventDefault();
    Router.go(route);
  }
}
