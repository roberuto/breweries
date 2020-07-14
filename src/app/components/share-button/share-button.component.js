import { template } from './share-button.template.js';

const handleShare = Symbol('handleShare');

export class ShareButtonComponent extends HTMLElement {
  static tagName = 'wc-share-button';

  constructor(share) {
    super();

    this.share = share;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this[handleShare] = this[handleShare].bind(this);
  }

  connectedCallback() {
    this.$button = this.shadowRoot.querySelector('wc-button');
    this.$button.addEventListener('click', this[handleShare]);
  }

  disconnectedCallback() {
    this.$button.removeEventListener('click', this[handleShare]);
  }

  [handleShare]() {
    if (navigator.share) {
      navigator
        .share({
          title: location.origin,
          text: 'Checkout this amazing brewery',
          url: location.href,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      console.log('Share not supported');
    }
  }
}
