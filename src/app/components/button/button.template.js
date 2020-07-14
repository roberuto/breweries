import styles from './button.style.css';

export const template = document.createElement('template');

template.innerHTML = /*html*/ `
  <style>${styles.toString()}</style>
  <button><slot></slot></button>
`;
