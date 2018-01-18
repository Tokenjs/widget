export default class TokenJS {
  constructor({ apiKey }) {
    this.apiKey = apiKey;
  }

  open = () => {
    console.log(this.apiKey);
  }
}
