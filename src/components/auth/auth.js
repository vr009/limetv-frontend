import {validators} from '../utils/validate.js';
import {showErrors} from '../utils/errors.js';
import {fetchRequest} from '../network/fetch.js';
import {serverLocate} from '../../utils/locale.js';
import {createFilms} from '../films/films.js';
import {createElements} from '../menu/elements.js';
import Router from '../../utils/router';
import RegistrationPug from '../pages/auth/registration.pug';
import AuthPug from '../pages/auth/authorization.pug'

const prefixUrlDEBUG = 'http://localhost';
const prefixUrlDEPLOY = 'http://3.67.182.34';
const port = ':8000';

export const authModule = {
  /**
   * Создание экрана авторизации
   * @function
   * @return {null}
   */
  renderAuth: () => renderAuth(),
  /**
   * Создание экрана регистрации
   * @function
   * @return {null}
   */
  renderRegistration: () => renderRegistration(),
  /**
   * Удаление текущей сессии пользователя
   * @function
   * @return {null}
   */
  logOut: () => logOut(),
  /**
   * To be Done
   * @function
   * @return {null}
   */
  renderProfile: () => renderProfile,
  /**
   * Вспомогательная функция работы с куки
   * @function
   * @return {boolean} - Статус сессии пользователя
   */
  authHelper: () => isAuthed(false),
};

export const renderAuth = () => {
  const root = document.getElementById('stuff');
  root.innerHTML = '';

  const reg = document.createElement('div');
  root.appendChild(reg);

  reg.innerHTML = AuthPug();

  const eye = document.getElementById('icon');
  eye.addEventListener('click', function(event) {
    event.preventDefault();
    const passField = document.getElementById('password_field');
    const icon = document.getElementById('icon');

    if (passField.type === 'password') {
      passField.type = 'text';
      icon.classList.add('selected');
    } else {
      passField.type = 'password';
      icon.classList.remove('selected');
    }
  });

  // обработка отправки формы
  const form = document.getElementById('form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('login_field').value;
    const pwd = document.getElementById('password_field').value;

    let msg = '';
    if (!validators.username(name)) {
      msg += 'Имя должно быть длиннее 3 символов. ';
    }
    if (!validators.password(pwd)) {
      msg += 'Пароль должен быть от 6 до 16 символов. ';
    }
    if (msg !== '') {
      showErrors(msg );
    } else {
      const user = {login: name, password: pwd};
      const url = serverLocate+'/users/login';
      // 3.67.182.34
      fetchRequest(url, 'POST', user).then((result)=>{
        if (!result.ok) {
          throw error;
        }
      }).then(
          (result) => {
            Router.go('/', 'LimeTV', null, true, true);
          },
      ).catch(function(error) {
        showErrors('Неверный логин или пароль');
      });
    }
  });
};

// удаление сессии
export const logOut = () => {
  const url = serverLocate+'/users/logout';

  fetchRequest(url, 'POST',
  ).catch(function(error) {
  });

  createElements();
  createFilms();
  Router.go('/', 'LimeTV', null, true, false);
};

// отрисовка профиля
const renderProfile = () => {
  console.log('need fetch here');
};


// отрисовка формы регистрации
export const renderRegistration = () => {
  const root = document.getElementById('stuff');
  root.innerHTML = '';

  const block = document.createElement('img');
  block.setAttribute('class', 'registration-back');
  block.setAttribute('src', 'registration.png');

  const register = document.createElement('div');
  register.setAttribute('id', 'register');
  block.appendChild(register);
  root.appendChild(block);

  const reg = document.createElement('div');
  root.appendChild(reg);

  reg.innerHTML = RegistrationPug();

  const eye = document.getElementById('icon');
  eye.addEventListener('click', function(event) {
    event.preventDefault();
    const passField = document.getElementById('password_field');
    const icon = document.getElementById('icon');

    if (passField.type === 'password') {
      passField.type = 'text';
      icon.classList.add('selected');
    } else {
      passField.type = 'password';
      icon.classList.remove('selected');
    }
  });

  // обработка отправки формы
  const form = document.getElementById('form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('login_field').value;
    const pwd = document.getElementById('password_field').value;
    let msg = '';
    if (!validators.username(name)) {
      msg += 'Имя должно быть длинее 3 символов. ';
    }
    if (!validators.password(pwd)) {
      msg += 'Пароль должен быть от 6 до 16 символов. ';
    }
    if (msg !== '') {
      showErrors(msg );
    } else {
      const user = {login: name, password: pwd};
      const url = serverLocate+'/users/signup';

      fetchRequest(url, 'POST', user).then((result)=>{
        if (!result.ok) {
          throw error;
        }
      }).then(
          (result) => {
            Router.go('/', 'LimeTV', null, true, true);
          },
      ).catch(function() {
        showErrors('Пользователь с таким именем уже существует');
      },
      );
    }
  });
};

const isAuthed = (code) => {
  return (code === 200);
};


