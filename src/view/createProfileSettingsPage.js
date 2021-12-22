import profilePug from '../components/pages/profile/profile.pug';
import {fetchRequest} from '../components/network/fetch.js';
import {createProfile} from '../components/profile/profile.js';
import {serverLocate} from '../utils/locale.js';
import {showErrors} from '../components/utils/errors.js';
import '../components/pages/profile/profile.scss';

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
          const eye = document.getElementById('icon');
          eye.addEventListener('click', function(event) {
              event.preventDefault();
              const passField = document.getElementById('change-password');
              const icon = document.getElementById('icon');

              if (passField.type === 'password') {
                  passField.type = 'text';
                  icon.classList.add('selected');
              } else {
                  passField.type = 'password';
                  icon.classList.remove('selected');
              }
          });
        createProfile(result);
      },
  ).catch(function() {
    showErrors('Ошибка отправки запроса');
  });
};
