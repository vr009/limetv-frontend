/**
 * Отрисовывает элемент-ошибку с кастомным текстом
 * @param {string} text - Текст ошибки
 */
export const showErrors = (text = '') => {
  const root = document.getElementById('error');
  root.innerHTML = '';

  const msg = document.createElement('p');
  msg.textContent = text;
  root.appendChild(msg);
};

/**
 * Отрисовывает успешный ответ с кастомным текстом
 * @param {string} text - Текст ошибки
 */
export const showSuccess = (text = '') => {
  const root = document.getElementById('success');
  root.innerHTML = '';

  const msg = document.createElement('p');
  msg.textContent = text;
  root.appendChild(msg);
};
