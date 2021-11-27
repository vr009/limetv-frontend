import {showErrors} from '../utils/errors.js';
import {serverLocate} from '../../utils/locale.js';
import {fetchRequest} from '../network/fetch.js';
import {showFilmsList} from '../films/films.js';
import userInfoPug from '../pages/profile_info/profile_info.pug';
import '../pages/profile_info/profile_info.css';
import '../pages/actors/actor.css';
import Router from '../../utils/router.js';


export const createUserInfoPage = () => {
  const root = document.getElementById('stuff');
  if (root != null) {
    root.innerHTML = '';
  }

  const user = document.createElement('div');
  user.setAttribute('id', 'one_user');
  root.appendChild(user);

  showUserInfo();

  showFilmsList('/wl', 'selection-profile-3', 'Смотреть позже');
  showFilmsList('/starred', 'selection-profile-4', 'Избранное');
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
        const root = document.getElementById('one_user');
        if (result.about === 'no data') {
          result.about = '—';
        }
        root.innerHTML = userInfoPug({
          login: result.login,
          about: result.about,
          subscriptions: result.subscriptions,
          subscribers: result.subscribers,
          avatar: result.avatar,
        });
        const t = document.getElementById('settings_btn');
        t.addEventListener('click', function(event) {
          event.preventDefault();
          const rootPage = document.getElementById('stuff');
          rootPage.innerHTML = '';
          Router.go('/settings', 'Настройки');
        });
      },
  ).catch((error) => {
    console.log(error);
    showErrors(error);
  });
};


