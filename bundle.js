/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/auth/auth.js":
/*!*************************************!*\
  !*** ./src/components/auth/auth.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"authModule\": () => (/* binding */ authModule)\n/* harmony export */ });\n/* harmony import */ var _utils_validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/validate.js */ \"./src/components/utils/validate.js\");\n/* harmony import */ var _utils_errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/errors.js */ \"./src/components/utils/errors.js\");\n/* harmony import */ var _network_fetch_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../network/fetch.js */ \"./src/components/network/fetch.js\");\n/* harmony import */ var _films_films_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../films/films.js */ \"./src/components/films/films.js\");\n/* harmony import */ var _menu_elements_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../menu/elements.js */ \"./src/components/menu/elements.js\");\n\n\n\n\n\n\nconst authModule = {\n  /**\n   * Создание экрана авторизации\n   * @function\n   * @return {null}\n   */\n  renderAuth: () => renderAuth(),\n  /**\n   * Создание экрана регистрации\n   * @function\n   * @return {null}\n   */\n  renderRegistration: () => renderRegistration(),\n  /**\n   * Удаление текущей сессии пользователя\n   * @function\n   * @return {null}\n   */\n  logOut: () => logOut(),\n  /**\n   * To be Done\n   * @function\n   * @return {null}\n   */\n  renderProfile: () => renderProfile,\n  /**\n   * Вспомогательная функция работы с куки\n   * @function\n   * @return {boolean} - Статус сессии пользователя\n   */\n  authHelper: () => isAuthed(),\n};\n\nconst renderAuth = () => {\n  const root = document.getElementById('stuff');\n  root.innerHTML = '';\n\n  const block = document.createElement('div');\n  block.setAttribute('class', 'registration_block' );\n  root.appendChild(block);\n\n\n  const error = document.createElement('div');\n  error.setAttribute('id', 'error');\n  block.appendChild(error);\n\n  const form = document.createElement('form');\n  block.appendChild(form);\n\n  const inputBlock2 = document.createElement('div');\n  inputBlock2.setAttribute('class', 'input_block');\n  const input2 = document.createElement('input');\n  input2.setAttribute('id', 'login_field');\n  input2.setAttribute('type', 'text');\n  input2.setAttribute('placeholder', 'логин');\n  inputBlock2.appendChild(input2);\n  form.appendChild(inputBlock2);\n\n  const inputBlock3 = document.createElement('div');\n  inputBlock3.setAttribute('class', 'input_block');\n  const input3 = document.createElement('input');\n  input3.setAttribute('id', 'password_field');\n  input3.setAttribute('type', 'password');\n  input3.setAttribute('placeholder', 'пароль');\n  input3.setAttribute('maxlength', '16');\n  inputBlock3.appendChild(input3);\n  form.appendChild(inputBlock3);\n\n  const ok = document.createElement('div');\n  ok.setAttribute('id', 'auth_btn');\n  ok.innerText = 'Войти';\n  form.appendChild(ok);\n\n  // отрисовка темплейта\n  /* const auth = pug.compileFile('/auth/authorization.pug', null);\n      const root = document.getElementById();\n      root.innerHTML = auth;\n      */\n\n  // обработка отправки формы\n  const btn = document.getElementById('auth_btn');\n  form.addEventListener('submit', function(event) {\n    event.preventDefault();\n    const name = document.getElementById('login_field').value;\n    const pwd = document.getElementById('password_field').value;\n\n    let msg = '';\n    if (!_utils_validate_js__WEBPACK_IMPORTED_MODULE_0__.validators.username(name)) {\n      msg += 'Имя должно быть длиннее 3 символов. ';\n      input2.classList.add('invalid');\n    }\n    if (!_utils_validate_js__WEBPACK_IMPORTED_MODULE_0__.validators.password(pwd)) {\n      msg += 'Пароль должен быть от 6 до 16 символов. ';\n      input3.classList.add('invalid');\n    }\n    if (msg !== '') {\n      (0,_utils_errors_js__WEBPACK_IMPORTED_MODULE_1__.showErrors)(msg );\n    } else {\n      const user = {login: name, password: pwd};\n      const url = 'http://3.67.182.34:8000/user/login';\n\n      (0,_network_fetch_js__WEBPACK_IMPORTED_MODULE_2__.fetchRequest)(url, 'POST', user).then(\n          (response) => {\n            if (response.ok) {\n              response.json();\n            } else {\n              throw error;\n            }\n          },\n      ).then(\n          (result) => {\n            document.cookie = `jwt_token = ${result.token}`;\n            (0,_menu_elements_js__WEBPACK_IMPORTED_MODULE_4__.createElements)();\n            (0,_films_films_js__WEBPACK_IMPORTED_MODULE_3__.createFilms)();\n          },\n      ).catch(function(error) {\n        (0,_utils_errors_js__WEBPACK_IMPORTED_MODULE_1__.showErrors)('Что-то пошло не так, попробуйте позже');\n      });\n    }\n  });\n};\n\n// удаление сессии\nconst logOut = () => {\n  const url = 'http://3.67.182.34:8000/user/logout';\n\n  (0,_network_fetch_js__WEBPACK_IMPORTED_MODULE_2__.fetchRequest)(url, 'POST',\n  ).catch(function(error) {\n  });\n\n  document.cookie = 'jwt_token=; Max-Age=-99999999;';\n  (0,_menu_elements_js__WEBPACK_IMPORTED_MODULE_4__.createElements)();\n  (0,_films_films_js__WEBPACK_IMPORTED_MODULE_3__.createFilms)();\n};\n\n// отрисовка профиля\nconst renderProfile = () => {\n  alert('in progress');\n};\n\n\n// отрисовка формы регистрации\nconst renderRegistration = () => {\n  const root = document.getElementById('stuff');\n  root.innerHTML = '';\n\n  const block = document.createElement('div');\n  block.setAttribute('class', 'registration_block' );\n  root.appendChild(block);\n\n\n  const error = document.createElement('div');\n  error.setAttribute('id', 'error');\n  block.appendChild(error);\n\n  const form = document.createElement('form');\n  block.appendChild(form);\n\n  const inputBlock = document.createElement('div');\n  inputBlock.setAttribute('class', 'input_block');\n  const input = document.createElement('input');\n  input.setAttribute('id', 'email_field');\n  input.setAttribute('type', 'email');\n  input.setAttribute('placeholder', 'почта');\n  inputBlock.appendChild(input);\n  form.appendChild(inputBlock);\n\n  const inputBlock2 = document.createElement('div');\n  inputBlock2.setAttribute('class', 'input_block');\n  const input2 = document.createElement('input');\n  input2.setAttribute('id', 'login_field');\n  input2.setAttribute('type', 'text');\n  input2.setAttribute('placeholder', 'логин');\n  inputBlock2.appendChild(input2);\n  form.appendChild(inputBlock2);\n\n  const inputBlock3 = document.createElement('div');\n  inputBlock3.setAttribute('class', 'input_block');\n  const input3 = document.createElement('input');\n  input3.setAttribute('id', 'password_field');\n  input3.setAttribute('type', 'password');\n  input3.setAttribute('placeholder', 'пароль');\n  input3.setAttribute('maxlength', '16');\n  inputBlock3.appendChild(input3);\n  form.appendChild(inputBlock3);\n\n  const ok = document.createElement('div');\n  ok.setAttribute('id', 'registration_btn');\n  ok.innerText = 'Создать';\n  form.appendChild(ok);\n\n  // обработка отправки формы\n  const btn = document.getElementById('registration_btn');\n  btn.addEventListener('click', function(event) {\n    event.preventDefault();\n    console.log('Sign Up');\n    const name = document.getElementById('login_field').value;\n    const pwd = document.getElementById('password_field').value;\n    const email = document.getElementById('email_field').value;\n    let msg = '';\n    if (!_utils_validate_js__WEBPACK_IMPORTED_MODULE_0__.validators.username(name)) {\n      msg += 'Имя должно быть длинее 3 символов. ';\n    }\n    if (!_utils_validate_js__WEBPACK_IMPORTED_MODULE_0__.validators.password(pwd)) {\n      msg += 'Пароль должен быть от 6 до 16 символов. ';\n    }\n    if (!_utils_validate_js__WEBPACK_IMPORTED_MODULE_0__.validators.email(email)) {\n      msg += 'Некорректный формат email-адреса. ';\n    }\n    if (msg !== '') {\n      (0,_utils_errors_js__WEBPACK_IMPORTED_MODULE_1__.showErrors)(msg );\n    } else {\n      const user = {login: name, password: pwd, email: email};\n      const url = 'http://3.67.182.34:8000/user/signup';\n\n      (0,_network_fetch_js__WEBPACK_IMPORTED_MODULE_2__.fetchRequest)(url, 'POST', user).then(\n          (response) => {\n            if (response.ok) {\n              response.json();\n            } else {\n              throw error;\n            }\n          },\n      ).then(\n          (result) => {\n            document.cookie = `jwt_token = ${result.token}`;\n            (0,_menu_elements_js__WEBPACK_IMPORTED_MODULE_4__.createElements)();\n            (0,_films_films_js__WEBPACK_IMPORTED_MODULE_3__.createFilms)();\n          },\n      ).catch(function() {\n        (0,_utils_errors_js__WEBPACK_IMPORTED_MODULE_1__.showErrors)('Что-то пошло не так, попробуйте позже');\n      },\n      );\n    }\n  });\n};\n\nconst isAuthed = () => {\n  return !!document.cookie.split(';').filter((item) =>\n    item.trim().startsWith('jwt_token')).length;\n};\n\n\n//# sourceURL=webpack://2021_2_a06367/./src/components/auth/auth.js?");

/***/ }),

/***/ "./src/components/films/films.js":
/*!***************************************!*\
  !*** ./src/components/films/films.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createFilms\": () => (/* binding */ createFilms)\n/* harmony export */ });\n/* harmony import */ var _utils_errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/errors.js */ \"./src/components/utils/errors.js\");\n\n\n/**\n * Модуль создания экрана фильмов\n * @function\n */\nconst createFilms = () => {\n  createToggle();\n  createBasic();\n};\n\nconst createToggle = () => {\n  const stuff = document.getElementById('stuff');\n  stuff.innerHTML = '';\n  const div = document.createElement('div');\n  div.setAttribute('class', 'toggle-container');\n  stuff.appendChild(div);\n  const input = document.createElement('input');\n  input.dataset.section = 'hottest';\n  input.setAttribute('type', 'radio');\n  input.setAttribute('name', 'radio');\n  input.setAttribute('value', 'radio');\n  input.setAttribute('id', 'hottest');\n  div.appendChild(input);\n  const inputlabel = document.createElement('label');\n\n  inputlabel.setAttribute('for', 'hottest');\n  inputlabel.innerText = 'Популярное';\n  div.appendChild(inputlabel);\n\n\n  const input2 = document.createElement('input');\n  input2.setAttribute('type', 'radio');\n  input2.setAttribute('name', 'radio');\n  input2.setAttribute('value', 'radio2');\n  input2.setAttribute('id', 'newest');\n  input2.dataset.section = 'newest';\n  div.appendChild(input2);\n  const inputlabel2 = document.createElement('label');\n\n  inputlabel2.setAttribute('for', 'newest');\n  inputlabel2.innerText = 'Новое';\n  div.appendChild(inputlabel2);\n\n  div.addEventListener('click', function(event) {\n    const {target} = event;\n    if (target instanceof HTMLInputElement) {\n      event.preventDefault();\n      if (div.classList.contains('newest')) {\n        div.classList.add('hottest');\n        div.classList.remove('newest');\n        showFilms('hottest');\n      } else {\n        div.classList.add('newest');\n        div.classList.remove('hottest');\n        showFilms('newest');\n      }\n    }\n  });\n};\n\nconst createBasic = () => {\n  const stuff = document.getElementById('stuff');\n  const div = document.createElement('div');\n  div.setAttribute('id', 'films-container');\n  stuff.appendChild(div);\n};\n\n\nconst showFilms = (state) => {\n  const url = 'http://3.67.182.34:8000/films/selection/'+state;\n  fetch(url, {\n    method: 'GET',\n  },\n  ).then(\n      (response) => response.json(),\n  ).then(\n      (result) => {\n        const root = document.getElementById('films-container');\n        root.innerHTML = '';\n        for (let i = 0; i < result.length; i++) {\n          const film = document.createElement('div');\n          film.setAttribute('class', 'film-item');\n          film.setAttribute('id', result[i].id);\n          const div = document.createElement('div');\n          div.setAttribute('class', 'dot');\n          // div.innerText = result[i].title.slice(0,1);\n          film.appendChild(div);\n          const title = document.createElement('div');\n          title.setAttribute('class', 'centered');\n          title.innerText = result[i].title;\n          film.appendChild(title);\n          const desc = document.createElement('div');\n          desc.setAttribute('class', 'centered');\n          desc.innerText = result[i].genres.join();\n          film.appendChild(desc);\n          root.appendChild(film);\n        }\n      },\n  ).catch((error) => {\n    (0,_utils_errors_js__WEBPACK_IMPORTED_MODULE_0__.showErrors)('');\n  },\n  );\n};\n\n\n//# sourceURL=webpack://2021_2_a06367/./src/components/films/films.js?");

/***/ }),

/***/ "./src/components/menu/elements.js":
/*!*****************************************!*\
  !*** ./src/components/menu/elements.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createElements\": () => (/* binding */ createElements)\n/* harmony export */ });\n/* harmony import */ var _auth_auth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../auth/auth.js */ \"./src/components/auth/auth.js\");\n// элементы меню\n\n\nconst menuElements = {\n  films: 'Фильмы',\n};\n\n// элементы для зарегистрированных пользователей\nconst authElements = {\n  profile: 'Профиль',\n  logout: 'Выйти',\n};\n\n// элементы для незарегистрированных пользователей\nconst unauthElements = {\n  login: 'Войти',\n  signup: 'Регистрация',\n};\n\n\n/**\n * Модуль создания элементов меню\n * @function\n */\n// создание элементов для меню\nconst createElements = () => {\n  const root = document.getElementById('menu-items');\n  root.innerHTML = '';\n\n  // основные блоки меню\n  Object.keys(menuElements).forEach(function(key) {\n    const menuItem = document.createElement('a');\n    menuItem.textContent = menuElements[key];\n    menuItem.href = `/${key}`;\n    menuItem.dataset.section = key;\n    root.appendChild(menuItem);\n  });\n\n  if (_auth_auth_js__WEBPACK_IMPORTED_MODULE_0__.authModule.authHelper()) {\n    Object.keys(authElements).forEach(function(key) {\n      const menuItem = document.createElement('a');\n      menuItem.textContent = authElements[key];\n      menuItem.href = `/${key}`;\n      menuItem.dataset.section = key;\n      root.appendChild(menuItem);\n    });\n  } else {\n    Object.keys(unauthElements).forEach(function(key) {\n      const menuItem = document.createElement('a');\n      menuItem.textContent = unauthElements[key];\n      menuItem.href = `/${key}`;\n      menuItem.dataset.section = key;\n      root.appendChild(menuItem);\n    });\n  }\n};\n\n\n//# sourceURL=webpack://2021_2_a06367/./src/components/menu/elements.js?");

/***/ }),

/***/ "./src/components/menu/menu.js":
/*!*************************************!*\
  !*** ./src/components/menu/menu.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createMenu\": () => (/* binding */ createMenu)\n/* harmony export */ });\n/* harmony import */ var _films_films_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../films/films.js */ \"./src/components/films/films.js\");\n/* harmony import */ var _auth_auth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../auth/auth.js */ \"./src/components/auth/auth.js\");\n/* harmony import */ var _elements_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./elements.js */ \"./src/components/menu/elements.js\");\n\n// const pug = require('pug');\n\n\n\n\nconst application = document.getElementById('root');\n\n\n// элементы роутинга\nconst menuRoutes = {\n  films: _films_films_js__WEBPACK_IMPORTED_MODULE_0__.createFilms,\n  profile: _auth_auth_js__WEBPACK_IMPORTED_MODULE_1__.authModule.renderProfile,\n  login: _auth_auth_js__WEBPACK_IMPORTED_MODULE_1__.authModule.renderAuth,\n  signup: _auth_auth_js__WEBPACK_IMPORTED_MODULE_1__.authModule.renderRegistration,\n  logout: _auth_auth_js__WEBPACK_IMPORTED_MODULE_1__.authModule.logOut,\n};\n\n// загрузка меню из темплейта\nconst createTemplate = () => {\n  const cf = pug.compileFile('./menu.pug');\n  console.log(cf);\n\n  const root = document.getElementById('root');\n  const menu = document.createElement('div');\n  menu.setAttribute('id', 'menu');\n\n  const menuContainer = document.createElement('div');\n  menuContainer.setAttribute('id', 'menu-el-container');\n\n  const menuItems = document.createElement('div');\n  menuItems.setAttribute('id', 'menu-items');\n\n\n  menuContainer.appendChild(menuItems);\n  menu.appendChild(menuContainer);\n\n  const stuff = document.createElement('div');\n  stuff.setAttribute('id', 'stuff');\n\n  root.innerHTML = '';\n  root.appendChild(menu);\n  root.appendChild(stuff);\n};\n\n\n/**\n * Модуль создания меню\n * Генерирует элементы меню\n * @function\n */\nconst createMenu = () => {\n  createTemplate();\n  (0,_elements_js__WEBPACK_IMPORTED_MODULE_2__.createElements)();\n};\n\napplication.addEventListener('click', function(event) {\n  const {target} = event;\n\n  if (target instanceof HTMLAnchorElement) {\n    event.preventDefault();\n    menuRoutes[target.dataset.section]();\n  }\n});\n\n\n\n\n//# sourceURL=webpack://2021_2_a06367/./src/components/menu/menu.js?");

/***/ }),

/***/ "./src/components/network/fetch.js":
/*!*****************************************!*\
  !*** ./src/components/network/fetch.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"fetchRequest\": () => (/* binding */ fetchRequest)\n/* harmony export */ });\n/**\n * Модуль работы с сетью\n * @function\n * @param {string} url - URL запроса\n * @param {string} method - Метод запроса\n * @param {Object} body - Тело запроса (если есть)\n * @param {Object} headers - Заголовки запроса (если есть)\n * @return {Promise} promise - Объект запроса\n */\nconst fetchRequest = (url, method = 'POST', body = null,\n    headers = {}) => {\n  const options = {\n    method: method,\n    body: body == null ? null : JSON.stringify(body),\n    headers: headers,\n  };\n  return fetch(url, options);\n};\n\n\n//# sourceURL=webpack://2021_2_a06367/./src/components/network/fetch.js?");

/***/ }),

/***/ "./src/components/utils/errors.js":
/*!****************************************!*\
  !*** ./src/components/utils/errors.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"showErrors\": () => (/* binding */ showErrors)\n/* harmony export */ });\n/**\n * Отрисовывает элемент-ошибку с кастомным текстом\n * @param {string} text - Текст ошибки\n */\nconst showErrors = (text = '') => {\n  const root = document.getElementById('error');\n  root.innerHTML = '';\n\n  const msg = document.createElement('p');\n  msg.textContent = text;\n  root.appendChild(msg);\n};\n\n\n//# sourceURL=webpack://2021_2_a06367/./src/components/utils/errors.js?");

/***/ }),

/***/ "./src/components/utils/validate.js":
/*!******************************************!*\
  !*** ./src/components/utils/validate.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"validators\": () => (/* binding */ validators)\n/* harmony export */ });\n\nconst validators = {\n  /**\n   * Проверяет валидность адреса почты\n   * @function\n   * @param {string} email - Адрес почты\n   * @return {boolean} - Флаг соответсвия адреса требованиям\n   */\n  email: (email= '') => validateEmail(email),\n  /**\n   * Проверяет валидность адреса почты\n   * @function\n   * @param {string} username - Имя пользователя (юзернейм)\n   * @return {boolean} - Флаг соответсвия юзернейма требованиям\n   */\n  username: (username) => validateUsername(username),\n  /**\n   * Проверяет валидность пароля\n   * @function\n   * @param {string} password - Пользовательский пароль в открытом виде\n   * @return {boolean} - Флаг соответсвия пароля требованиям\n   */\n  password: (password) => validatePassword(password),\n};\n\nconst MIN_PATH_LENGTH = 6;\nconst MAX_PATH_LENGTH = 16;\nconst MIN_USERNAME_LENGTH = 4;\nconst emailCheck =\n    /^[^\\\\s@]+@[^\\\\s@]+.[^\\\\s@]+$/;\n\nconst validateEmail = (email = '') => {\n  return emailCheck.test(email);\n};\n\nconst validateUsername = (username) => {\n  return username.length >= MIN_USERNAME_LENGTH;\n};\n\nconst validatePassword = (password) => {\n  return password.length >= MIN_PATH_LENGTH &&\n      password.length <= MAX_PATH_LENGTH;\n};\n\n\n//# sourceURL=webpack://2021_2_a06367/./src/components/utils/validate.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_menu_menu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/menu/menu.js */ \"./src/components/menu/menu.js\");\n/* harmony import */ var _components_films_films_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/films/films.js */ \"./src/components/films/films.js\");\n\n\n\n\n(0,_components_menu_menu_js__WEBPACK_IMPORTED_MODULE_0__.createMenu)();\n(0,_components_films_films_js__WEBPACK_IMPORTED_MODULE_1__.createFilms)();\n\n\n//# sourceURL=webpack://2021_2_a06367/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;