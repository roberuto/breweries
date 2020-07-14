import { template } from './navbar.template';

export class NavbarComponent extends HTMLElement {
  static tagName = 'wc-navbar';

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
