import { app, h } from 'hyperapp';
import apiClient from './api';
import App from './components/App';

export default class TokenJS {
  constructor({ apiKey }) {
    this.api = apiClient({ apiKey });
  }

  open = (container = document.body) => {
    app({}, {}, App, container);
  };
}
