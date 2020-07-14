import { getBreweries } from '../../../api/breweries';
import { BreweryComponent, LinkComponent } from '../../components';
import { NotificationComponent } from '../../notification/notification.component';

import { template } from './home.view.template';

export class HomeView extends HTMLElement {
  static tagName = 'home-view';

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.$loader = this.shadowRoot.querySelector('wc-loader');
    this.$breweries = this.shadowRoot.querySelector('#breweries');

    this.fetchData();
  }

  async fetchData() {
    const response = await getBreweries();

    this.$loader.loading = false;

    if (response.error) {
      NotificationComponent.open({ type: 'danger', msg: 'An error occured' });
      return;
    }

    response.forEach((brewery) => {
      this.createBrewery(brewery);
    });
  }

  createBrewery(brewery) {
    const breweryComponent = new BreweryComponent(brewery);
    const linkComponent = new LinkComponent();

    linkComponent.appendChild(breweryComponent);
    linkComponent.setAttribute('to', `/details/${brewery.id}`);

    this.$breweries.appendChild(linkComponent);
  }
}
