import { template } from './loader.template';

export class LoaderComponent extends HTMLElement {
  static tagName = 'wc-loader';
  timer = null;

  static get observedAttributes() {
    return ['loading'];
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.loading = true;
  }

  set loading(value) {
    const isLoading = Boolean(value);

    clearTimeout(this.timer);

    if (isLoading) {
      this.timer = setTimeout(() => {
        this.setAttribute('loading', '');
      }, 100);
    } else {
      this.removeAttribute('loading');
    }
  }

  get loading() {
    return this.hasAttribute('loading');
  }
}
