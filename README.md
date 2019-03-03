# TokenJS Widget

## Demo

[tokenjs.com/#demo](https://tokenjs.com/#demo)

## Installation

1. `npm install @tokenjs/widget` or `yarn add @tokenjs/widget` or grab from CDN:
    - original: https://unpkg.com/@tokenjs/widget/dist/Token.js
    - minified: https://unpkg.com/@tokenjs/widget/dist/Token.min.js
2. Initialize widget:
    ```js
    import TokenJS from 'tokenjs'
    
    const tokenJs = new TokenJS({
      apiKey: '<YOUR-API-KEY>',
      campaignId: '<YOUR-CAMPAIGN-id>',
    })
    ``` 
3. Open the widget on some user action:
    ```js
    tokenJs.open()
    ```

## API

### Constructor options

```js
new TokenJS({
  
  // (required) API key
  apiKey: '',
  
  // (required) Campaign ID
  campaignId: '',
  
  // (optional) Checkout URL
  checkoutUrl: '',
  
  // (optional) Text to display in widget’s header
  title: '',
  
  // (optional) Theme
  theme: {
    // you can override any of the following defaults:
    background: '#fff',
    muted: '#f5f5f5',
    text: '#4a4a4a',
    textLight: '#7a7a7a',
    link: '#3273dc',
    primary: '#00d1b2',
    primaryInverted: '#fff',
    secondary: '#209cee',
    secondaryInverted: '#fff',
    success: '#23d160',
    successInverted: '#fff',
    warning: '#ff8838',
    warningInverted: '#fff',
    danger: '#ff3860',
    dangerInverted: '#fff',
    ethereum: '#454b72',
    ethereumInverted: '#fff',
    bitcoin: '#eb973d',
    bitcoinInverted: '#fff',
    bitcoinCash: '#e48f39',
    bitcoinCashInverted: '#fff',
    litecoin: '#bebebe',
    litecoinInverted: '#fff',
  },
})
```

### Instance methods

- `open()` – opens the widget
- `embed(container)` – renders the widget inside the `container`
- `close()` – closes the widget
- `update({ title, theme })` – updates initialization options on an existing widget
- `destroy()` – destroys instance of the widget

## Development

1. `yarn` installs dependencies
2. `yarn start` starts dev server

## License

[MIT](./LICENSE)
