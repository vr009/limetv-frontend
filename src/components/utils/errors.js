export const showErrors = (text) => {
  const root = document.getElementById('error');
  root.innerHTML = '';

  const msg = document.createElement('p');
  msg.textContent = text;
  root.appendChild(msg);
};
