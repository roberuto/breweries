import styles from './brewery.style.css';

export const template = document.createElement('template');

template.innerHTML = /* html */ `
  <style>${styles.toString()}</style>
  <div class="card">
      <div class="name"><slot name="name"></slot></div>
      <div class="type">type: <span><slot name="brewery_type"></slot></span></div>
      <div class="info">
        <div>City: <slot name="city"></slot></div>
        <div>Country: <slot name="country"></slot></div>
      </div>
  </div>
`;
