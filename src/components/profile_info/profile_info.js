import {showErrors} from '../utils/errors';
import {serverLocate} from '../../utils/locale.js';
import {fetchRequest} from '../network/fetch.js';
import {showFilmsList} from '../films/films.js'

import filmListPug from '../pages/films/films.pug'
import userInfoPug from '../pages/profile_info/profile_info.pug';
import '../pages/actors/actor.css';
import Router from '../../utils/router';


export const createUserInfoPage = () => {
    const root = document.getElementById('stuff');
    if (root != null) {
        root.innerHTML = '';
    }

    const user = document.createElement('div');
    user.setAttribute('id', 'one_user');
    root.appendChild(user);

    showUserInfo();

    const watchList = document.createElement('div');
    watchList.setAttribute('id', 'watchlist-root');
    root.appendChild(watchList);

    const favList = document.createElement('div');
    favList.setAttribute('id', 'favlist-root');
    root.appendChild(favList);

    showFilmsList('/wl', 'watchlist-root', 'Смотреть позже');
    showFilmsList('/starred', 'favlist-root', 'Избранное');
};

const showUserInfo = () => {
    const url = serverLocate+'/users/profile';

    fetchRequest(url, 'GET', null).then(
        (res) => {
            return res.ok ? res : Promise.reject(res);
        },
    ).then(
        (response) => response.json(),
    ).then(
        (result) => {
            console.log(result);
            const root = document.getElementById('one_user');
            root.innerHTML = userInfoPug({
                login: result.login,
                about: result.about,
                subscriptions: result.subscriptions,
                subscribers: result.subscribers,
                avatar: result.avatar,
            });
            const t = document.getElementById("settings_btn");
            t.addEventListener('click', function (event) {
                event.preventDefault();
                const rootPage = document.getElementById('stuff');
                rootPage.innerHTML = '';
                Router.go('/settings');
            });
        },
    ).catch((error) => {
            console.log(error);
            showErrors(error);
        },
    );
};


