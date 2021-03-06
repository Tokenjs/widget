const TokenJS = require('./index').default;

describe('TokenJS', () => {
  let windowOpen;
  let inst;

  beforeEach(() => {
    windowOpen = window.open;
    window.open = jest.fn(() => ({
      focus: jest.fn(),
      close: jest.fn(),
    }));

    inst = null;
  });

  afterEach(() => {
    window.open = windowOpen;

    resizeWindow(1024, 768);

    if (inst) {
      inst.destroy();
    }
  });

  it("should throw when 'apiKey' is not provided", () => {
    expect(() => new TokenJS()).toThrow(
      "[TokenJS] 'apiKey' is a required parameter",
    );
  });

  it("should throw when 'campaignId' is not provided", () => {
    expect(() => new TokenJS({ apiKey: 'API_KEY' })).toThrow(
      "[TokenJS] 'campaignId' is a required parameter",
    );
  });

  it('should initialize when it receives required params', () => {
    expect(
      new TokenJS({ apiKey: 'API_KEY', campaignId: 'CAMPAIGN_ID' }),
    ).toBeInstanceOf(TokenJS);
  });

  it("should close widget on 'close' post message", async () => {
    inst = new TokenJS({ apiKey: 'API_KEY', campaignId: 'CAMPAIGN_ID' });

    const closeOrig = inst.close;
    inst.close = jest.fn();

    await postMessage({ type: 'close' });

    expect(inst.close.mock.calls).toEqual([[]]);

    inst.close = closeOrig;
  });

  describe('open()', () => {
    it('should close an already open widget', () => {
      inst = new TokenJS({
        apiKey: 'API_KEY',
        campaignId: 'CAMPAIGN_ID',
      });

      const closeOrig = inst.close;
      inst.close = jest.fn();

      inst.open();

      expect(inst.close.mock.calls).toEqual([[]]);

      inst.close = closeOrig;
    });

    it('should open widget in an iframe when viewport is big enough', () => {
      inst = new TokenJS({
        apiKey: 'API_KEY',
        campaignId: 'CAMPAIGN_ID',
      });
      inst.open();

      const iframe = [...document.querySelectorAll('iframe')];
      expect(iframe).toHaveLength(1);
      expect(iframe[0].src).toBe(
        'https://tokenjs-checkout.netlify.com/?apiKey=API_KEY&campaignId=CAMPAIGN_ID&mode=iframe',
      );
    });

    it('should open widget in a new tab when viewport is not big enough', () => {
      inst = new TokenJS({
        apiKey: 'API_KEY',
        campaignId: 'CAMPAIGN_ID',
      });

      resizeWindow(320, 500);
      inst.open();

      expect(window.open.mock.calls).toEqual([
        [
          'https://tokenjs-checkout.netlify.com?apiKey=API_KEY&campaignId=CAMPAIGN_ID&mode=tab',
          '_blank',
        ],
      ]);
    });

    it('should open the overridden checkout URL', () => {
      inst = new TokenJS({
        apiKey: 'API_KEY',
        campaignId: 'CAMPAIGN_ID',
        checkoutUrl: 'https://foo.bar',
      });
      inst.open();

      const iframe = document.body.querySelector('iframe');
      expect(iframe.src).toBe(
        'https://foo.bar/?apiKey=API_KEY&campaignId=CAMPAIGN_ID&mode=iframe',
      );
    });

    it('should send encoded title param to checkout if provided', () => {
      inst = new TokenJS({
        apiKey: 'API_KEY',
        campaignId: 'CAMPAIGN_ID',
        title: '<strong>foo</strong>',
      });
      inst.open();

      const iframe = document.body.querySelector('iframe');
      expect(iframe.src).toBe(
        'https://tokenjs-checkout.netlify.com/?apiKey=API_KEY&campaignId=CAMPAIGN_ID&title=%3Cstrong%3Efoo%3C%2Fstrong%3E&mode=iframe',
      );
    });

    it('should send encoded theme param to checkout if provided', () => {
      inst = new TokenJS({
        apiKey: 'API_KEY',
        campaignId: 'CAMPAIGN_ID',
        theme: {
          background: '#0f0',
          text: '#f00',
        },
      });
      inst.open();

      const iframe = document.body.querySelector('iframe');
      expect(iframe.src).toBe(
        'https://tokenjs-checkout.netlify.com/?apiKey=API_KEY&campaignId=CAMPAIGN_ID&theme=%7B%22background%22%3A%22%230f0%22%2C%22text%22%3A%22%23f00%22%7D&mode=iframe',
      );
    });
  });

  describe('embed()', () => {
    let container;

    beforeEach(() => {
      inst = new TokenJS({
        apiKey: 'API_KEY',
        campaignId: 'CAMPAIGN_ID',
      });

      container = document.createElement('div');
      container.classList.add('embed');
      container.style.width = 320;
      container.style.height = 500;
      document.body.appendChild(container);
    });

    it('should render widget inside the provided container', () => {
      inst.embed(container);

      const iframe = document.body.querySelector('iframe');
      expect(iframe.closest('.embed')).toBe(container);
    });

    it('should set mode=embed URL param', () => {
      inst.embed(container);

      const iframe = document.body.querySelector('iframe');
      expect(iframe.src).toBe(
        'https://tokenjs-checkout.netlify.com/?apiKey=API_KEY&campaignId=CAMPAIGN_ID&mode=embed',
      );
    });
  });

  describe('close()', () => {
    beforeEach(() => {
      inst = new TokenJS({
        apiKey: 'API_KEY',
        campaignId: 'CAMPAIGN_ID',
      });
    });

    it('should remove the iframe the widget was opened in', () => {
      inst.open();
      inst.destroy();

      expect(document.body.querySelector('iframe')).toBe(null);
    });

    it('should not fail when iframe was already removed', () => {
      inst.open();
      inst.close();

      expect(() => inst.close()).not.toThrow();
    });

    it('should close the tab the widget was opened in', () => {
      resizeWindow(320, 500);
      inst.open();
      const { tab } = inst;
      inst.close();

      expect(tab.close.mock.calls).toEqual([[]]);
    });
  });

  describe('update()', () => {
    beforeEach(() => {
      inst = new TokenJS({
        apiKey: 'API_KEY',
        campaignId: 'CAMPAIGN_ID',
        checkoutUrl: 'https://foo.bar',
        title: 'foo',
        theme: {
          primary: '#f00',
        },
      });
      inst.open();

      inst.window.postMessage = jest.fn();
    });

    it('should update title if provided', () => {
      inst.update({ title: 'bar' });

      expect(inst.window.postMessage).toHaveBeenCalledWith(
        {
          type: 'update',
          message: {
            title: 'bar',
            theme: {
              primary: '#f00',
            },
          },
        },
        '*',
      );
    });

    it('should not update title if not provided', () => {
      inst.update();

      expect(inst.window.postMessage).toHaveBeenCalledWith(
        {
          type: 'update',
          message: {
            title: 'foo',
            theme: {
              primary: '#f00',
            },
          },
        },
        '*',
      );
    });

    it('should update theme if provided', () => {
      inst.update({ theme: { primary: '#0f0' } });

      expect(inst.window.postMessage).toHaveBeenCalledWith(
        {
          type: 'update',
          message: {
            title: 'foo',
            theme: {
              primary: '#0f0',
            },
          },
        },
        '*',
      );
    });

    it('should not update theme if not provided', () => {
      inst.update();

      expect(inst.window.postMessage).toHaveBeenCalledWith(
        {
          type: 'update',
          message: {
            title: 'foo',
            theme: {
              primary: '#f00',
            },
          },
        },
        '*',
      );
    });
  });

  describe('destroy()', () => {
    beforeEach(() => {
      inst = new TokenJS({
        apiKey: 'API_KEY',
        campaignId: 'CAMPAIGN_ID',
        checkoutUrl: 'https://foo.bar',
      });
    });

    it('should close widget', () => {
      const closeOrig = inst.close;
      inst.close = jest.fn();

      inst.destroy();

      expect(inst.close.mock.calls).toEqual([[]]);

      inst.close = closeOrig;
    });

    it('should unset instance properties', () => {
      inst.destroy();
      expect([inst.apiKey, inst.campaignId, inst.checkoutUrl]).toEqual([
        null,
        null,
        null,
      ]);
    });

    it('should stop listening to post messages', async () => {
      const closeOrig = inst.close;
      inst.close = jest.fn();

      inst.destroy();

      await postMessage('close');

      expect(inst.close.mock.calls.length).toEqual(1);

      inst.close = closeOrig;
    });
  });
});

async function postMessage(message) {
  window.postMessage(message, '*');
  return new Promise(resolve => setTimeout(resolve));
}

function resizeWindow(width, height) {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event('resize'));
}
