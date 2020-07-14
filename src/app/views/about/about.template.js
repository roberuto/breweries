import styles from './about.style.css';

import pwa from '../../../assets/images/pwa.png';
import wc from '../../../assets/images/wc.png';

export const template = document.createElement('template');

template.innerHTML = /*html*/ `
  <style>${styles.toString()}</style>
  <h2>About</h2>
  <p>Simple SPA app without any dependencies (except <strong>Leaflet</strong> for maps).</p>
  <p>App was build without any framework or library, as a proof of concept for native web components.</p>
  <p>PWA included :)</p>
  <div class="images">
    <div><img src="${wc}" alt="Web Component" /></div>
    <div><img src="${pwa}" alt="Progressive Web App" /></div>
  </div>
`;
