'use strict';
// const pug = require('pug');
import {createFilms} from '../films/films.js';
import {authModule} from '../auth/auth.js';
import {createElements} from './elements.js';
import Router from '../../utils/router';
import '../pages/menu/menu.css'

const application = document.getElementById('root');

const goMain = () => {
  Router.go("/","Main");
}

const goSignup = () => {
  Router.go("/signup","signup");
}

const goLogin = () => {
  Router.go("/login","login");
}

const goProfile = () => {
  console.log("11111");
  Router.go("/profile","profile");
}

const goLogout = () => {
  Router.go("/logout","logout");
}

// элементы роутинга
const menuRoutes = {
  films: goMain,
  profile: goProfile,
  login: goLogin,
  signup: goSignup,
  logout: goLogout,
};

// загрузка меню из темплейта
const createTemplate = () => {
  // const cf = pug.compileFile('./menu.pug');
  // console.log(cf);

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
  const url = 'http://127.0.0.1:8000/users/auth';
  fetch(url, {
        method: 'GET',
        credentials: 'include',
      },
  ).then(
      (response) => {
        if (!response.ok) {
          throw error;
        }
      },
  ).then(
      (result) => {
        createElements(true);
      },
  ).catch((error) => {
        createElements(false);
      },
  );
};


application.addEventListener('click', function(event) {
  const {target} = event;

  if (target instanceof HTMLAnchorElement) {
    event.preventDefault();
    menuRoutes[target.dataset.section]();
  }
});
