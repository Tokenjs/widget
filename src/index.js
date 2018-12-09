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
    this.apiKey = requiredParam({ apiKey });
    this.campaignId = requiredParam({ campaignId });
    this.checkoutUrl = requiredParam({ checkoutUrl });

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
      this.iframe = null;
    }
    if (this.tab) {
      this.tab.close();
      this.tab = null;
    }
  }

  attachIframe(url) {
    const { wrapper, iframe } = createFullScreenIframe();
    iframe.src = url;
    document.body.appendChild(wrapper);

    this.iframe = wrapper;
  }

  openNewTab(url) {
    const tab = window.open(url, '_blank');
    tab.focus();

    this.tab = tab;
  }
}

function requiredParam(param) {
  let value;
  Object.keys(param).forEach(name => {
    if (!param[name]) {
      throw new TokenJSError(`'${name}' is a required parameter`);
    }
    value = param[name];
  });
  return value;
}
