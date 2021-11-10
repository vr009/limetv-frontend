import {fetchRequest} from '../components/network/fetch.js';
import {showErrors} from '../components/utils/errors.js';
import {createProfile} from '../components/profile/profile.js';
import profilePug from '../components/profile/profile.pug';
import  '../components/profile/profile.css';


export const createProfilePage = () => {
  document.title = 'Profile';

  const url = 'http://localhost:8000/users/profile';

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
              login: result.Login,
          });
          createProfile(result);
      },
  ).catch(function(error) {
    showErrors('Ошибка отправки запроса');
  });
};
