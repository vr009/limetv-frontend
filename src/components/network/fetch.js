export const fetchRequest = (url, method = 'POST', body = null,
    headers = {}) => {
  const options = {
    method: method,
    body: body == null ? null : JSON.stringify(body),
    headers: headers,
  };
  return fetch(url, options);
};
