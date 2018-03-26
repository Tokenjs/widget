import { h, render } from 'preact';
import { setApiKey } from './api';
import App from './components/App';

export default class TokenJS {
  constructor({ apiKey }) {
    setApiKey(apiKey);
  }

  open = (container = document.body) => {
    render(<App />, container);
  };
}
