import L from 'leaflet';

import { template } from './map.template';

const DEFAULT_ZOOM = 13;
const OPTIONS = {
  zoomControl: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  touchZoom: false,
  dragging: false,
  tap: false,
};

Object.freeze(OPTIONS);

export class MapComponent extends HTMLElement {
  static tagName = 'wc-map';

  state = {};

  constructor({ latitude, longitude }) {
    super();

    this.state = { latitude, longitude };
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.$mapContainer = this.shadowRoot.querySelector('.map');

    const $map = document.createElement('div');
    this.$mapContainer.appendChild($map);

    const pos = [this.state.latitude, this.state.longitude];
    const map = L.map($map, OPTIONS).setView(pos, DEFAULT_ZOOM);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a target="_blank" rel="noopener noreferrer" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.circle(pos, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 100,
    }).addTo(map);
  }
}
