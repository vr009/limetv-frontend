import {createProfilePage} from '../../view/createProfilePage';

const authElements = {
  profile: 'Профиль',
  logout: 'Выйти',
};

// элементы для незарегистрированных пользователей
const unauthElements = {
  login: 'Войти',
  signup: 'Регистрация',
};


/**
 * Модуль создания элементов меню
 * @function
 */
// создание элементов для меню
export const createElements = (authed) => {
  const root = document.getElementById('menu-items');
  root.innerHTML = '';

  // основные блоки меню
  // Object.keys(menuElements).forEach(function(key) {
  //   const menuItem = document.createElement('a');
  //   menuItem.textContent = menuElements[key];
  //   menuItem.href = `/${key}`;
  //   menuItem.dataset.section = key;
  //   root.appendChild(menuItem);
  // });

  if (authed) {
    Object.keys(authElements).forEach(function(key) {
      if (key === 'profile') {
        createProfilePage(true);
      }
      const menuItem = document.createElement('a');
      menuItem.setAttribute('class', 'btn-in first');
      menuItem.textContent = authElements[key];
      menuItem.href = `/${key}`;
      menuItem.dataset.section = key;
      root.appendChild(menuItem);
    });
  } else {
    Object.keys(unauthElements).forEach(function(key) {
      const menuItem = document.createElement('a');
      menuItem.setAttribute('class', 'btn-in first');
      menuItem.textContent = unauthElements[key];
      menuItem.href = `/${key}`;
      menuItem.dataset.section = key;
      root.appendChild(menuItem);
    });
  }
};
