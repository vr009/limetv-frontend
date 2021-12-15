import {showErrors} from '../utils/errors.js';
import {serverLocate} from '../../utils/locale.js';
import {fetchRequest} from '../network/fetch.js';
import {showFilmsList} from '../films/films.js';
import userInfoPug from '../pages/profile_info/profile_info.pug';
import '../pages/profile_info/profile_info.scss';
import '../pages/actors/actor.scss';
import Router from '../../utils/router.js';


export const createUserInfoPage = () => {
  const root = document.getElementById('stuff');
  if (root != null) {
    root.innerHTML = '';
  }
  root.setAttribute('class', 'stuff');

  const user = document.createElement('div');
  user.setAttribute('id', 'one_user');
  root.appendChild(user);

  showUserInfo();

  showFilmsList('/wl', 'selection-watch-list', 'Смотреть позже');
  showFilmsList('/starred', 'selection-liked', 'Избранное');
};

const subscribtionCheck = () => {
  const url = serverLocate + '/check/check';
  fetchRequest(url, 'GET', null).then(
    (res) => {
      return res.ok ? res : Promise.reject(res);
    },
  ).then(
    (response) => response.json(),
  ).then(
    (result) => {
      const root = document.getElementById('profile-grid__text');
      root.innerText = result.ExpDate;
    }).catch((error) => {
    console.log(error);
  });
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
        if (result.about === 'no data' || result.about === null || result.about === '') {
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
        subscribtionCheck();
      },
  ).catch((error) => {
    console.log(error);
    showErrors(error);
  });
};
