export const Z_INDEX_MAX = 2147483647;

export function applyStyles(element, styles) {
  // eslint-disable-next-line
  for (const property in styles) {
    element.style[property] = styles[property];
  }
}

export function getViewportSize() {
  return {
    width: Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0,
    ),
    height: Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0,
    ),
  };
}
