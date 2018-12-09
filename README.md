# TokenJS Widget

## Demo

[tokenjs.com/#demo](https://tokenjs.com/#demo)

## Installation

1. `npm install tokenjs` or `yarn add tokenjs` or grab from CDN:
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
})
```

### Instance methods

- `open()` – opens the widget
- `embed(container)` – renders the widget inside the `container`
- `close()` – closes the widget
- `destroy()` – destroys instance of the widget

## Development

1. `yarn` installs dependencies
2. `yarn start` starts dev server

## License

[MIT](./LICENSE)
