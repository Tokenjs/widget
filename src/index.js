import { version } from '../package.json';
import { createFullScreenIframe, getViewportSize } from './utils/domUtils';

const IFRAME_MIN_VIEWPORT_SIZE = {
  width: 400,
  height: 640,
};

export default class TokenJS {
  static version = version;

  checkoutUrl = 'http://localhost:3001';

  apiKey = null;

  iframe = null;

  tab = null;

  constructor({ apiKey, checkoutUrl }) {
    if (checkoutUrl) {
      this.checkoutUrl = checkoutUrl;
    }
    this.apiKey = apiKey;

    window.addEventListener('message', this.listenToPostMessages);
  }

  destroy() {
    window.removeEventListener('message', this.listenToPostMessages);
  }

  listenToPostMessages = event => {
    if (event.data === 'close') {
      this.close();
    }
  };

  open() {
    const url = `${this.checkoutUrl}?apiKey=${this.apiKey}`;

    const { width, height } = getViewportSize();
    const { width: minWidth, height: minHeight } = IFRAME_MIN_VIEWPORT_SIZE;
    const isViewportBigEnough = width >= minWidth && height >= minHeight;

    if (isViewportBigEnough) {
      this.attachIframe(url);
    } else {
      this.openNewTab(url);
    }
  }

  close() {
    if (this.iframe) {
      this.iframe.parentNode.removeChild(this.iframe);
    }
    if (this.tab) {
      this.tab.close();
    }
  }

  attachIframe(url) {
    const iframe = createFullScreenIframe();
    iframe.style.visibility = 'hidden';
    iframe.addEventListener('load', () => {
      iframe.style.visibility = 'visible';
    });
    iframe.src = url;
    document.body.appendChild(iframe);

    this.iframe = iframe;
  }

  openNewTab(url) {
    const tab = window.open(url, '_blank');
    tab.focus();

    this.tab = tab;
  }
}
