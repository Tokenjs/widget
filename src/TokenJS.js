import apiClient, { withQuery } from './api';

export default class TokenJS {
  constructor({ apiKey }) {
    this.api = apiClient({ apiKey });
  }

  open = () => {
    this.api.get(withQuery('/users', {})).then((result) => {
      console.log(result);
    });
  }
}
