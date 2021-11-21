import profilePug from '../pages/profile/profilePage.pug';
import {Router} from '../../utils/router.js';
import {fetchRequest} from "../network/fetch.js";
import searchPagePug from "../pages/search/search.pug";


export const createProfilePage = () => {
  const url = serverLocate+'/users/profile'; // профиль вытащится из jwt
    fetchRequest(url,'GET').then(
      (response) => response.json(),
  ).then(
      (result) => {
        const root = document.getElementById('stuff');
        root.innerHTML = profilePug({
          result: result,
        });
        const btn = root.querySelector('#settings');
        btn.addEventListener('click', function(event) {
          event.preventDefault();
          Router.go('/settings', 'Settings');
        });
      },
  ).catch((error) => {
        console.log(error);
    }
    );
};
