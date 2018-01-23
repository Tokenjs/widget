import { app, h } from 'hyperapp';
import apiClient, { withQuery } from './api';
import App from './components/App';

export default class TokenJS {
  constructor({ apiKey }) {
    this.api = apiClient({ apiKey });
  }

  open = () => {
    app({}, {}, App, document.body);

    this.api.get(withQuery('/users', {})).then((result) => {
      console.log(result);
    });
  };
}
