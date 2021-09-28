'use strict';

import {createFilms} from '../films/films.js';
import {showErrors} from '../utils/errors.js';
import {fetchRequest} from '../network/fetch.js';
import {validators} from '../utils/validate.js';

const application = document.getElementById('root');

// удаление сессии
const logOut = () => {
  const url = 'http://127.0.0.1:8000/user/logout';

  fetch(url, {
    method: 'POST',
  },
  ).catch(function(error) {
  });

  document.cookie = 'jwt_token=; Max-Age=-99999999;';
  createElements();
  createFilms();
};

// отрисовка профиля
const renderProfile = () => {
  const isAuthed = sessionStorage.getItem('jwt_token');
  if (isAuthed !== null) {
    renderAuth();
  } else {
    renderRegistration();
  }
};

// отрисовка формы логина
const renderAuth = () => {
  const root = document.getElementById('stuff');
  root.innerHTML = '';

  const block = document.createElement('div');
  block.setAttribute('class', 'registration_block' );
  root.appendChild(block);


  const error = document.createElement('div');
  error.setAttribute('id', 'error');
  block.appendChild(error);

  const form = document.createElement('form');
  block.appendChild(form);

  const inputBlock2 = document.createElement('div');
  inputBlock2.setAttribute('class', 'input_block');
  const input2 = document.createElement('input');
  input2.setAttribute('id', 'login_field');
  input2.setAttribute('type', 'text');
  input2.setAttribute('placeholder', 'логин');
  inputBlock2.appendChild(input2);
  form.appendChild(inputBlock2);

  const inputBlock3 = document.createElement('div');
  inputBlock3.setAttribute('class', 'input_block');
  const input3 = document.createElement('input');
  input3.setAttribute('id', 'password_field');
  input3.setAttribute('type', 'password');
  input3.setAttribute('placeholder', 'пароль');
  inputBlock3.appendChild(input3);
  form.appendChild(inputBlock3);

  const ok = document.createElement('div');
  ok.setAttribute('id', 'auth_btn');
  ok.innerText = 'Войти';
  form.appendChild(ok);

  // отрисовка темплейта
  /* const auth = pug.compileFile('/auth/authorization.pug', null);
    const root = document.getElementById();
    root.innerHTML = auth;
    */

  // обработка отправки формы
  const btn = document.getElementById('auth_btn');
  btn.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('Login');
    const name = document.getElementById('login_field').value;
    const pwd = document.getElementById('password_field').value;

    let msg = '';
    if (!validators.username(name)) {
      msg += 'Имя должно быть длинее 3 символов.';
      input2.classList.add('invalid');
    }
    if (!validators.password(pwd)) {
      msg += 'Пароль должен быть от 6 до 16 символов.';
      input3.classList.add('invalid');
    }
    if (!(validators.username(name) && validators.password(pwd))) {
      showErrors(msg );
    } else {
      const user = {login: name, password: pwd};
      const url = 'http://127.0.0.1:8000/user/login';

      fetchRequest(url, 'POST', user).then(
          (response) => response.json(),
      ).then(
          (result) => {
            document.cookie = `jwt_token = ${result.token}`;
            createElements();
          },
      ).catch(function(error) {
        console.log(error);
        showErrors('Network Error');
      });
    }
  });
};

// отрисовка формы регистрации
const renderRegistration = () => {
  const root = document.getElementById('stuff');
  root.innerHTML = '';

  const block = document.createElement('div');
  block.setAttribute('class', 'registration_block' );
  root.appendChild(block);


  const error = document.createElement('div');
  error.setAttribute('id', 'error');
  block.appendChild(error);

  const form = document.createElement('form');
  block.appendChild(form);

  const inputBlock = document.createElement('div');
  inputBlock.setAttribute('class', 'input_block');
  const input = document.createElement('input');
  input.setAttribute('id', 'email_field');
  input.setAttribute('type', 'email');
  input.setAttribute('placeholder', 'почта');
  inputBlock.appendChild(input);
  form.appendChild(inputBlock);

  const inputBlock2 = document.createElement('div');
  inputBlock2.setAttribute('class', 'input_block');
  const input2 = document.createElement('input');
  input2.setAttribute('id', 'login_field');
  input2.setAttribute('type', 'text');
  input2.setAttribute('placeholder', 'логин');
  inputBlock2.appendChild(input2);
  form.appendChild(inputBlock2);

  const inputBlock3 = document.createElement('div');
  inputBlock3.setAttribute('class', 'input_block');
  const input3 = document.createElement('input');
  input3.setAttribute('id', 'password_field');
  input3.setAttribute('type', 'password');
  input3.setAttribute('placeholder', 'пароль');
  inputBlock3.appendChild(input3);
  form.appendChild(inputBlock3);

  const ok = document.createElement('div');
  ok.setAttribute('id', 'registration_btn');
  ok.innerText = 'Зарегистрироваться';
  form.appendChild(ok);

  // обработка отправки формы
  const btn = document.getElementById('registration_btn');
  btn.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('Sign Up');
    const name = document.getElementById('login_field').value;
    const pwd = document.getElementById('password_field').value;
    const email = document.getElementById('email_field').value;
    let msg = '';
    if (!validators.username(name)) {
      msg += 'Имя должно быть длинее 3 символов.';
    }
    if (!validators.password(pwd)) {
      msg += 'Пароль должен быть от 6 до 16 символов.';
    }
    if (!validators.email(email)) {
      msg += 'Некорректный формат email-адреса.';
    }
    if (msg !== '') {
      showErrors(msg );
    } else {
      const user = {login: name, password: pwd, email: email};
      const url = 'http://127.0.0.1:8000/user/signup';

      fetchRequest(url, 'POST', user).then(
          (response) => response.json(),
      ).then(
          (result) => {
            document.cookie = `jwt_token = ${result.token}`;
            createElements();
          },
      ).catch(function() {
        showErrors('');
      },
      );
    }
  });
};

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
  profile: renderProfile,
  login: renderAuth,
  signup: renderRegistration,
  logout: logOut,
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

  if (isAuthed()) {
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

const isAuthed = () => {
  return !!document.cookie.split(';').filter((item) =>
    item.trim().startsWith('jwt_token')).length;
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


