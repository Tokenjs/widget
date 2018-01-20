import { apiUrl } from './config';

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
  return contentType === 'application/json' ? response.json() : response.text();
}

export default function apiClient({ apiKey }) {
  function sendRequest(path, options = {}) {
    return fetch(apiUrl + path, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...options.headers,
        authorization: `ApiKey ${apiKey}`,
      },
    }).then((response) => {
      const { status } = response;

      if (status >= 400) {
        return parseBodyByContentType(response).then(error => Promise.reject(error));
      }

      return parseBodyByContentType(response);
    });
  }

  return {
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
  };
}

