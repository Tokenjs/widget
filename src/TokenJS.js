import { app, h } from 'hyperapp';
import { setApiKey } from './api';
import App from './components/App';

export default class TokenJS {
  constructor({ apiKey }) {
    setApiKey(apiKey);
  }

  open = (container = document.body) => {
    app({}, {}, App, container);
  };
}
