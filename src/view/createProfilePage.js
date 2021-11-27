import {fetchRequest} from '../components/network/fetch.js';
import {showErrors} from '../components/utils/errors.js';
import {createProfile} from '../components/profile/profile.js';
import {serverLocate} from '../utils/locale.js';
import Router from '../utils/router.js';
import profilePug from '../components/pages/profile/profile.pug';
import avatarPug from '../components/pages/menu/avatar.pug';
import '../components/pages/profile/profile.css';


export const createProfilePage = (draw) => {
  if (!draw) {
    document.title = 'Profile';
  }

  const url = serverLocate+'/users/profile';

  fetchRequest(url, 'GET', null).then(
      (res) => {
        return res.ok ? res : Promise.reject(res);
      },
  ).then(
      (response) => {
        return response.json();
      },
  ).then(
      (result) => {
        if (draw) {
          const rootAva = document.getElementById('me-av');
          if (!rootAva) {
            const root = document.getElementById('menu-items');
            const name = document.createElement('a');
            name.setAttribute('id', 'me-av');
            name.addEventListener('click', function(ev) {
              ev.preventDefault();
              Router.go('/profile', 'Профиль');
            });
            name.innerHTML = avatarPug({
              login: result,
            });
            root.appendChild(name);
          }
        } else {
          const root = document.getElementById('stuff');
          root.innerHTML = profilePug({
            login: result.login,
          });
          createProfile(result);
        }
      },
  ).catch(function(error) {
    showErrors('Ошибка отправки запроса');
  });
};
