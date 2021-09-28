import {validators} from '../utils/validate.js';
import {showErrors} from '../utils/errors.js';
import {fetchRequest} from '../network/fetch.js';
import {createFilms} from '../films/films.js';
import {createElements} from '../menu/elements.js';

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
  authHelper: () => isAuthed(),
};

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
  input3.setAttribute('maxlength', '16');
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
    const name = document.getElementById('login_field').value;
    const pwd = document.getElementById('password_field').value;

    let msg = '';
    if (!validators.username(name)) {
      msg += 'Имя должно быть длиннее 3 символов. ';
      input2.classList.add('invalid');
    }
    if (!validators.password(pwd)) {
      msg += 'Пароль должен быть от 6 до 16 символов. ';
      input3.classList.add('invalid');
    }
    if (msg !== '') {
      showErrors(msg );
    } else {
      const user = {login: name, password: pwd};
      const url = 'http://127.0.0.1:8000/user/login';

      fetchRequest(url, 'POST', user).then(
          (response) => {
            if (response.ok) {
              response.json();
            } else {
              throw error;
            }
          },
      ).then(
          (result) => {
            document.cookie = `jwt_token = ${result.token}`;
            createElements();
            createFilms();
          },
      ).catch(function(error) {
        showErrors('Что-то пошло не так, попробуйте позже');
      });
    }
  });
};

// удаление сессии
const logOut = () => {
  const url = 'http://127.0.0.1:8000/user/logout';

  fetchRequest(url, 'POST',
  ).catch(function(error) {
  });

  document.cookie = 'jwt_token=; Max-Age=-99999999;';
  createElements();
  createFilms();
};

// отрисовка профиля
const renderProfile = () => {
  alert('in progress');
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
  input3.setAttribute('maxlength', '16');
  inputBlock3.appendChild(input3);
  form.appendChild(inputBlock3);

  const ok = document.createElement('div');
  ok.setAttribute('id', 'registration_btn');
  ok.innerText = 'Создать';
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
      msg += 'Имя должно быть длинее 3 символов. ';
    }
    if (!validators.password(pwd)) {
      msg += 'Пароль должен быть от 6 до 16 символов. ';
    }
    if (!validators.email(email)) {
      msg += 'Некорректный формат email-адреса. ';
    }
    if (msg !== '') {
      showErrors(msg );
    } else {
      const user = {login: name, password: pwd, email: email};
      const url = 'http://127.0.0.1:8000/user/signup';

      fetchRequest(url, 'POST', user).then(
          (response) => {
            if (response.ok) {
              response.json();
            } else {
              throw error;
            }
          },
      ).then(
          (result) => {
            document.cookie = `jwt_token = ${result.token}`;
            createElements();
            createFilms();
          },
      ).catch(function() {
        showErrors('Что-то пошло не так, попробуйте позже');
      },
      );
    }
  });
};

const isAuthed = () => {
  return !!document.cookie.split(';').filter((item) =>
    item.trim().startsWith('jwt_token')).length;
};
