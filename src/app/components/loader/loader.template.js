import styles from './loader.style.css';

export const template = document.createElement('template');

template.innerHTML = /* html */ `
  <style>${styles.toString()}</style>
  <div class="container"><div class="spinner"></div></div>
`;
