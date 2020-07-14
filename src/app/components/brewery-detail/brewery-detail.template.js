import styles from './brewery-detail.style.css';

export const template = document.createElement('template');

template.innerHTML = /* html */ `
  <style>${styles.toString()}</style>
  <div class="card">
      <div class="info">
        <div>Phone: <span><slot name="phone"></slot></span></div>
        <div>Postal Code: <span><slot name="postal_code"></slot></span></div>
        <div>Street: <span><slot name="street"></slot></span></div>
        <div>State: <span><slot name="state"></slot></span></div>
      </div>
      <div id="map"></div>
  </div>
`;
