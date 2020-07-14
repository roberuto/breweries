import styles from './not-available-offline.style.css';

export const template = document.createElement('template');

template.innerHTML = /* html */ `
  <style>${styles.toString()}</style>
  <div class="container">Sorry, currently not available offline.</div>
`;
