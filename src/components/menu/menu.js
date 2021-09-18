//import MenuTemplate from './menu.pug';

// отрисовка фильмов
const renderFilms = () => {

}

//отрисовка профиля
const renderProfile = () => {

    let promise = new Promise(async function (resolve, reject) {
        let url = '/api/user/';
        let response = await fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
            mode: 'cors',
        });
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
    //const menu = MenuTemplate();
    const root = document.getElementById('menu');
    root.innerHTML = 'menu';
};

//создание элементов для меню
const createElements = () => {
    const root = document.getElementById('menu-items');
    root.innerHTML = '';
};



export const createMenu = () => {
    createTemplate();
    createElements();
};