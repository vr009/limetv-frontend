import {createProfilePage} from '../../view/createProfilePage';
import Router from '../../utils/router';

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
  const menuLogo = document.getElementById('logo-start');
  menuLogo.addEventListener('click', function(event) {
    event.preventDefault();
    Router.go('/', 'main', null, true, false);
  });
  const root = document.getElementById('menu-items');
  root.innerHTML = '';

  if (authed) {
    Object.keys(authElements).forEach(function(key) {
      root.setAttribute('class', 'col-2 left-menu');
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
      root.setAttribute('class', 'col-2 none-auth');
      const menuItem = document.createElement('a');
      menuItem.setAttribute('class', 'btn-in first');
      menuItem.textContent = unauthElements[key];
      menuItem.href = `/${key}`;
      menuItem.dataset.section = key;
      root.appendChild(menuItem);
    });
  }
};


const genresListeners = () => {
  const root = document.getElementById('menu-items');
  let genres = root.querySelectorAll('li');
  for (let i = 0; i < genres.length; i++) {
    genres[i].addEventListener('click', (event) => {
       event.preventDefault();
      showGenresFilmsList(genres[i].dataset.section)

      //здесь получение информации о жанре
    });
  }
}
