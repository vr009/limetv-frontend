import profilePug from '../pages/profile/profile.pug';
import {fetchRequest} from '../network/fetch.js';
import {createProfile} from './profile.js';
import {serverLocate} from '../../utils/locale.js';
import {showErrors} from '../utils/errors.js';
import '../pages/profile/profile.scss';

export const createProfileSettingsPage = () => {
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
        const root = document.getElementById('stuff');
        root.innerHTML = profilePug({
          login: result.login,
          about: result.about,
          avatar: result.avatar,
        });
        createProfile(result);
      },
  ).catch(function() {
    showErrors('Ошибка отправки запроса');
  });
};
