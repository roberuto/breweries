import styles from './link.style.css';

export const template = document.createElement('template');

template.innerHTML = /*html*/ `
  <style>${styles.toString()}</style>
  <a href="#"><slot></slot></a>
`;
