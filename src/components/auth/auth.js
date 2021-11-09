import {validators} from '../utils/validate.js';
import {showErrors} from '../utils/errors.js';
import {fetchRequest} from '../network/fetch.js';
import {createFilms} from '../films/films.js';
import {createElements} from '../menu/elements.js';
import {createProfile} from '../profile/profile'
import Router from '../../utils/router';


const prefixUrlDEBUG = 'http://localhost'
const prefixUrlDEPLOY = 'http://3.67.182.34'
const port = ':8000'

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

  const ok = document.createElement('button');
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
  form.addEventListener('submit', function(event) {
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
      const url = 'http://localhost:8000/users/login';
      // 3.67.182.34
      fetchRequest(url, 'POST', user).then().then(
          (result) => {
            Router.go("/","main", null, true, true);
          },
      ).catch(function(error) {
        showErrors('Что-то пошло не так, попробуйте позже');
      });
    }
  });
};

// удаление сессии
const logOut = () => {
  const url = 'http://localhost:8000/users/logout';

  fetchRequest(url, 'POST',
  ).catch(function(error) {
  });

  createElements();
  createFilms();
};

// отрисовка профиля
const renderProfile = () => {

  console.log('need fetch here');
};


// отрисовка формы регистрации
export const renderRegistration = () => {
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

  // const inputBlock = document.createElement('div');
  // inputBlock.setAttribute('class', 'input_block');
  // const input = document.createElement('input');
  // input.setAttribute('id', 'email_field');
  // input.setAttribute('type', 'email');
  // input.setAttribute('placeholder', 'почта');
  // inputBlock.appendChild(input);
  // form.appendChild(inputBlock);

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

  const ok = document.createElement('button');
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
    // const email = document.getElementById('email_field').value;
    let msg = '';
    if (!validators.username(name)) {
      msg += 'Имя должно быть длинее 3 символов. ';
    }
    if (!validators.password(pwd)) {
      msg += 'Пароль должен быть от 6 до 16 символов. ';
    }
    // if (!validators.email(email)) {
    //   msg += 'Некорректный формат email-адреса. ';
    // }
    if (msg !== '') {
      showErrors(msg );
    } else {
      const user = {login: name, password: pwd};
      const url = 'http://localhost:8000/users/signup';

      fetchRequest(url, 'POST', user).then().then(
          (result) => {
            Router.go("/","main", null, true, true);
          },
      ).catch(function() {
        showErrors('Что-то пошло не так, попробуйте позже');
      },
      );
    }
  });
};

const isAuthed = (code) => {
  return (code === 200);
};


