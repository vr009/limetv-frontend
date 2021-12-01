export const fetchImage= (url, body = null) => {
  const options = {
    credentials: 'include',
    method: 'POST',
    body: body,
  };
  return fetch(url, options);
};
