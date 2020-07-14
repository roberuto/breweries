import { template } from './not-available-offline.template';

export class NotAvailableOfflineComponent extends HTMLElement {
  static tagName = 'wc-not-available-offline';

  static get observedAttributes() {
    return ['loading'];
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
