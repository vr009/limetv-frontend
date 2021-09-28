'use strict';

import {createFilms} from '../films/films.js';
import {authModule} from '../auth/auth.js';
import {createElements} from './elements.js';

const application = document.getElementById('root');


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


/**
 * Модуль создания меню
 * Генерирует элементы меню
 * @function
 */
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


