import { version } from '../package.json';
import { Z_INDEX_MAX, applyStyles, getViewportSize } from './utils/domUtils';
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

  embedded = false;

  title = null;

  theme = null;

  constructor({
    apiKey,
    campaignId,
    checkoutUrl = CHECKOUT_URL,
    title,
    theme,
  } = {}) {
    this.apiKey = requiredParam({ apiKey });
    this.campaignId = requiredParam({ campaignId });
    this.checkoutUrl = requiredParam({ checkoutUrl });
    this.title = title;
    this.theme = theme;

    window.addEventListener('message', this.listenToMessages);
  }

  get url() {
    let url = this.checkoutUrl;
    url += `?apiKey=${this.apiKey}`;
    url += `&campaignId=${this.campaignId}`;
    if (this.title) {
      url += `&title=${encodeURIComponent(this.title)}`;
    }
    if (this.theme) {
      url += `&theme=${encodeURIComponent(JSON.stringify(this.theme))}`;
    }
    return url;
  }

  destroy() {
    this.close();

    this.apiKey = null;
    this.campaignId = null;
    this.checkoutUrl = null;

    window.removeEventListener('message', this.listenToMessages);
  }

  listenToMessages = event => {
    const { type, message } = event.data || {};

    if (type === 'close') {
      this.close();
    } else if (type === 'heightChanged') {
      if (this.embedded) {
        this.iframe.style.height = `${message}px`;
      }
    }
  };

  open() {
    this.close();

    const { width, height } = getViewportSize();
    const { width: minWidth, height: minHeight } = IFRAME_MIN_VIEWPORT_SIZE;

    const isViewportBigEnough = width >= minWidth && height >= minHeight;
    if (isViewportBigEnough) {
      this.iframe = attachIframe(`${this.url}&mode=iframe`);
    } else {
      this.tab = openNewTab(`${this.url}&mode=tab`);
    }
  }

  embed(container) {
    this.iframe = attachIframe(`${this.url}&mode=embed`, { to: container });
    this.embedded = true;
  }

  close() {
    if (this.iframe) {
      this.iframe.parentNode.removeChild(this.iframe);
      this.iframe = null;
      this.embedded = false;
    }
    if (this.tab) {
      this.tab.close();
      this.tab = null;
    }
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

function attachIframe(url, { to: parent = document.body } = {}) {
  const { wrapper, iframe } = createIframe(
    parent === document.body ? 'fullscreen' : 'inline',
  );
  iframe.src = url;
  parent.appendChild(wrapper);

  return wrapper;
}

function openNewTab(url) {
  const tab = window.open(url, '_blank');
  tab.focus();

  return tab;
}

function createIframe(mode) {
  const wrapper = document.createElement('div');
  applyStyles(wrapper, {
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0,
    border: 0,
    ...(mode === 'fullscreen' && {
      zIndex: Z_INDEX_MAX,
      position: 'fixed',
      top: 0,
      left: 0,
      background: 'rgba(0, 0, 0, 0.5)',
    }),
    ...(mode === 'inline' && {
      position: 'relative',
    }),
  });

  const loader = document.createElement('div');
  applyStyles(loader, {
    boxSizing: 'border-box',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '50px',
    height: '50px',
    padding: '10px',
    margin: '-25px 0 0 -25px',
    border: 0,
    borderRadius: '3px',
    background: 'white',
    textAlign: 'center',
  });

  const spinner = document.createElement('img');
  applyStyles(spinner, {
    display: 'block',
    width: '100%',
    height: '100%',
  });
  spinner.src =
    'data:image/gif;base64,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';

  const iframe = document.createElement('iframe');
  iframe.setAttribute('frameBorder', '0');
  applyStyles(iframe, {
    visibility: 'hidden',
    overflowX: 'hidden',
    overflowY: 'auto',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0,
    border: 0,
    background: 'transparent',
  });

  loader.appendChild(spinner);
  wrapper.appendChild(loader);
  wrapper.appendChild(iframe);

  const displayIframe = () => {
    loader.parentNode.removeChild(loader);
    iframe.style.visibility = 'visible';
  };
  iframe.onload = displayIframe;
  iframe.onerror = displayIframe;

  return { iframe, wrapper };
}
