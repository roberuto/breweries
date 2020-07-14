import { getBrewery } from '../../../api/breweries';
import { Router } from '../../router';
import {
  BreweryComponent,
  BreweryDetailComponent,
  NotAvailableOfflineComponent,
  ShareButtonComponent,
} from '../../components';
import { NotificationComponent } from '../../notification/notification.component';

import { template } from './details.template';

export class DetailsView extends HTMLElement {
  static tagName = 'details-view';

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const id = Router.params.id;

    this.$loader = this.shadowRoot.querySelector('wc-loader');
    this.$brewery = this.shadowRoot.querySelector('#brewery');
    this.$breweryDetails = this.shadowRoot.querySelector('#brewery-details');

    this.fetchData(id);
  }

  async fetchData(id) {
    const response = await getBrewery(id);

    this.$loader.loading = false;

    if (response.error) {
      if (navigator.onLine) {
        NotificationComponent.open({ type: 'danger', msg: 'Could not fetch brewery' });
        Router.go('/');
      } else {
        this.createBreweryOffline();
      }
      return;
    }

    this.createBrewery(response);
  }

  createBreweryOffline() {
    const notAvailableOfflineComponent = new NotAvailableOfflineComponent();
    this.$brewery.appendChild(notAvailableOfflineComponent);
  }

  createBrewery(brewery) {
    const breweryComponent = new BreweryComponent(brewery);
    this.$brewery.appendChild(breweryComponent);
    this.createMap(brewery);
    if (navigator.share) {
      this.createShareButton();
    }
  }

  createMap(brewery) {
    const mapComponent = new BreweryDetailComponent(brewery);
    this.$breweryDetails.appendChild(mapComponent);
  }

  createShareButton() {
    const share = {
      title: location.origin,
      text: 'Check out this amazing brewery',
      url: location.href,
    };
    const shareButton = new ShareButtonComponent(share);
    this.shadowRoot.appendChild(shareButton);
  }
}
