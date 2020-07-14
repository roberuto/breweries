import styles from './map.style.css';
import leafletStyles from '!css-loader!leaflet/dist/leaflet.css';

export const template = document.createElement('template');

template.innerHTML = /*html*/ `
  <style>
    ${styles.toString()}
    ${leafletStyles.toString()}
  </style>
  <div class="map"><div>
`;
