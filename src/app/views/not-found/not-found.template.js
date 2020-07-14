import styles from './not-found.style.css';

export const template = document.createElement('template');

template.innerHTML = /*html*/ `
  <style>${styles.toString()}</style>
  <div>
    <p>404</p>
    <p>NOT FOUND</p>
  </div>
`;
