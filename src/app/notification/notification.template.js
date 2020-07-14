import styles from './notification.style.css';

export const template = document.createElement('template');

template.innerHTML = /*html*/ `
  <style>${styles.toString()}</style>
  <div><slot></slot></div>
`;
