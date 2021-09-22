import MenuTemplate from './menu.pug';
import AuthTemplate from '../auth/authorization.pug';
import RegTemplate from '../auth/registration.pug';

const application = document.getElementById('root');

// отрисовка фильмов
const renderFilms = () => {
    console.log('film')
}

//отрисовка профиля
const renderProfile = () => {
}

//отрисовка формы логина
const renderAuth = () => {
    //отрисовка темплейта
    const auth = AuthTemplate();
    const root = document.getElementById();
    root.innerHTML = auth;

    //обработка отправки формы
    const btn = document.getElementById('auth_btn');
    btn.addEventListener('click', function (event) {
        event.preventDefault();
        const name =  document.getElementById('login_field').value;
        const pwd =  document.getElementById('password_field').value;

        const user = {login: name, password: pwd};
        const url = '';

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(user),
            }
        ).then(

        ).catch(function(error) {
                ShowErrors('');
            }
        )
    })
}

//отрисовка формы регистрации
const renderRegistration = () => {
    //отрисовка темплейта
    const reg = RegTemplate();
    const root = document.getElementById();
    root.innerHTML = reg;

    //обработка нажатия кнопки регистрации
    const btn = document.getElementById('registration_btn');
    btn.addEventListener('click', function (event) {
        event.preventDefault();

        const name =  document.getElementById('login_field').value;
        const email =  document.getElementById('email_field').value;
        const pwd =  document.getElementById('password_field').value;

        const user = {login: name, password: pwd, email: email};
        const url = '';

        fetch(url, {
                method: 'POST',
                body: JSON.stringify(user),
            }
        ).then(

        ).catch(function(error) {
                ShowErrors('');
            }
        )

    })
}

// элементы меню
const menuElements = {
    films: 'Фильмы',
    profile: 'Профиль'
};

// элементы роутинга
const menuRoutes = {
    films: renderFilms,
    profile: renderProfile
};

// загрузка меню из темплейта
const createTemplate = () => {
    const menu = MenuTemplate();
    const root = document.getElementById('menu');
    root.innerHTML = menu;
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
        evt.preventDefault();
        menuRoutes[target.dataset.section]();
    }
});

const ShowErrors = (text) => {
    const root = document.getElementById('error');
    root.innerHTML = "";

    const msg = document.createElement('p');
    msg.textContent = text;
    root.prepend(msg);
}

