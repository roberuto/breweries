import { template } from './about.template';

export class AboutView extends HTMLElement {
  static tagName = 'about-view';

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
