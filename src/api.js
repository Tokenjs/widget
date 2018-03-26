import { apiUrl } from './config';

let client;
let apiKey;

export default function apiClient() {
  if (client) {
    return client;
  }

  function sendRequest(path, options = {}) {
    return fetch(apiUrl + path, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        Authorization: `ApiKey ${apiKey}`,
      },
    }).then((response) => {
      const { status } = response;
      if (status >= 400) {
        return parseBodyByContentType(response).then(error => Promise.reject(error));
      }
      return parseBodyByContentType(response);
    });
  }

  client = {
    get(path, options) {
      return sendRequest(path, { ...options, method: 'GET' });
    },
    post(path, body = {}, options) {
      return sendRequest(path, {
        ...options,
        method: 'POST',
        body: JSON.stringify(body),
      });
    },
    patch(path, body = {}, options) {
      return sendRequest(path, {
        ...options,
        method: 'PATCH',
        body: JSON.stringify(body),
      });
    },
  };

  return client;
}

export function setApiKey(key) {
  apiKey = key;
}

export function withQuery(url, params) {
  const queryString = Object.keys(params)
    .map(key => [key, params[key]])
    .filter(([, value]) => value !== undefined && value !== '')
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  return queryString ? `${url}?${queryString}` : url;
}

function parseBodyByContentType(response) {
  const contentType = response.headers.get('Content-Type');
  return contentType.indexOf('application/json') > -1 ? response.json() : response.text();
}

