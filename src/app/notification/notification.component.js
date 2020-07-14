import { template } from './notification.template';

export class NotificationComponent extends HTMLElement {
  static tagName = 'wc-notification';

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static open(options) {
    const notification = instance.cloneNode(true);

    notification.textContent = options.msg;
    notification.shadowRoot.lastElementChild.className = options.type;

    const $notificationContainer = document.getElementById('notification');
    $notificationContainer.appendChild(notification);

    setTimeout(() => {
      $notificationContainer.removeChild(notification);
    }, 3000);
  }
}

window.customElements.define(NotificationComponent.tagName, NotificationComponent);

const instance = new NotificationComponent();
