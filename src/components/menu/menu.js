'use strict';
import {createElements} from './elements.js';
import {serverLocate} from '../../utils/locale.js';
import Router from '../../utils/router';
import '../pages/menu/menu.css';
import menuPug from '../pages/menu/menu.pug';
import {createProfilePage} from "../../view/createProfilePage";

const application = document.getElementById('root');

const goMain = () => {
  Router.go('/', 'Main');
};

const goActor = () => {
  Router.go('/actor', 'actor'); // временно
};

const goSignup = () => {
  Router.go('/signup', 'signup');
};

const goLogin = () => {
  Router.go('/login', 'login');
};

const goProfile = () => {
  Router.go('/profile', 'profile');
};


const goLogout = () => {
  Router.go('/logout', 'logout', null, true, false);
};

// элементы роутинга
const menuRoutes = {
  films: goMain,
  profile: goProfile,
  login: goLogin,
  signup: goSignup,
  logout: goLogout,
  actor: goActor, // временно
};

// загрузка меню из темплейта
const createTemplate = () => {
  const root = document.getElementById('root');
  root.innerHTML = menuPug();
};


/**
 * Модуль создания меню
 * Генерирует элементы меню
 * @function
 */
export const createMenu = () => {
  createTemplate();
  const url = serverLocate+'/users/auth';
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
