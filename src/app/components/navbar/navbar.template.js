import styles from './navbar.style.css';
import beer from '../../../assets/images/beer.png';

export const template = document.createElement('template');

template.innerHTML = /*html*/ `
  <style>${styles.toString()}</style>
  <nav>
    <div class="badge">
      <wc-link to="/"><img src="${beer}" alt="logo"></wc-link>
    </div>
    <div class="links">
      <wc-link to="/">Home</wc-link>
      <wc-link to="/about">About</wc-link>
    </div>
  </nav>
`;
