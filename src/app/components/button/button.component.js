import { template } from './button.template.js';

export class ButtonComponent extends HTMLElement {
  static tagName = 'wc-button';

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
