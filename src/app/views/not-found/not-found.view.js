import { template } from './not-found.template';

export class NotFoundView extends HTMLElement {
  static tagName = 'not-found-view';

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
