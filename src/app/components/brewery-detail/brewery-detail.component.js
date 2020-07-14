import { MapComponent } from '../map/map.component';

import { template } from './brewery-detail.template';

const setValues = Symbol('setValues');
const createMap = Symbol('createMap');

export class BreweryDetailComponent extends HTMLElement {
  static tagName = 'wc-brewery-detail';

  state = {};

  constructor(state) {
    super();

    this.state = state;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.$map = this.shadowRoot.querySelector('#map');

    this[setValues](['phone', 'postal_code', 'street', 'state']);
    this[createMap]({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    });
  }

  [setValues](values) {
    values.forEach((value) => {
      this.shadowRoot.querySelector(`[name="${value}"]`).textContent = this.state[value] || '-';
    });
  }

  [createMap]({ latitude, longitude }) {
    const mapComponent = new MapComponent({ latitude, longitude });
    this.$map.appendChild(mapComponent);
  }
}
