'use strict';

import {createFilms} from '../films/films.js';

const application = document.getElementById('root');

//отрисовка профиля
const renderProfile = () => {
    let isAuthed = sessionStorage.getItem("jwt_token");
    if (isAuthed !== null) {
        renderAuth();
    } else {
        renderRegistration();
    }
}

//отрисовка формы логина
const renderAuth = () => {
    const root = document.getElementById('stuff');
    root.innerHTML = '';

    const block = document.createElement('div');
    block.setAttribute('class','registration_block' )
    root.appendChild(block);


    const error = document.createElement('div');
    error.setAttribute('id', 'error');
    block.appendChild(error);

    const form = document.createElement('form');
    block.appendChild(form);

    const input_block2 = document.createElement('div');
    input_block2.setAttribute('class', 'input_block');
    const input2 = document.createElement('input');
    input2.setAttribute('id', 'login_field');
    input2.setAttribute('type', "text");
    input_block2.appendChild(input2);
    form.appendChild(input_block2);

    const input_block3 = document.createElement('div');
    input_block3.setAttribute('class', 'input_block');
    const input3 = document.createElement('input');
    input3.setAttribute('id', 'password_field');
    input3.setAttribute('type', "password");
    input_block3.appendChild(input3);
    form.appendChild(input_block3);

    const ok = document.createElement('div');
    ok.setAttribute('id', 'auth_btn');
    form.appendChild(ok);

    //отрисовка темплейта
    /*const auth = pug.compileFile('/auth/authorization.pug', null);
    const root = document.getElementById();
    root.innerHTML = auth;
    */

    //обработка отправки формы
    const btn = document.getElementById('auth_btn');
    btn.addEventListener('click', function (event) {
        event.preventDefault();
        console.log('Login');
        const name =  document.getElementById('login_field').value;
        const pwd =  document.getElementById('password_field').value;

        const user = {login: name, password: pwd};
        const url = 'http://127.0.0.1:8000/user/login';

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(user),
            }
        ).then(
            response => response.json()
        ).then(
            result => {
                sessionStorage.setItem("jwt_token", result.Token);

                const root = document.getElementById('menu-items');
                root.childNodes.item(2).remove();
                root.childNodes.item(2).remove();

            }
        ).catch(function(error) {
                ShowErrors('');
            }
        )
    })
}

//отрисовка формы регистрации
const renderRegistration = () => {
    const root = document.getElementById('stuff');
    root.innerHTML = '';

    const block = document.createElement('div');
    block.setAttribute('class','registration_block' )
    root.appendChild(block);


    const error = document.createElement('div');
    error.setAttribute('id', 'error');
    block.appendChild(error);

    const form = document.createElement('form');
    block.appendChild(form);

    const input_block = document.createElement('div');
    input_block.setAttribute('class', 'input_block');
    const input = document.createElement('input');
    input.setAttribute('id', 'email_field');
    input.setAttribute('type', "email");
    input_block.appendChild(input);
    form.appendChild(input_block);

    const input_block2 = document.createElement('div');
    input_block2.setAttribute('class', 'input_block');
    const input2 = document.createElement('input');
    input2.setAttribute('id', 'login_field');
    input2.setAttribute('type', "text");
    input_block2.appendChild(input2);
    form.appendChild(input_block2);

    const input_block3 = document.createElement('div');
    input_block3.setAttribute('class', 'input_block');
    const input3 = document.createElement('input');
    input3.setAttribute('id', 'password_field');
    input3.setAttribute('type', "password");
    input_block3.appendChild(input3);
    form.appendChild(input_block3);

    const ok = document.createElement('div');
    ok.setAttribute('id', 'registration_btn');
    form.appendChild(ok);

    //обработка отправки формы
    const btn = document.getElementById('registration_btn');
    btn.addEventListener('click', function (event) {
        event.preventDefault();
        console.log('Sign Up');
        const name =  document.getElementById('login_field').value;
        const pwd =  document.getElementById('password_field').value;
        const email =  document.getElementById('email_field').value;

        const user = {login: name, password: pwd, email: email};
        const url = 'http://127.0.0.1:8000/user/signup';

        fetch(url, {
                method: 'POST',
                body: JSON.stringify(user),
            }
        ).then(
            response => response.json()
        ).then(
            result => {
                sessionStorage.setItem("jwt_token", result.Token);

                const root = document.getElementById('menu-items');
                root.childNodes.item(2).remove();
                root.childNodes.item(2).remove();

                }
        ).catch(function(error) {
                ShowErrors('');
            }
        )
    })
}

// элементы меню
const menuElements = {
    films: 'Фильмы',
    profile: 'Профиль',
    login: 'Login',
    signup: 'SignUp'
};

// элементы роутинга
const menuRoutes = {
    films: createFilms,
    profile: renderProfile,
    login: renderAuth,
    signup: renderRegistration
};

// загрузка меню из темплейта
const createTemplate = () => {

    const root = document.getElementById('root');
    const menu = document.createElement('div');
    menu.setAttribute('id', 'menu');

    const menu_container = document.createElement('div');
    menu_container.setAttribute('id', 'menu-el-container');

    const menu_items = document.createElement('div');
    menu_items.setAttribute('id', 'menu-items');


    menu_container.appendChild(menu_items);
    menu.appendChild(menu_container);

    const stuff = document.createElement('div');
    stuff.setAttribute('id', 'stuff');

    root.innerHTML = '';
    root.appendChild(menu);
    root.appendChild(stuff);
};

//создание элементов для меню
const createElements = () => {
    const root = document.getElementById('menu-items');
    root.innerHTML = '';

    Object.keys(menuElements).forEach(function (key) {
        const menuItem = document.createElement('a');
        menuItem.textContent = menuElements[key];
        menuItem.href = `/${key}`;
        menuItem.dataset.section = key;
        root.appendChild(menuItem);
    });
};

export const createMenu = () => {
    createTemplate();
    createElements();
};

application.addEventListener('click', function (event) {
    const { target } = event;

    if (target instanceof HTMLAnchorElement) {
        event.preventDefault();
        menuRoutes[target.dataset.section]();
    }
});

const ShowErrors = (text) => {
    const root = document.getElementById('menu');
    root.innerHTML = "";

    const msg = document.createElement('p');
    msg.textContent = text;
    root.appendChild(msg);
}

