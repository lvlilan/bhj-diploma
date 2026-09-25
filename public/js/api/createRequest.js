const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  const { url, method = 'GET', data = {}, callback } = options;

  let requestUrl = url;
  let body = null;

  if (method.toUpperCase() === 'GET') {
    const params = new URLSearchParams();
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        params.append(key, data[key]);
      }
    }
    const queryString = params.toString();
    if (queryString) {
      requestUrl += (requestUrl.includes('?') ? '&' : '?') + queryString;
    }
  } else {
    body = new FormData();
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        body.append(key, data[key]);
      }
    }
  }

  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      callback(null, xhr.response);
    } else {
      callback(new Error(`Ошибка запроса: ${xhr.status}`), xhr.response);
    }
  });

  xhr.addEventListener('error', () => {
    callback(new Error('Ошибка сети'), null);
  });

  try {
    xhr.open(method, requestUrl);
    xhr.send(body);
  } catch (e) {
    callback(e, null);
  }
};