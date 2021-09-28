'use strict';

import {createFilms} from '../films/films.js';
import {authModule} from '../auth/auth.js';

const application = document.getElementById('root');

// элементы меню
const menuElements = {
  films: 'Фильмы',
};

// элементы для зарегистрированных пользователей
const authElements = {
  profile: 'Профиль',
  logout: 'Выйти',
};

// элементы для незарегистрированных пользователей
const unauthElements = {
  login: 'Войти',
  signup: 'Регистрация',
};

// элементы роутинга
const menuRoutes = {
  films: createFilms,
  profile: authModule.renderProfile,
  login: authModule.renderAuth,
  signup: authModule.renderRegistration,
  logout: authModule.logOut,
};

// загрузка меню из темплейта
const createTemplate = () => {
  const root = document.getElementById('root');
  const menu = document.createElement('div');
  menu.setAttribute('id', 'menu');

  const menuContainer = document.createElement('div');
  menuContainer.setAttribute('id', 'menu-el-container');

  const menuItems = document.createElement('div');
  menuItems.setAttribute('id', 'menu-items');


  menuContainer.appendChild(menuItems);
  menu.appendChild(menuContainer);

  const stuff = document.createElement('div');
  stuff.setAttribute('id', 'stuff');

  root.innerHTML = '';
  root.appendChild(menu);
  root.appendChild(stuff);
};

// создание элементов для меню
const createElements = () => {
  const root = document.getElementById('menu-items');
  root.innerHTML = '';

  // основные блоки меню
  Object.keys(menuElements).forEach(function(key) {
    const menuItem = document.createElement('a');
    menuItem.textContent = menuElements[key];
    menuItem.href = `/${key}`;
    menuItem.dataset.section = key;
    root.appendChild(menuItem);
  });

  if (authModule.authHelper()) {
    Object.keys(authElements).forEach(function(key) {
      const menuItem = document.createElement('a');
      menuItem.textContent = authElements[key];
      menuItem.href = `/${key}`;
      menuItem.dataset.section = key;
      root.appendChild(menuItem);
    });
  } else {
    Object.keys(unauthElements).forEach(function(key) {
      const menuItem = document.createElement('a');
      menuItem.textContent = unauthElements[key];
      menuItem.href = `/${key}`;
      menuItem.dataset.section = key;
      root.appendChild(menuItem);
    });
  }
};

export const createMenu = () => {
  createTemplate();
  createElements();
};

application.addEventListener('click', function(event) {
  const {target} = event;

  if (target instanceof HTMLAnchorElement) {
    event.preventDefault();
    menuRoutes[target.dataset.section]();
  }
});


