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
    inst.close = jest.fn();

    await postMessage('close');

    expect(inst.close).toHaveBeenCalledWith();
  });

  describe('open()', () => {
    it('should open widget in an iframe when viewport is big enough', () => {
      inst = new TokenJS({
        apiKey: 'API_KEY',
        campaignId: 'CAMPAIGN_ID',
      });
      inst.open();

      const iframe = document.body.lastChild;
      expect(iframe.tagName).toBe('IFRAME');
      expect(iframe.src).toBe(
        'https://tokenjs-checkout.netlify.com/?apiKey=API_KEY&campaignId=CAMPAIGN_ID',
      );
    });

    it('should open widget in a new tab when viewport is not big enough', () => {
      inst = new TokenJS({
        apiKey: 'API_KEY',
        campaignId: 'CAMPAIGN_ID',
      });

      resizeWindow(320, 500);
      inst.open();

      expect(window.open).toHaveBeenCalledWith(
        'https://tokenjs-checkout.netlify.com?apiKey=API_KEY&campaignId=CAMPAIGN_ID',
        '_blank',
      );
    });

    it('should open the overridden checkout URL', () => {
      inst = new TokenJS({
        apiKey: 'API_KEY',
        campaignId: 'CAMPAIGN_ID',
        checkoutUrl: 'https://foo.bar',
      });
      inst.open();

      const iframe = document.body.lastChild;
      expect(iframe.src).toBe(
        'https://foo.bar/?apiKey=API_KEY&campaignId=CAMPAIGN_ID',
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
    });

    it('should close the tab the widget was opened in', () => {
      resizeWindow(320, 500);
      inst.open();
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
      inst.close = jest.fn();
      inst.destroy();

      expect(inst.close).toHaveBeenCalledWith();
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
      inst.close = jest.fn();
      inst.destroy();

      await postMessage('close');

      expect(inst.close.mock.calls.length).toEqual(1);
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
