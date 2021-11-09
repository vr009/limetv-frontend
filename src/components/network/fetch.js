/**
 * Модуль работы с сетью
 * @function
 * @param {string} url - URL запроса
 * @param {string} method - Метод запроса
 * @param {Object} body - Тело запроса (если есть)
 * @param {Object} headers - Заголовки запроса (если есть)
 * @return {Promise} promise - Объект запроса
 */
export const fetchRequest = (url, method = 'POST', body = null,
    headers = {}) => {
  const options = {
    credentials: 'include',
    method: method,
    body: body == null ? null : JSON.stringify(body),
    headers: headers,
  };
  return fetch(url, options);
};
