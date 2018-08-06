const Z_INDEX_MAX = 2147483647;

export function applyStyles(element, styles) {
  for (const property in styles) { // eslint-disable-line
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

export function createFullScreenIframe() {
  const iframe = document.createElement('iframe');

  iframe.setAttribute('frameBorder', '0');
  applyStyles(iframe, {
    zIndex: Z_INDEX_MAX,
    overflowX: 'hidden',
    overflowY: 'auto',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0,
    border: 0,
    background: 'transparent',
  });

  return iframe;
}
