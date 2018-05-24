import { h, render } from 'preact';
import { setApiKey } from './api';
import App from './components/App';

export default class TokenJS {
  constructor({ apiKey }) {
    setApiKey(apiKey);
  }

  open = (container = document.body, { campaignId }) => {
    if (!campaignId) {
      throw new Error('campaignId is required');
    }

    render(<App campaignId={campaignId} />, container);
  };
}
