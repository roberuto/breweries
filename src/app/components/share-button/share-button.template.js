import styles from './share-button.style.css';
import share from '../../../assets/images/share.png';

export const template = document.createElement('template');

template.innerHTML = /*html*/ `
  <style>${styles.toString()}</style>
  <wc-button round><img src="${share}" alt="share" /></wc-button>
`;
