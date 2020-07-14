export const register = (components) => {
  Object.values(components).forEach((component) => {
    window.customElements.define(component.tagName, component);
  });
};
