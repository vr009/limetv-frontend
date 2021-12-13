'use strict';
import {createElements} from './elements.js';
import {serverLocate} from '../../utils/locale.js';
import Router from '../../utils/router.js';
import '../pages/menu/menu.scss';
import menuPug from '../pages/menu/menu.pug';
import {createSearchPage} from '../search/search.js';
import searchPagePug from '../pages/search/search.pug';

const application = document.getElementById('root');

const goMain = () => {
  Router.go('/', 'LimeTV');
};

const goActor = () => {
  Router.go('/actor', 'Актер'); // временно
};

const goSignup = () => {
  Router.go('/signup', 'Регистрация');
};

const goLogin = () => {
  Router.go('/login', 'Вход');
};

const goProfile = () => {
  Router.go('/profile', 'Профиль');
};

const goLogout = () => {
  Router.go('/logout', 'Выход', null, true, false);
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
  const searchBtn = document.querySelector('.container-new-search__btn');
  const cancelBtn = document.querySelector('.container-new-cancel__btn');
  const form = document.querySelector('form');
  cancelBtn.onclick = ()=>{
    searchBtn.classList.remove('hide');
    cancelBtn.classList.remove('show');
    form.classList.remove('active');
  };
  searchBtn.onclick = ()=>{
    form.classList.add('active');
    searchBtn.classList.add('hide');
    cancelBtn.classList.add('show');
  };

  const search = document.getElementById('text_search');
  const openSearch = document.getElementById('open-s');
  openSearch.addEventListener('click', function(event) {
    event.preventDefault();
    const navbar = document.getElementById('navbar');
    const navbarToggle = navbar.querySelector('.container-new__toggle');
    navbar.classList.remove('opened');
    navbarToggle.setAttribute('aria-expanded', 'false');
  });

  search.addEventListener('focus', function(event) {
    event.preventDefault();
    if (document.getElementById('close_focus') == null) {
      const search = document.getElementById('stuff');
      const me = document.createElement('div');
      me.setAttribute('class', 'root__search');
      me.setAttribute('id', 'close_focus');
      search.appendChild(me);
      const root = document.getElementById('close_focus');
      const result = {'actors': [], 'films': []};
      root.innerHTML = searchPagePug({result: result, isResult: false});

      const closeSearch = document.getElementById('cl-search');
      closeSearch.addEventListener('click', function(event) {
        event.preventDefault();
        searchBtn.classList.remove('hide');
        cancelBtn.classList.remove('show');
        form.classList.remove('active');
        const search = document.getElementById('close_focus');
        search.parentNode.removeChild(search);
        const searchForm = document.getElementById('text_search');
        searchForm.value = '';
      });
    }
  });

  let time;
  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('input', function(event) {
    event.preventDefault();
    clearTimeout(time);
    time = setTimeout(createSearchPage, 400, search.value);
  });

  // Enter заблокирован тк у нас уже событие input
  searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
  });
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
