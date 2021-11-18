import {showErrors} from '../utils/errors';
import {serverLocate} from '../../utils/locale.js';
import {fetchRequest} from '../network/fetch.js';
import userInfoPug from '../pages/profile_info/profile_info.pug';
import actorFilmsPug from '../pages/actors/actorFilms.pug';
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

// function getFilmsByUser(state) {
//     const url = serverLocate+'/films/selection/actor/' + state;
//     fetch(url, {
//             method: 'GET',
//         },
//     ).then(
//         (response) => response.json(),
//     ).then(
//         (result) => {
//             const rootFilm = document.getElementById('one_film');
//             for (let i=0; i < result.length; i++) {
//                 result[i].title = result[i].title+' ('+result[i].year+')';
//                 result[i].director = result[i].director[0];
//                 result[i].duration = result[i].duration+'м';
//             }
//             rootFilm.innerHTML = actorFilmsPug({
//                 films: result,
//             });
//
//             for (let i=0; i < result.length; i++) {
//                 const t = document.getElementById(result[i].id);
//                 t.addEventListener('click', function (event) {
//                     // const {target} = event;
//                     event.preventDefault();
//                     const rootPage = document.getElementById('stuff');
//                     rootPage.innerHTML = '';
//                     Router.go('/film/' + result[i].id.toString());
//                     // createFilmPage(result[i].id);
//                 });
//             }
//         },
//     ).catch((error) => {
//             console.log(error);
//             showErrors(error);
//         },
//     );
// }
