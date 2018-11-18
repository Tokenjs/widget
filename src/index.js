import { version } from '../package.json';
import { createFullScreenIframe, getViewportSize } from './utils/domUtils';
import ExtendableError from './utils/ExtendableError';

const CHECKOUT_URL = 'https://tokenjs-checkout.netlify.com';
const IFRAME_MIN_VIEWPORT_SIZE = {
  width: 400,
  height: 640,
};

class TokenJSError extends ExtendableError {
  constructor(message) {
    super(`[TokenJS] ${message}`);
  }
}

export default class TokenJS {
  static version = version;

  checkoutUrl = null;

  apiKey = null;

  campaignId = null;

  iframe = null;

  tab = null;

  constructor({ apiKey, campaignId, checkoutUrl = CHECKOUT_URL } = {}) {
    this.apiKey = requiredParam('apiKey', apiKey);
    this.campaignId = requiredParam('campaignId', campaignId);
    this.checkoutUrl = requiredParam('checkoutUrl', checkoutUrl);

    window.addEventListener('message', this.listenToPostMessages);
  }

  destroy() {
    this.close();

    this.apiKey = null;
    this.campaignId = null;
    this.checkoutUrl = null;

    window.removeEventListener('message', this.listenToPostMessages);
  }

  listenToPostMessages = event => {
    if (event.data === 'close') {
      this.close();
    }
  };

  open() {
    let url = this.checkoutUrl;
    url += `?apiKey=${this.apiKey}`;
    url += `&campaignId=${this.campaignId}`;

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

function requiredParam(name, value) {
  if (!value) {
    throw new TokenJSError(`'${name}' is a required parameter`);
  }
  return value;
}
